import cliente from "./cliente.js"
import conta from "./conta.js"

console.log("existem " + conta.agencia + " contas")

const cliente1 = new cliente("manoel",12,99999999)

console.log("agora existem " + conta.agencia + " contas")

const cliente2 = new cliente("joao",13,999912)


console.log(cliente1.conta)
console.log(typeof(cliente1))
console.log(cliente2)
console.log(typeof(cliente2))
console.log(conta.agencia)