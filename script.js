let contenedorProductos = document.getElementById("contenedorProductos");
let contenedorRubros = document.getElementById("contenedorRubros");
let carritoContainer = document.querySelector(".carritoContainer");
let contenedorCarrito = document.getElementById("contenedorCarrito");
let buscador = document.getElementById("buscador");
let inputMin = document.getElementById("min");
let inputMax = document.getElementById("max");
let btnCarritoImg = document.getElementById("carritoImg");
const rubrosFiltrados = getRubrosFiltrados(productos);

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
    let tarjetaProducto = document.createElement("div");
    tarjetaProducto.classList.add("producto");
    tarjetaProducto.id = `tarjeta${id}`;
    tarjetaProducto.innerHTML = `
        <img src=${imagen} alt=${nombre}>    
        <h3>${nombre}</h3>
        <p>$ ${precio}</p>
        <button id=${id} class="btnCompra">Agregar</button>
        `;

    contenedorProductos.append(tarjetaProducto);

    let btnCarrito = document.getElementById(id);
    btnCarrito.addEventListener("click", agregarAlCarrito);
  });
}

function getRubrosFiltrados(productos) {
  const rubrosFiltrados = [];
  for (const prod of productos) {
    !rubrosFiltrados.includes(prod.rubro) && rubrosFiltrados.push(prod.rubro);
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
  if (buscador.value !== "") {
    productosFiltrados = productosFiltrados.filter((producto) =>
      producto.nombre.toLowerCase().includes(buscador.value.toLowerCase())
    );
  }
  if (Number(inputMin.value) > 0) {
    productosFiltrados = productosFiltrados.filter(
      (producto) => producto.precio >= Number(inputMin.value)
    );
  }
  if (Number(inputMax.value) > 0) {
    productosFiltrados = productosFiltrados.filter(
      (producto) => producto.precio <= Number(inputMax.value)
    );
  }

  renderizarProductos(productosFiltrados);
  buscador.value = "";
  inputMin.value = "";
  inputMax.value = "";
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
  } else {
    productosFiltrados = productos.filter(
      (producto) => producto.rubro.toLowerCase() == e.target.id
    );
    renderizarProductos(productosFiltrados);
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

  tituloCarrito = document.createElement("div");
  tituloCarrito.classList.add("itemCarrito");
  tituloCarrito.innerHTML = `
  <h3>Producto</h3>
  <h3>P. Unit.</h3>
  <h3>Cant.</h3>
  <h3>Subtotal</h3>
  `;
  contenedorCarrito.append(tituloCarrito);

  productosEnCarrito.forEach(({ id, nombre, precio, unidades, subtotal }) => {
    tarjetaProducto = document.createElement("div");
    tarjetaProducto.classList.add("itemCarrito");
    tarjetaProducto.innerHTML = `
    <p>${nombre}</p>
    <p>$ ${precio}</p>
    <p>${unidades}</p>
    <p>$ ${subtotal}</p>
    <button id=${id}>X</button>
    `;
    contenedorCarrito.append(tarjetaProducto);

    let botonEliminar = document.getElementById(id);
    botonEliminar.classList.add("botonEliminarProducto");
    botonEliminar.onclick = eliminarProducto;
  });
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
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Gracias por su compra",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
  });
}
