 //conecta ao mongodb e configura as mensagens de conexão
 // chama o modulo para conexão no banco de dados mongo
 const mongoose = require('mongoose')


 function mongodbservice (){
    mongoose.connect(
       'mongodb://mongoadmin:123456@mongodb:27017/admin'
    )
    .then (console.log('Conectado a admin'))
    .catch ((err) => console.log(err))

 }
 
 module.exports = mongodbservice