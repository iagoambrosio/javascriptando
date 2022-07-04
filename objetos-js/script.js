import Cliente from "./cliente.js"
import Conta from "./conta.js"

console.log("existem " + Conta.agencia + " contas")

const cliente1 = new Cliente("manoel",12,99999999)

console.log("agora existem " + Conta.agencia + " contas")

const cliente2 = new Cliente("joao",13,999912)


console.log(cliente1)
console.log(cliente2)
console.log(Conta.agencia - 1)