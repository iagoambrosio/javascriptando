const roteador = require('express').Router()
const prisma = require('../services/prisma')
const entity = require('../repositorys/entity.repository')

const subpaths = ['/','/:id','/:name','/:email']

roteador.get(subpaths,async (req,res)=>{
    //com base no caminho da requisição, chamamos o prisma para determinada tabela
    const requisicao = req.path.split('/')[1]
    try {const entidade = await new entity().find(requisicao)
        res.status(200).json(entidade);
    }
    catch (error){
        res.status(500).send({error:error.meta})
    }
})
roteador.post(subpaths, async (req,res)=>{
    const requisicao = req.path.split('/')[1]
    try{
    const entidade = await new entity().create(requisicao, req.body)
    res.status(200).json(entidade);
    }
    catch(error){
    res.status(500).send({error:error.meta})
    }
})
roteador.patch(subpaths, async (req,res)=>{
    const requisicao = req.path.split('/')[1]
    const uniquereq = req.query
    try{
    const entidade = await new entity().update(requisicao, req.body, uniquereq)
    res.status(200).json(entidade);
    }
    catch(error){
    res.status(500).send({error:error.meta})
    }
})
roteador.delete(subpaths, async (req,res)=>{
    const requisicao = req.path.split('/')[1]
    try{
    const entidade = await new entity().delete(requisicao, req.body)
    res.status(200).json(entidade);
    }
    catch(error){
    res.status(500).send({error:error.meta})
    }
})
module.exports = roteador