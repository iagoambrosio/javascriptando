/**Create mongodb-temporario
 * sudo docker run --rm -it -p 27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=123456 -e MONGO_INITDB_DATABASE=db_js mongo 
 *
 * dados mongo:
 * user: "mongoadmin",
... pwd: "123456",
... roles: [ { role: 'root', db: "admin" } ]
 */
// chama o modulo para conexão no banco de dados mongo
const mongoose = require('mongoose')
// colocando o modulo express dentro da variável express
 const express = require('express')
 // colocando a função express() dentro da variavel chamaExpress
 const chamaExpress = express()
// chama o objeto exportado em Person.js
const Person = require('./models/Person.js')


// ROTAS DA API

chamaExpress.post('/person',async (req,res) => {

    // req.body
    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved
    }

    // create

    try{
        //criando dados
        await Person.create(person)

        res.status(201).json({ message: 'Pessoa criada com sucesso no sistema'

        })

    } catch (error){
        //tratando erros
        res.status(500).json({error: error})
    }


})

 
 // middlewares (meios de comunicação)/ formas de ler os arquivos
 /*chamaExpress.use(
     express.urlencoded(
         {extended:true}
     )
 )
 */

 //chamaExpress.use(express.json())
 
 // ler json
 
 //rotas, da principal as paralelas
 chamaExpress.get('/', function(req,res){
     //response
     res.json({
         mensagem: 'olá'
     })
 
 })
 
 //conecta ao mongodb e configura as mensagens de conexão
 mongoose
   .connect(
      'mongodb://mongoadmin:123456@mongodb:27017/admin'
   )
   .then (console.log('Conectado a admin'))
   .catch ((err) => console.log(err))



 // disponibilizar porta e fixa ip na em todas as interfaces
 chamaExpress.listen(3000)
 chamaExpress.bind('0.0.0.0')