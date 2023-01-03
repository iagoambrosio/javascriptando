const gerarCadastros =  require('../test/gerarCadastro.js')
const roteador = require('express').Router()

roteador.get('/gerarpessoa', async (req,res)=>{
    try {
        const {cnt} = req.query;
        const gerarpessoa = gerarCadastros(cnt)
        res.status(200).json(gerarpessoa)
        console.log(req.query) 
    }
        catch (error) { 
            res.status(500).json({error: error}) 
        }
        console.log(req.headers)
})
module.exports = roteador