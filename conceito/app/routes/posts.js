const roteador = require('express').Router()

roteador.post('/',(req,res)=>{
    return res.status(200).json({caminho:`From POST to / , in ${__filename}`})
})
roteador.post('/ue',(req,res)=>{
    return res.send(`From UE, in ${__filename}`)
})

module.exports = roteador