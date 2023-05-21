const mongoose = require('mongoose')

const modelCliente = {
    nome: String,
    sobrenome: String,
    email: String,
    telefone: Number,
    cep: Number,
}

const Cliente = mongoose.model('Cliente', modelCliente
)


module.exports = Cliente