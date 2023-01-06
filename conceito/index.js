const express = require('express')
const app = express()

app.listen(3000)
app.bind("0.0.0.0")
app.use(express.json())
app.use(express.urlencoded({extended:true})) 
const moduler = require('./routes/gets.js')
const paths = ["/main","/edit","/user"]

// a nível de rota, o use recebe o caminho e manda para o Route do express
app.use(paths, moduler)
app.post(paths, moduler)
app.put(paths, moduler)
app.options(paths, moduler)
app.delete(paths, moduler)
app.patch(paths, moduler)