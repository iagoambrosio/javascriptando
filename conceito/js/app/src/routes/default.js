const roteador = require('express').Router()
const prisma = require('../services/prisma')
const user = require('../repositorys/user.repository')

const subpaths = ['/','/:id','/:name','/:email']

roteador.get(subpaths,async (req,res)=>{
    const user = await prisma['user'].findMany();
    res.json(user);
})
roteador.post(subpaths, async (req,res)=>{
    const user = await prisma['user'].create({ data: req.body, } );
    res.json(user)
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