const roteador = require('express').Router()

roteador.get('/',(req,res)=>{
    res.status(200).json({caminho:`From GET to / , in ${__filename}`})
})
roteador.get('/ue',(req,res)=>{
    res.send(`From UE, in ${__filename}`)
})

module.exports = roteador