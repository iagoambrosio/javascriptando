//Exporta express
const roteador = require('express').Router()

const Quest = require('../models/quest.js')

const database = require('../models/data.js')
 

 roteador.get("/quest", async (req,res) =>{ 
    //response
  try {
    const quests = await database.quest
    res.status(200).json(quests) 
    }
    catch (error) {
        res.status(500).json({error: error}) 
    }
 })
 roteador.post("/quest", async (req,res) =>{ 

try {
  if(req.body.type === "special" && typeof req.body.descript == "string"){
   const novaquest = new Quest(crypto.randomUUID(),req.body)
   database.quest.push(novaquest)
   return res.status(200).json(novaquest)
  }
  else {
    return res.status(401).json({"msg":"O Tipo e a descrição são obrigatórios, o tipo precisa ser 'special'"})
  }
}
  catch (error) {
      res.status(500).json({error: error}) 
  }
})

 
module.exports = roteador