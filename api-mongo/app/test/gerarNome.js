'use strict' 
for (let i = 0; i < 1; i++) {
const pessoAleatoria = "nome"
const consoante = ["b","c","d","f","g","h","i","j","k","l","m","n","p","q","r","s","t","v","x","y","z"]
const vogal = ["a","e","i","o","u"]


// Decidir qual array
const arrayRandominize = (numero) => {
    const resultado = Math.floor(Math.random()*numero)
    return resultado
}

const escolhaArray = arrayRandominize(100)

console.log("Numero para escolha do array: " + escolhaArray)

if (escolhaArray <= 50 )
{
  console.log("Escolha da consoante:"+consoante[arrayRandominize(consoante.length)])
    //chose consoante
   const escolhaPalavra = Math.floor(Math.random()*(12 - 3) + 3)
   console.log("Numero de letras na palavra: "+ escolhaPalavra)

   let i = 0
   while ( i < escolhaPalavra ){
   
    console.log("Primeira letra: "+consoante[arrayRandominize(consoante.length)])
   ++ i
   if (i === escolhaPalavra){
    return console.log("i e escolhaPalavra são iguais "+i+" e "+escolhaPalavra)
   }else{
   console.log("Segunda letra: "+vogal[arrayRandominize(vogal.length)])
   ++ i
  }

}

} else {
  //chose vogal
    console.log("Escolha da vogal:"+vogal[arrayRandominize(vogal.length)])

    const escolhaPalavra = Math.floor(Math.random()*(10 - 3) + 3)
    console.log("Numero de letras na palavra: "+ escolhaPalavra)
 
    let i = 0
    while ( i < escolhaPalavra ){
    
     console.log("Primeira letra: "+consoante[arrayRandominize(consoante.length)])
    ++ i
    if (i === escolhaPalavra){
     return console.log("i e escolhaPalavra são iguais "+i+" e "+escolhaPalavra)
    }else{
    console.log("Segunda letra: "+vogal[arrayRandominize(vogal.length)])
    ++ i
      }
    }
// pessoAleatoria.
  }
}