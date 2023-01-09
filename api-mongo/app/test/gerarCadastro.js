const gerarNomes = require('./gerarNome.js')

let contadorClientes = 0
let arrayFinal = []
class Cliente {
    constructor(id,nome,sobrenome,email,telefone,cep){
        this.id = id
        this.nome = nome 
        this.sobrenome = sobrenome 
        this.email = email
        this.telefone = telefone
        this.cep = cep
    }
    verInformacoes(){
        return this
    }
    incremento(){
        return contadorClientes++ }
}
function gerarCadastros(rounds){
for (let i = 0 ;i < rounds; i++){
let obj = {}
let cliente = new Cliente (
    contadorClientes,
    gerarNomes(1,10,4).toUpperCaseOnString,
    gerarNomes(1,14,4).toUpperCaseOnString,
    undefined,
    Math.floor(Math.random()*100000000),
    Math.floor(Math.random()*100000000)
)
cliente.email = cliente.nome.toLowerCase()+"."+cliente.sobrenome.toLowerCase()+"@"+gerarNomes(1,16,5).onString+".com"
obj = cliente
arrayFinal.push(obj)
cliente.incremento()
}
const resposta = arrayFinal
arrayFinal = []
contadorClientes = 0
return resposta
}
module.exports = gerarCadastros