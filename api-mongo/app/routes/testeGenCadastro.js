const gerarCadastros =  require('../test/testecad')
const roteador = require('express').Router()
const Cliente = require('../models/Cliente');
const { exists, findOne } = require('../models/Cliente');
const { response } = require('express');

//deserves /test and btwen the routes
//curl "http://localhost/test/cliente?qnt=30&tmn=15&minim=4" # test get
roteador.get('/cliente', async (req,res)=>{

    const randomUser = new gerarCadastros
    //querys: qnt = quantidade de cadastros desejados, tmn = tamanho máximo do nome, minim = tamanho mínimo do cadastro
    try { const usergen = randomUser.gerarCadastros(Number(req.query.qnt),Number(req.query.tmn),Number(req.query.minim))
        res.status(200).json(usergen)
               
    }catch (error) { 
            res.status(500).json({error : error}) 
            console.log("nao foi") 
        }

    }

)
//curl -X POST -H "Content-Type: application/json" -d '{"nome": "Raul" ,"sobrenome": "Jefferson" ,"email": "dsadasd@dusahdhsau.com" ,"telefone": 142341341 ,"cep": 1541254215}' http://localhost:3000/test/cliente
roteador.post('/cliente', async (req,res)=>
{  const {nome,sobrenome,email,telefone,cep} = req.body 
    // validando se a query tem uma string e se chama url, caso sim, cria nomes aleatórios
    if(req.query.url && typeof req.query.url == 'string'){
        async function createUsers() {
            const url = await fetch(req.query.url)
            const urlJson = await url.json()
            return urlJson
}
var urlRequest = await createUsers()
 //mapeamento da url para seus respectivos nomes no json, esse parametro retorna apenas o email
const urlEmail = urlRequest.map(objeto => objeto.email)
//consulta no banco
const consultaBanco = await Cliente.find({ email: { $in: urlEmail }  })
try {
    console.log(consultaBanco.length)
    if (consultaBanco.length === 0){
    await Cliente.create(urlRequest)
    return res.status(200).json({message : ` ${urlEmail} cadastred `})
    }   else { 
    return res.status(403).json({message : ` ${consultaBanco.map(obj => obj.email)} Não pode ser cadastrado, porque já existe no banco `})
  }
}
catch(error)
    {
        res.status(500).json({error})
}

}
//verifica o POST do usuário sem o parametro
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

})
roteador.delete('/cliente/:id', async (req,res)=> {
    const id = req.params.id
    try{
    const clienteid = await Cliente.deleteOne({_id : id})

    res.status(200).json({message: `id: ${id} Deletado`})
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