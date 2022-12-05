//Exporta express
const router = require('express').Router()
// chama o objeto exportado em Person.js
const Person = require('../models/Person.js')
//Versão API
const versaoApi ='/api/v1'



//Rotas GET
 router.get("/person", async (req,res) =>{
     //response
  try {
    const people = Person.find()
    res.status(200).json(people)
  }
  catch (error){
    res.status(500).json({error: error})
  }
 
 })

 router.get("/v1", function(req,res){
    //response
    res.json({"eita": "ola"})

})

// Rostas POST

// curl -X POST -H "Content-Type: application/json" -d '{"name" : "João", "salary" : 2000, "approved" : true }' https://devopers.ddns.net/api/v1/person
router.post(`/person`, async (req,res) => {

    // req.body
    // {name: "Matheus", salary: 5000, approved: false }
    
    const {name,salary,approved} = req.body
    
    //Validação se o usuário enviou um nome
    

    //define a constante que vai receber parametros para colocar no banco
    const person = {
        name,
        salary,
        approved
    }
    try{
        //tenta criar os dados
        await Person.create(person)

        res.status(201).json({ 
            message: 'Pessoa criada com sucesso no sistema'
        })

    } catch (error){
        //caso tenha algum problema, ele devolve os erros
        res.status(500).json({error: error})
    }

})

module.exports = router