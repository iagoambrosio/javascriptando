const mongoose = require('mongoose')
const process = require('process')
const fs = require('fs');

const modelCliente = {
    nome: String,
    sobrenome: String,
    email: String,
    telefone: Number,
    cep: Number,
}

const Cliente = mongoose.model('Cliente', modelCliente)


module.exports = Cliente