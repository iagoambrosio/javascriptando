 //conecta ao mongodb e configura as mensagens de conexão
 // chama o modulo para conexão no banco de dados mongo
const mongoose = require('mongoose')
const process = require('process')

class conectar {

   banco (){
   if (process.env.NODE_ENV === 'prod' ){
   mongoose.connect(
      'mongodb://mongoadmin:123456@mongo:27017/admin'
   )
   .then (console.log('Conectado no mongo, em admin'))
   .catch ((err) => console.log(err))
    } else {
      console.log("Sem banco para conectar, criando mockup")
    }
  }
}

module.exports = conectar