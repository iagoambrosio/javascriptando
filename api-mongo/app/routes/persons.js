//Exporta express
const roteador = require('express').Router()
// chama o objeto exportado em Person.js
const Person = require('../models/Person.js')
 
//Rotas GET
 roteador.get("/person", async (req,res) =>{ 
    //response
  try {
    const people = await Person.find()
    res.status(200).json(people) 
    }

    catch (error) { 
        res.status(500).json({error: error}) 
    }
    console.log(req.headers)
 })

 roteador.get('/person/:id', async (req, res)=>{
  //Extrair dados de acordo com a requisição solicitada req.params.id = id do banco do mongodb
  const id = req.params.id
//findOne, utilizado para retornar um resultado do banco
  try {
    const person = await Person.findOne({_id : id})
    res.status(200).json(person)
  }
  catch (error){
    res.status(500).json({error: error})
  }
  console.log('Parametro da Requisição: '+req.params.id)
  console.log(req.headers)
 })

// Rostas POST
// curl -X POST -H "Content-Type: application/json" -d '{"name" : "João", "salary" : 2000, "approved" : true }' http://localhost:3000/person
  roteador.post(`/person`, async (req,res) => {
    console.log(req.body)
    // req.body
    // {name: "Matheus", salary: 5000, approved: false }
    
    const {name,salary,approved} = req.body
    
    //Validação se o usuário enviou um nome
    if(!name){
        res.status(422).json({
            Mensagem : "Parâmetro nome é obrigatório"
        })
        return
    }

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
    console.log(req.headers)
})

//rotas UPDATE

roteador.patch('/:id', async (req,res) => {
    console.log(req.body)
    const person = await Person.findOne({_id : id})
    try {
        Person.updateOne()
    } catch(error){
        res.status(500).json({error})
}
console.log(req.headers)
})

module.exports = roteador