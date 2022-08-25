/**Create mongodb-temporario
 * sudo docker run --rm -it -p 27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=123456 -e MONGO_INITDB_DATABASE=db_js mongo 
 */
 const { application } = require('express')
 const express = require('express')
 const chamaExpress = express()
 /** const app = require('') **/
 
 // middlewares (meios de comunicação)
 chamaExpress.use(
     express.urlencoded(
         {extended:true}
     )
 )
 
 chamaExpress.use(express.json())
 
 // ler json
 
 //rotas, da principal as paralelas
 chamaExpress.get('/', function(req,res){
     
     //response
     res.json({
         mensagem: 'olá'
     })
 
 })
 
 // disponibilizar porta
 chamaExpress.listen(3000)