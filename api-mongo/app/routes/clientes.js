const gerarCadastros =  require('../test/gerarCadastro.js')
const roteador = require('express').Router()
const Cliente = require('../models/Cliente');
const { exists, findOne } = require('../models/Cliente');
const { response } = require('express');

//deserves /test and btwen the routes
roteador.get('/cliente', async (req,res)=>{

    function geracao(qnt){
    const gerarpessoa = gerarCadastros(qnt)
    Cliente.create(gerarpessoa)
    return gerarpessoa}

    try {
        if (!req.query.qnt){
            console.log("ue"+req.query)
            res.status(200).json(geracao(1))
        }
        else {
            res.status(200).json(geracao(req.query.qnt))
        }
    }catch (error) { 
            res.status(500).json({error}) 
        }

    }

)
//curl -X POST -H "Content-Type: application/json" -d '{"nome": "Raul" ,"sobrenome": "Jefferson" ,"email": "dsadasd@dusahdhsau.com" ,"telefone": 142341341 ,"cep": 1541254215}' http://localhost:3000/test/cliente
roteador.post('/cliente', async (req,res)=>
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
//validação se o cadastro já existe
//# precisa mudar para um controlador, onde ficam os dominios (regra de negócio)
    try{
        const consultaBanco = await Cliente.exists(req.body)

        if(consultaBanco === null){
            await Cliente.create(req.body)
        res.status(200).json({message : ` ${req.body.nome} cadastred `})
        }else{
            res.status(403).json({message: "Usário já cadastrado, favor utilizar outro cadastro",consultaBanco})
        }
    }
    catch(error){
        res.status(500).json({error})
    }
}
)
roteador.delete('/cliente/:id', async (req,res)=> {
    const id = req.params.id
    try{
    const clienteid = await Cliente.deleteOne({_id : id})

    res.status(200).json(clienteid,{message: "Deletado"})
    }
    catch(error){
    res.status(500).json({error : error})
    }
})
roteador.get('/clientes', async (req,res)=>{
    try{   
        res.status(200).json(await Cliente.find())
}
        catch (error) { 
            res.status(500).json({error: error}) 
        }
})

roteador.delete('/clientes', async (req,res)=> {
    try{
        await Cliente.deleteMany(req.query)
        res.status(200).send(JSON.stringify(req.query)+" Deletado !!")
    }
    catch(error){
        res.status(500).json({error})
    }
})
module.exports = roteador