const productos = [
  { id: 1, nombreProd: "Remera", talle: "Medium", Precio: 1000 },
  { id: 2, nombreProd: "Remera", talle: "Large", Precio: 1000 },
  { id: 3, nombreProd: "Remera", talle: "Small", Precio: 1000 },
  { id: 4, nombreProd: "Pantalon", talle: "Medium", Precio: 800 },
  { id: 5, nombreProd: "Pantalon", talle: "Large", Precio: 800 },
  { id: 6, nombreProd: "Calza Corta", talle: "Medium", Precio: 700 },
  { id: 7, nombreProd: "Calza Corta", talle: "Small", Precio: 700 },
  { id: 8, nombreProd: "Calza Larga", talle: "Medium", Precio: 800 },
  { id: 9, nombreProd: "Calza Larga", talle: "Large", Precio: 800 },
  { id: 10, nombreProd: "Buzo", talle: "Medium", Precio: 1200 },
  { id: 11, nombreProd: "Buzo", talle: "Large", Precio: 1200 },
  { id: 12, nombreProd: "Campera", talle: "Medium", Precio: 1500 },
  { id: 13, nombreProd: "Campera", talle: "Large", Precio: 1500 },
];

let busqueda = prompt("Ingrese el nombre del producto");
const encuentro = productos.filter(item => item.nombreProd.includes(busqueda));


encuentro.forEach(item => {
  if (encuentro) {
    let mensaje = `
  Producto: ${item.nombreProd}
  Talle: ${item.talle}
  Precio: ${item.Precio} 
  `;
    alert(mensaje);
  } else {
    alert("lamentablemente No tenemos ese producto")
  }

});

/*
if (encuentro) {
  let mensaje = `
  nombreProd: ${encuentro.nombreProd}
  talle: ${encuentro.talle}
  precio: ${encuentro.Precio} 
  `;

  alert(mensaje);
} else {
  alert("lamentablemente No tenemos ese producto")
}
*/


/* -- PRIMER ENTREGA -- 
function promedio(piernas, pecho, espalda, brazos){
  return (piernas + pecho + espalda + brazos)/4
}

for (let turno = 1; turno <= 3; turno++) {
  let nombre = prompt("Buena semana! por favor ingresa Tu nombre completo");
  let piernas = parseInt(prompt("Por favor ingresa el peso que usas en piernas"));
  let pecho = parseInt(prompt("Por favor ingresa el peso que usas en pecho"));
  let espalda = parseInt(prompt("Por favor ingresa el peso que usas en espalda"));
  let brazos = parseInt(prompt("Por favor ingresa el peso que usas en brazos y hombros"));
  let peso = promedio(piernas, pecho, espalda, brazos) 
  if (peso < 15) {
    alert(`${nombre}, Necesitas en promedio un peso de ${peso} Por favor ubicate en los Box del 1 al 6`);
  } else {
    alert(`${nombre}, Necesitas en promedio un peso de ${peso} Por favor ubicate en los Box del 7 al 13`);
  }
}
*/
