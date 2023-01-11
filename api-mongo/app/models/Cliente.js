const mongoose = require('mongoose')

const Cliente = mongoose.model('Cliente',
{
    nome: String,
    sobrenome: String,
    email: String,
    telefone: Number,
    cep: Number,
})
module.exports = Cliente