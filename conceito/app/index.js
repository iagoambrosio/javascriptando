const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true})) 
const moduler = require('./routes/methods')
const mainPaths = ["/main","/edit","/user","/kudo","/inventory"]
// a nível de rota, o use recebe o caminho e manda para o Route do express
app.post(mainPaths, moduler)
app.use(mainPaths, moduler)
app.put(mainPaths, moduler)
app.options(mainPaths, moduler)
app.delete(mainPaths, moduler)
app.patch(mainPaths, moduler)
// infra bind and listener
app.listen(3000)
app.bind("0.0.0.0")