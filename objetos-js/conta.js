export default class conta {
    
    static agencia = 0;

    #saldo = 0;

    get saldo(){
        return this.#saldo
    }

    constructor(id,agencia){
        this.id = id
        this.agencia = conta.agencia
        conta.agencia++
        
    }



    transferir(){};

    depositar(){};

    sacar(){};
}