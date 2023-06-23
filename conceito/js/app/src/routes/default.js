const roteador = require('express').Router()
const entity = require('../repositorys/entity.repository')

const subpaths = ["/user","/application","/tenant"]
//curl -X POST http://localhost:3000/user -H "Content-Type: application/json"  -d '{"name": "linuxize1", "email": "linuxize4@example.c2m", "cel":"11-3232213","tenantName" : "default" }' 
roteador.get(subpaths,async (req,res)=>{
    //com base no caminho da requisição, chamamos o prisma para determinada tabela
    const requisicao = req.path.split('/')[1]
    const uniquereq = req.query
    try {const entidade = await new entity().find(requisicao, uniquereq); res.status(200).json(entidade);}
    catch (error){res.status(500).send({error:error.meta})}
})
roteador.post(subpaths, async (req,res)=>{
    const requisicao = req.path.split('/')[1]
    try{const entidade = await new entity().create(requisicao, req.body); res.status(200).json(entidade);}
    catch (error){res.status(500).send({error:error.meta})}
})
roteador.patch(subpaths, async (req,res)=>{
    const requisicao = req.path.split('/')[1]
    const uniquereq = req.query
    try{const entidade = await new entity().update(requisicao, req.body, uniquereq); res.status(200).json(entidade);}
    catch(error){res.status(500).send({error:error.meta})}
})
roteador.delete(subpaths, async (req,res)=>{
    const requisicao = req.path.split('/')[1]
    const uniquereq = req.query
    try{const entidade = await new entity().delete(requisicao, uniquereq); res.status(200).json(entidade);}
    catch(error){res.status(500).send({error:error.meta})}
})
module.exports = roteador