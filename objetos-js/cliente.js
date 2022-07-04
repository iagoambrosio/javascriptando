import Conta from "./conta.js";
export default class Cliente {
    
    
    constructor(nome,idade,cpf,conta){
        this.nome = nome;
        this.idade = idade;
        this.cpf = cpf;
        this.conta = new Conta()
        }
}
