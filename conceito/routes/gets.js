const roteador = require('express').Router()

roteador.get('/',(req,res)=>{
    res.status(200).json({caminho:`From ${__filename}`})
})
roteador.get('/ue',(req,res)=>{
    res.send(`From ${__filename}`)
})

module.exports = roteador