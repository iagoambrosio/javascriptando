'use strict'
let variavelSaida = null
function gerarNomes(rounds, tamanhoNome, minimoLetras,vairavelSaida) {
  //tentar dar um return prematuro aqui
  for (let i = 0; i < rounds; i++) {
    const consoante = ["b", "c", "d", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "x", "y", "z"]
    const vogal = ["a", "e", "i", "o", "u"]
    // função principal
    function mainGerarNome() {
      const nomeGerado = {
        "arrayescolhido": null,
        "decisor": null,
        "tamanhodapalavra": null,
        "onString": null,
        "onArray": [],
        "toUpperCaseOnString": null,
      }
      const arrayRandominize = (tamanhoNome, minimoLetras) => {
        const resultado = Math.floor(Math.random() * (tamanhoNome - minimoLetras) + minimoLetras)
        return resultado
      }
      function escolhArray() {
        const decisor = arrayRandominize(100, 0)
        nomeGerado.decisor = decisor
        if (decisor >= 50) {
          return consoante
        } else { return vogal }
      }
      const arrayEscolhido = escolhArray()
      nomeGerado.arrayescolhido = arrayEscolhido
      function arrayQueRestou() {
        if (arrayEscolhido == vogal) {
          return consoante
        } else { return vogal }
      }
      const segundoArray = arrayQueRestou()
      //Determinando o tamanho da palavra
      const escolhaPalavra = arrayRandominize(tamanhoNome, minimoLetras)
      nomeGerado.tamanhodapalavra = escolhaPalavra
      let i = 0
      while (i < escolhaPalavra) {
        const primeiraLetra = arrayEscolhido[arrayRandominize(arrayEscolhido.length, 0)]
        nomeGerado.onArray.push(primeiraLetra)
        ++i
        if (i === escolhaPalavra) {
          break
        } else {
          const segundaLetra = segundoArray[arrayRandominize(segundoArray.length, 0)]
          nomeGerado.onArray.push(segundaLetra)
        }
        ++i
      }
      //gerar uma string através de um array
      nomeGerado.onString = nomeGerado.onArray.toString()
      //gerar uma string com a primeira letra maiuscula
      nomeGerado.toUpperCaseOnString = nomeGerado.onString.charAt(0).toUpperCase()+nomeGerado.onString.slice(1)
      //gerar um array a partir de uma string separado por virgula
      nomeGerado.toUpperCaseOnArray = nomeGerado.toUpperCaseOnString.split(',')
      return nomeGerado
    }
    variavelSaida = mainGerarNome()
  }
}
gerarNomes(1, 12, 4)
console.log(variavelSaida)