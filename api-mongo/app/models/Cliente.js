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

const Cliente = () => {
    if (process.env.NODE_ENV === 'prod'){
    mongoose.model('Cliente', modelCliente)
  } else {

  }
}

module.exports = Cliente