const roteador = require('express').Router()
const prisma = require('../services/prisma')
const entity = require('../repositorys/entity.repository')

const subpaths = ['/','/:id','/:name','/:email']

roteador.get(subpaths,async (req,res)=>{
    //com base no caminho da requisição, chamamos o prisma para determinada tabela
    const requisicao = req.path.split('/')[1]
    const user = await new entity().find(requisicao)
    res.status(200).json(user);
})
roteador.post(subpaths, async (req,res)=>{
    const requisicao = req.path.split('/')[1]
    try{
    const user = await new entity().create(requisicao, req.body)
    res.status(200).json(user);
    }
    catch(error){
    res.status(500).send({error:error.meta})
    }
})
roteador.patch(subpaths,(req,res)=>{
    res.status(200).json({caminho:`From PATCH to / `})
})
roteador.put(subpaths,(req,res)=>{
    res.status(200).json({caminho:`From PUT to / `})
})
roteador.delete(subpaths,(req,res)=>{
    res.status(200).json({caminho:`From DELETE to / `})
})
roteador.options(subpaths,(req,res)=>{
    res.status(200).json({caminho:`From OPTIONS to / `})
})
module.exports = roteador