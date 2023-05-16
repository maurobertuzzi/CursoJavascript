// SEGUNDA ENTREGA 
 const productos = [
  { id: 1, nombreProd: "remera", talle: "Medium", Precio: 1000 },
  { id: 2, nombreProd: "remera", talle: "Large", Precio: 1000 },
  { id: 3, nombreProd: "remera", talle: "Small", Precio: 1000 },
  { id: 4, nombreProd: "pantalon", talle: "Medium", Precio: 800 },
  { id: 5, nombreProd: "pantalon", talle: "Large", Precio: 800 },
  { id: 6, nombreProd: "calza corta", talle: "Medium", Precio: 700 },
  { id: 7, nombreProd: "calza corta", talle: "Small", Precio: 700 },
  { id: 8, nombreProd: "calza larga", talle: "Medium", Precio: 800 },
  { id: 9, nombreProd: "calza larga", talle: "Large", Precio: 800 },
  { id: 10, nombreProd: "buzo", talle: "Medium", Precio: 1200 },
  { id: 11, nombreProd: "buzo", talle: "Large", Precio: 1200 },
  { id: 12, nombreProd: "campera", talle: "Medium", Precio: 1500 },
  { id: 13, nombreProd: "campera", talle: "Large", Precio: 1500 },
];

let busqueda = prompt("Ingrese el nombre del producto");
const encuentro = productos.filter(item => item.nombreProd.includes(busqueda));

if (encuentro.length > 0) {
  encuentro.forEach(item => {
    let mensaje = `
      Producto: ${item.nombreProd}
      Talle: ${item.talle}
      Precio: ${item.Precio} 
    `;
    alert(mensaje);
  });
} else {
  alert("Lamentablemente no tenemos ese producto");
}

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
