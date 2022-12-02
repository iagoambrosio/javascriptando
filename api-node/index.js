/**Create mongodb-temporario
 * sudo docker run --rm -it -p 27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=123456 -e MONGO_INITDB_DATABASE=db_js mongo 
 *
 * dados mongo:
 * user: "mongoadmin",
... pwd: "123456",
... roles: [ { role: 'root', db: "admin" } ]
 */

// colocando o modulo express dentro da variável express
const express = require('express')
 // colocando a função express() dentro da variavel chamaExpress
const Express = express()
// chama o objeto exportado em Person.js
const Person = require('./models/Person.js')
// chama função para conectar no banco de dados 
const mongodbservice = require('./models/Conectar.js')

//Conecta no mongo
mongodbservice()

//Versão API
const versaoApi ='/api/v1'

// middlewares (meios de comunicação)/ formas de ler os arquivos

 Express.use(
     express.urlencoded(
         {extended:true}
     )
 )

//Rotas GET
 Express.get(`${versaoApi}`, function(req,res){
     //response
     res.json({
         mensagem: 'Gostosa'
     })
 
 })

 Express.get(`${versaoApi}/person`, function(req,res){
    //response
    res.json({loga: "ok"})

})

// Rostas POST
//teste /person
// curl -X POST -H "Content-Type: application/json" -d '{"name" : "João", "salary" : 2000, "approved" : true }' https://devopers.ddns.net/api/v1/person
Express.post(`${versaoApi}/person`,async (req,res) => {

        // req.body
        // {name: "Matheus", salary: 5000, approved: false }
        
        const {name,salary,approved} = req.body
        const person = {
            name,
            salary,
            approved
        }
        console.log(req.body)
    
        // create
    
        try{
            //criando dados
            await Person.create(person)
    
            res.status(201).json({ 
                message: 'Pessoa criada com sucesso no sistema',
                atributosPessoa: `${person}` 
            })
    
        } catch (error){
            //tratando erros
            res.status(500).json({error: error})
        }
    
})

 
 
 

 //chamaExpress.use(express.json())
 
 // ler json
 



 

 // disponibilizar porta e fixa ip na em todas as interfaces
 Express.listen(3000)
 Express.bind('0.0.0.0')