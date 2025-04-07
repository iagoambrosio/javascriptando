// colocando o modulo express dentro da variável express
const express = require('express')
// colocando a função express() dentro da variavel cExpress
const Express = express()
// chama função para conectar no banco de dados 
const conectar = require('./services/Conectar.js')
//chama a função de personRoutes
const personRoutes = require('./routes/persons.js')
//biblioteca de teste
const gerarPerson = require('./routes/testeGenCadastro.js')
// chama o modulo de caminho
const convertePdf = require('./routes/converterPdf.js')
const path = require('path')
//Conecta no mongo
console.log(process.env.NODE_ENV)
new conectar().banco()
// middlewares (meios de comunicação)/ formas de ler os arquivos
Express.use(express.json())    // <==== parse request body as JSON, para as request não virem em branco
// para o node etender responses em JSON
Express.use(  express.urlencoded(  {extended:true}  )  ) 
// padrão
Express.get('/', (req,res)=>{  res.sendFile(path.join(__dirname,'index.html'))  })
Express.use(`/`, personRoutes)
Express.use(`/util`, gerarPerson)
Express.use(`/util`, convertePdf)
 // disponibilizar porta e fixa ip na em todas as interfaces
 Express.listen(3000)
 Express.bind('0.0.0.0')
