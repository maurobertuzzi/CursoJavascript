async function traerProductos() {
  const respuesta = await fetch("./data.json");
  const productosBD = await respuesta.json();
  miWeb(productosBD);
}

traerProductos();

function miWeb(productos) {
  let contenedorProductos = document.getElementById("contenedorProductos");
  let contenedorRubros = document.getElementById("contenedorRubros");
  let carritoContainer = document.querySelector(".carritoContainer");
  let contenedorCarrito = document.getElementById("contenedorCarrito");
  let buscarTexto = document.getElementById("buscarTexto");
  let buscarMin = document.getElementById("buscarMin");
  let buscarMax = document.getElementById("buscarMax");
  let btnCarritoImg = document.getElementById("carritoImg");
  const rubrosFiltrados = getRubrosFiltrados(productos);
  let conteoProductos = document.getElementById("conteoProductos");
  let cantidadEnCarrito = document.getElementById("cantidadCarrito");

  let carrito = localStorage.getItem("carrito")
    ? JSON.parse(localStorage.getItem("carrito"))
    : [];

  let btnBuscar = document.getElementById("btnBuscar");
  let btnOrdenarAsc = document.getElementById("ordenarAsc");
  let btnOrdenarDesc = document.getElementById("ordenarDesc");
  let btnVaciarCarrito = document.getElementById("btnVaciarCarrito");
  let btnComprar = document.getElementById("btnComprar");

  btnBuscar.onclick = filtrar;
  btnOrdenarAsc.onclick = ordenarCreciente;
  btnOrdenarDesc.onclick = ordenarDecreciente;
  btnVaciarCarrito.onclick = vaciarCarrito;
  btnComprar.onclick = finalizarCompra;
  btnCarritoImg.onclick = toogleContenedorCarrito;

  let productosFiltrados = productos;

  renderizarProductos(productos);
  renderizarRubros(rubrosFiltrados);
  renderizarCarrito(carrito);

  function renderizarProductos(array) {
    contenedorProductos.innerHTML = "";
    array.forEach(({ id, nombre, precio, img: imagen }) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.id = `tarjeta${id}`;

      const productImg = document.createElement("img");
      productImg.setAttribute("src", imagen);
      productImg.setAttribute("alt", nombre);

      const productInfo = document.createElement("div");
      productInfo.classList.add("product-info");

      const productInfoDiv = document.createElement("div");

      const productPrice = document.createElement("p");
      productPrice.innerText = "$" + precio;

      const productName = document.createElement("p");
      productName.innerText = nombre;

      productInfoDiv.appendChild(productPrice);
      productInfoDiv.appendChild(productName);

      const productInfoFigure = document.createElement("figure");
      const productImgCart = document.createElement("img");
      productImgCart.setAttribute(
        "src",
        "https://cdn-icons-png.flaticon.com/512/34/34627.png"
      );
      productImgCart.setAttribute("id", id);

      productInfoFigure.appendChild(productImgCart);

      productInfo.appendChild(productInfoDiv);
      productInfo.appendChild(productInfoFigure);

      productCard.appendChild(productImg);
      productCard.appendChild(productInfo);

      contenedorProductos.append(productCard);

      let btnCarrito = document.getElementById(id);
      btnCarrito.addEventListener("click", agregarAlCarrito);
    });
  }

  function getRubrosFiltrados(productos) {
    const rubrosFiltrados = [];
    for (const prod of productos) {
      const rubroEnMinusculas = prod.rubro.toLowerCase();
      if (!rubrosFiltrados.includes(rubroEnMinusculas)) {
        rubrosFiltrados.push(rubroEnMinusculas);
      }
    }
    return rubrosFiltrados;
  }

  function renderizarRubros(array) {
    contenedorRubros.innerHTML = "";
    array.forEach((rubro) => {
      let botonRubro = document.createElement("button");
      botonRubro.classList.add("botonRubro");
      botonRubro.setAttribute("id", rubro);
      botonRubro.innerText = `${rubro}`;

      contenedorRubros.append(botonRubro);

      let btnRubro = document.getElementById(botonRubro.id);
      btnRubro.addEventListener("click", filtrarRubro);
    });

    let botonRubroTodos = document.createElement("button");
    botonRubroTodos.classList.add("botonRubro");
    botonRubroTodos.setAttribute("id", "todos");
    botonRubroTodos.innerText = "todos";

    contenedorRubros.append(botonRubroTodos);

    let btnRubroTodos = document.getElementById("todos");
    btnRubroTodos.addEventListener("click", filtrarRubro);
  }

  function filtrar() {
    productosFiltrados = productos;
    if (buscarTexto.value !== "") {
      productosFiltrados = productosFiltrados.filter((producto) =>
        producto.nombre.toLowerCase().includes(buscarTexto.value.toLowerCase())
      );
    }

    if (Number(buscarMin.value) > 0) {
      productosFiltrados = productosFiltrados.filter(
        (producto) => producto.precio >= Number(buscarMin.value)
      );
    }
    if (Number(buscarMax.value) > 0) {
      productosFiltrados = productosFiltrados.filter(
        (producto) => producto.precio <= Number(buscarMax.value)
      );
    }
    renderizarProductos(productosFiltrados);
    contarProductosBuscados(productosFiltrados);
    buscarTexto.value = "";
    buscarMin.value = "";
    buscarMax.value = "";
  }

  function contarProductosBuscados(array) {
    conteoProductos.innerHTML = "";
    const conteo = document.createElement("p");
    conteo.classList.add("productosEncontrados");
    const cantidad = array.length;
    conteo.innerText = `Se encontraron ${cantidad} productos`;
    conteoProductos.append(conteo);
  }

  function ordenarCreciente() {
    productosFiltrados.sort((a, b) => {
      if (a.precio > b.precio) {
        return 1;
      }
      if (a.precio < b.precio) {
        return -1;
      }
      return 0;
    });
    renderizarProductos(productosFiltrados);
  }

  function ordenarDecreciente() {
    productosFiltrados.sort((a, b) => {
      if (a.precio < b.precio) {
        return 1;
      }
      if (a.precio > b.precio) {
        return -1;
      }
      return 0;
    });
    renderizarProductos(productosFiltrados);
  }

  function filtrarRubro(e) {
    if (e.target.id == "todos") {
      renderizarProductos(productos);
      contarProductosBuscados(productos);
    } else {
      productosFiltrados = productos.filter(
        (producto) => producto.rubro.toLowerCase() == e.target.id
      );
      renderizarProductos(productosFiltrados);
      contarProductosBuscados(productosFiltrados);
    }
  }

  function agregarAlCarrito(e) {
    let id = e.target.id;
    let productoBuscado = productos.find((producto) => producto.id == id);
    let productoEnCarrito = carrito.find(
      (producto) => producto.id == productoBuscado.id
    );

    if (productoEnCarrito) {
      let posicionProducto = carrito.findIndex(
        (producto) => producto == productoEnCarrito
      );
      carrito[posicionProducto].unidades++;
      carrito[posicionProducto].subtotal =
        carrito[posicionProducto].precio * carrito[posicionProducto].unidades;
    } else {
      productoBuscado.unidades = 1;
      productoBuscado.subtotal = productoBuscado.precio;
      carrito.push(productoBuscado);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    renderizarCarrito(carrito);

    Toastify({
      text: "Producto agregado",
      duration: 2000,
      gravity: "top",
      position: "right",
      style: {
        background: "#0d6efd",
      },
      onClick: function () {},
    }).showToast();
  }

  function renderizarCarrito(productosEnCarrito) {
    contenedorCarrito.innerText = "";
    cantidadEnCarrito.innerText = "";

    tituloCarrito = document.createElement("div");
    tituloCarrito.classList.add("itemCarrito");
    tituloCarrito.innerHTML = `
      <h3>Producto</h3>
      <h3>P. Unit.</h3>
      <h3>Cant.</h3>
      <h3>Subtotal</h3>
    `;
    contenedorCarrito.append(tituloCarrito);

    let totalCarrito = 0;
    let cantidadTotalCarrito = 0;
    productosEnCarrito.forEach(({ id, nombre, precio, unidades, subtotal }) => {
      totalCarrito = totalCarrito + subtotal;
      cantidadTotalCarrito = cantidadTotalCarrito + unidades;
      productCard = document.createElement("div");
      productCard.classList.add("itemCarrito");
      productCard.innerHTML = `
        <p>${nombre}</p>
        <p>$ ${precio}</p>
        <p>${unidades}</p>
        <p>$ ${subtotal}</p>
        <button id=${id}>X</button>
      `;
      contenedorCarrito.append(productCard);

      let botonEliminar = document.getElementById(id);
      botonEliminar.classList.add("botonEliminarProducto");
      botonEliminar.onclick = eliminarProducto;
    });

    importeTotalCarrito = document.createElement("div");
    importeTotalCarrito.classList.add("itemCarrito");
    importeTotalCarrito.innerHTML = `
      <p>Total: $${totalCarrito}</p>
    `;
    contenedorCarrito.append(importeTotalCarrito);

    cantTotalCarrito = document.createElement("p");
    cantTotalCarrito.innerText = cantidadTotalCarrito;
    cantidadEnCarrito.append(cantTotalCarrito);
  }

  function eliminarProducto(e) {
    let posicionProducto = carrito.findIndex(
      (producto) => producto.id == e.target.id
    );
    carrito.splice(posicionProducto, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito(carrito);
    Toastify({
      text: "Producto eliminado",
      duration: 2000,
      gravity: "top",
      position: "right",
      style: {
        background: "#ff0000",
      },
      onClick: function () {},
    }).showToast();

    carrito.length == 0 && carritoContainer.classList.toggle("isHidden");
  }

  function toogleContenedorCarrito() {
    carrito.length !== 0 && carritoContainer.classList.toggle("isHidden");
  }

  function vaciarCarrito() {
    if (carrito.length !== 0) {
      localStorage.removeItem("carrito");
      carrito = [];
      renderizarCarrito(carrito);
    }
    carritoContainer.classList.toggle("isHidden");
  }

  function finalizarCompra() {
    vaciarCarrito();
    const numeroOrden = parseInt(Math.random() * 100000);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Gracias por su compra",
      text: `Número de orden: ${numeroOrden}`,
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
    });
  }
}