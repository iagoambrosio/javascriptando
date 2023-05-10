// -  Operador comparação
const numero = 5
const texto = '5'

// falso porque 5 e '5' sao de tipos primitivos diferentes, e dois iguais levam em conta o tipo
console.log(numero == texto) //false

console.log(numero === texto) //true

console.log(typeof numero , texto)

//CONVERSAO EXPLICITA - usada para converter explicitamente numero em string e string em numero

const numeroString = Number(texto)
const stringNumero = String(numero)

console.log(typeof(numeroString))
console.log(typeof(stringNumero))

//booleanos

const usuariologado = true
const contapaga = false

// truthy or falsy

// 0 = false
// 1 = true

console.log(0==false) //true
console.log(""== false) //true
console.log(1 == true) //true

// null = vazio
// undefined

let minhaVar;
let varNull = null;

console.log(minhaVar)
console.log(varNull)

// - operador ternário

const idadeMinima = 18;
const idadeCliente = 16;

if (idadeCliente >= idadeMinima) {
  console.log("cerveja")
  }
else {console.log("suco")
}

console.log(idadeCliente >= idadeMinima ? "cerveja" : "suco")


// - Template strings

const nome = "iago"
const apresentacao = `meu nome é ${nome}`;
console.log(apresentacao)

- Funções

let x = "";

console.log(x);

x = "oi";

// declaração
function imprimeTexto(texto){
  console.log(texto)
}
// call of function
imprimeTexto("ola");

// retornando valores

function soma(){
  const resultado = 2+ 2 ;
  return resultado
}
console.log(soma())