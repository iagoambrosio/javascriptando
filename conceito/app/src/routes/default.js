const roteador = require('express').Router()
const createUser = require('../repositorys/user.repository')

const subpaths = ['/','/:id','/:name','/:email']

roteador.get(subpaths,(req,res)=>{
    res.status(200).json({caminho:`From GET to / `})
})
roteador.post(subpaths,(req,res)=>{
    console.log(req.body)
    const {name,email,password} = req.body

    if (!name || !password || !email){
            res.status(400).json({
             message : `Parametro nome ${req.body} é obrigatório`
            })
            //Obrigatório dar return para sair do if e poder liberar a requisição do usuario
            // Erro [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
            return
        } 
try{createUser(req.body)
    res.status(200).json({response:`Usuário Criado`})
}
catch{res.status(400).json({response:`Não Deu certo`})}

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