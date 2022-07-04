export default class Conta {
    
    static agencia = 1;

    #saldo = 0;

    get saldo(){
        return this.#saldo
    }

    constructor(id,agencia){
        this.id = id
        this.agencia = Conta.agencia
        Conta.agencia++
        
    }



    transferir(){};

    depositar(){};

    sacar(){};
}