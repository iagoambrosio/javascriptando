// importa biblioteca mongoose
const mongoose = require('mongoose')

// Instancia um objeto (Colections) "Pessoal" , o parametro 'Person' precisa ser escrito no singular 
const Person = mongoose.model ('Person', {
    name: String,
    salary: Number,
    approved: Boolean,
})

module.exports = Person 