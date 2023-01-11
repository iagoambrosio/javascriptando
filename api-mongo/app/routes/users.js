const gerarCadastros =  require('../test/gerarCadastro.js')
const roteador = require('express').Router()

roteador.get('/users', async (req,res)=>{
    try {
        const {qnt} = req.query;
        const gerarpessoa = gerarCadastros(qnt)
        res.status(200).json(gerarpessoa)
        console.log(req.query) 
    }
        catch (error) { 
            res.status(500).json({error: error}) 
        }
        console.log(req.headers)
})
module.exports = roteador