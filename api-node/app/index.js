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
// chama função para conectar no banco de dados 
const mongodbservice = require('./models/Conectar.js')
//chama a função de personRoutes
const personRoutes = require('./routes/personRoutes.js')
//Conecta no mongo
mongodbservice()
// middlewares (meios de comunicação)/ formas de ler os arquivos

Express.use(
    express.urlencoded(
        {extended:true}
    )
)

//Versão API
const versaoApi ='/api/v1'


Express.use(`/api`, personRoutes)
Express.use(`${versaoApi}`, personRoutes)


 //chamaExpress.use(express.json())
 
 // ler json
 



 

 // disponibilizar porta e fixa ip na em todas as interfaces
 Express.listen(3000)
 Express.bind('0.0.0.0')