const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true})) 
const moduler = require('./routes/manage.js')
const mainPaths = ["/main","/edit","/user","/product"]

// a nível de rota, o use recebe o caminho e manda para o Route do express
app.use(mainPaths, moduler)
app.post(mainPaths, moduler)
app.put(mainPaths, moduler)
app.options(mainPaths, moduler)
app.delete(mainPaths, moduler)
app.patch(mainPaths, moduler)
// infra bind and listener
app.listen(3000)
app.bind("0.0.0.0")