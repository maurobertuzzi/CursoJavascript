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
