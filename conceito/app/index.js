const express = require('express')
const app = express()
const prisma = require('@prisma/client')

app.use(express.json())
app.use(express.urlencoded({extended:true})) 
const moduler = require('./src/routes/default')
const mainPaths = ["/","/main","/edit","/user","/kudo","/inventory"]
// a nível de rota, o use recebe o caminho e manda para o Route do express
app.get(mainPaths, moduler)
app.post(mainPaths, moduler)
app.put(mainPaths, moduler)
app.options(mainPaths, moduler)
app.delete(mainPaths, moduler)
app.patch(mainPaths, moduler)
//connect prisma
prisma
// infra bind and listener
app.listen(3000)
app.bind("0.0.0.0")