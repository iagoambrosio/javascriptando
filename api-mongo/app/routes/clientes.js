const gerarCadastros =  require('../test/gerarCadastro.js')
const roteador = require('express').Router()
const Cliente = require('../models/Cliente')


roteador.get('/cliente', async (req,res)=>{
    try {
        const {qnt} = req.query;
        const gerarpessoa = gerarCadastros(qnt)
        res.status(200).json(gerarpessoa)
    }
        catch (error) { 
            res.status(500).json({error: error}) 
        }

    }

)

roteador.get('/clientes', async (req,res)=>{
    try{
        
        res.status(200).json(await Cliente.find())
}
        catch (error) { 
            res.status(500).json({error: error}) 
        }
        console.log(req.headers)
})
//curl -X POST -H "Content-Type: application/json" -d '{"nome": "Raul" ,"sobrenome": "Jefferson" ,"email": "dsadasd@dusahdhsau.com" ,"telefone": 142341341 ,"cep": 1541254215}' http://localhost:3000/test/clientes
roteador.post('/clientes', async (req,res)=>
{
    const {nome,sobrenome,email,telefone,cep} = req.body

    if (!nome || !sobrenome || !email || !telefone){
            res.status(400).json({
             message : `Parametro nome ${req.body} é obrigatório`
            })
            //Obrigatório dar return para sair do if e poder liberar a requisição do usuario
            // Erro [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
            return
        } 

    try{
        await Cliente.create(req.body)
        
        console.log(req.body)
        res.status(200).json({message : ` ${req.body.nome} cadastred `})
    }
    catch(error){
        res.status(500).json({error})
    }
}
)

module.exports = roteador