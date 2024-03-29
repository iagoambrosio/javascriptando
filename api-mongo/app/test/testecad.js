let contadorClientes = 0
let arrayFinal = []
class Cliente {
    constructor(nome, sobrenome, email, telefone, cep) {
        this.nome = nome
        this.sobrenome = sobrenome
        this.email = email
        this.telefone = telefone
        this.cep = cep
    }
    incremento() {
        return contadorClientes++
    }
    gerarNome(rounds, tamanhoNome, minimoLetras) {
        //tentar dar um return prematuro aqui
   
        for (let i = 0; i < rounds; i++) {
            const consoante = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "x", "y", "z"]
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
                    if (arrayEscolhido === vogal) {
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
                        ++i
                    }
                }
                //gerar uma string através de um array
                nomeGerado.onString = nomeGerado.onArray.toString()
                //gerar uma string com a primeira letra maiuscula
                nomeGerado.toUpperCaseOnString = nomeGerado.onString.charAt(0).toUpperCase() + nomeGerado.onString.slice(1)
                //gerar um array a partir de uma string separado por virgula
                nomeGerado.toUpperCaseOnArray = nomeGerado.toUpperCaseOnString.split(',')
                //sanitizar Uppercase string, tirar virgula com regex
                nomeGerado.toUpperCaseOnString = nomeGerado.toUpperCaseOnString.replace(/,/g, "")
                // replace
                nomeGerado.onString = nomeGerado.onString.replace(/,/g, "")
                return nomeGerado
            }
            return mainGerarNome()
        }

    }
    gerarCadastros(rounds, tamanhoNome, minimoLetras) {
        if (!tamanhoNome || !minimoLetras) {tamanhoNome = 10, minimoLetras = 4}
        if (!rounds) {rounds = 1}

        for (let i = 0; i < rounds; i++) {
            let obj = {}
            let cliente = new Cliente(
                this.gerarNome(rounds, tamanhoNome, minimoLetras).toUpperCaseOnString,
                this.gerarNome(rounds, tamanhoNome, minimoLetras).toUpperCaseOnString,
                undefined,
                Math.floor(Math.random() * 100000000),
                Math.floor(Math.random() * 100000000)
            )
            cliente.email = cliente.nome.toLowerCase() + "." + cliente.sobrenome.toLowerCase() + "@" + cliente.gerarNome(1, 16, 5).onString + ".com"
            obj = cliente
            arrayFinal.push(obj)
        }
        const resposta = arrayFinal
        arrayFinal = []
        contadorClientes = 0
        return resposta
    }
}
module.exports = Cliente