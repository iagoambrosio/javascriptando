//Exporta express
const router = require('express').Router()
// chama o objeto exportado em Person.js
const Person = require('../models/Person.js')
 
//Rotas GET
 router.get("/", async (req,res) =>{
    console.log(res.body) 
    //response
  try {
    const people = await Person.find()
    res.status(200).json(people) 
    }

    catch (error) { 
        res.status(500).json({error: error}) 
    }
 })

 router.get('/:id', async (req, res)=>{
  //Extrair dados de acordo com a requisição solicitada req.params.id = id do banco do mongodb
  console.log(req.params.id)
  const id = req.params.id
//findOne, utilizado para retornar um resultado do banco
  try {
    const person = await Person.findOne({_id : id})
    res.status(200).json(person)
  }
  catch (error){
    res.status(500).json({error: error})
  }

 })

// Rostas POST
// curl -X POST -H "Content-Type: application/json" -d '{"name" : "João", "salary" : 2000, "approved" : true }' https://devopers.ddns.net/person
router.post(`/`, async (req,res) => {
    console.log(req.body)
    // req.body
    // {name: "Matheus", salary: 5000, approved: false }
    
    const {name,salary,approved} = req.body
    
    //Validação se o usuário enviou um nome
    if(!name){
        res.status(422).json({
            Mensagem : "Usuário não encontrado"
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

})

//rotas UPDATE

router.patch('/:id', async (req,res) => {
    console.log(req.body)
    const person = await Person.findOne({_id : id})
    try {
        Person.updateOne()
    } catch(error){
        res.status(500).json({error: error})
}
})

module.exports = router