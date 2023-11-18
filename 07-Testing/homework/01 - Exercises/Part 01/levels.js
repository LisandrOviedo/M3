const levelOne = (a, b) => {
  return a + b;
};

const levelTwo = (letras) => {
  if (letras.length < 2) {
    return letras;
  }

  if (letras.length === 2) {
    return letras[0];
  }

  let letras_resultado = "";
  for (let i = 0; i < letras.length; i++) {
    letras_resultado = letras_resultado + letras[i];
    i++;
  }

  return letras_resultado;
};

const levelThree = (a, b) => {
  let resultado = [];

  a.forEach((elementA) => {
    resultado.push(elementA);
  });

  b.forEach((elementB) => {
    resultado.push(elementB);
  });

  return resultado.sort((a, b) => a - b);
};

const levelFour = (num) => {
  let num2 = num.toString();
  let suma = 0;
  let reverso = [];
  let calculo = "";

  for (let i = 0; i < num2.length; i++) {
    suma = suma + Number(num2[i]);
  }

  suma = suma.toString();

  for (let j = suma.length - 1; j >= 0; j--) {
    reverso.push(suma[j]);
  }

  for (let k = 0; k < reverso.length; k++) {
    calculo = calculo + Number(reverso[k]);
  }

  if (parseInt(suma) * parseInt(calculo) === num) {
    return true;
  }
  return false;
};

module.exports = { levelOne, levelTwo, levelThree, levelFour };
