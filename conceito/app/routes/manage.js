const roteador = require('express').Router()

const subPaths = ["/view","/edit"]

roteador.get('/',(req,res)=>{ res.status(200).json({caminho:`From ${req.url} ${__filename}`}) })
roteador.get(subPaths+'/:id',(req,res)=>{ res.send(`From ${req.url} ${__filename}`)} )
roteador.post(subPaths+'/:id',(req,res)=>{ res.send(`From ${req.url} ${__filename}`)} )
roteador.put(subPaths+'/:id',(req,res)=>{ res.send(`From ${req.url} ${__filename}`)} )
roteador.options(subPaths+'/:id',(req,res)=>{ res.send(`From ${req.url} ${__filename}`)} )
roteador.delete(subPaths+'/:id',(req,res)=>{ res.send(`From ${req.url} ${__filename}`)} )

module.exports = roteador