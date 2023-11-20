// colocando o modulo express dentro da variável express
const express = require('express')
// colocando a função express() dentro da variavel cExpress
const Express = express()
// chama função para conectar no banco de dados 
const personRoutes = require('./routes/quest.js')
// middlewares (meios de comunicação)/ formas de ler os arquivos
Express.use(express.json())    // <==== parse request body as JSON, para as request não virem em branco
// para o node etender responses em JSON
Express.use(  express.urlencoded(  {extended:true}  )  ) 
// padrão
Express.use(`/`, personRoutes)
 // disponibilizar porta e fixa ip na em todas as interfaces
 Express.listen(3000)
 Express.bind('0.0.0.0')
