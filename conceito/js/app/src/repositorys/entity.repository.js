const prisma = require('../services/prisma')
const localDatabase = require('../services/localstorage')
const ENV = process.env.ENV
//entidade

const entity = new localDatabase('./data')

class Entity {
    constructor(){}
    async create(requisicao, reqbody){
    if ( ENV === 'prod'){
       const entity = await prisma[requisicao].createMany({ data: [reqbody], } );
       return entity}
    else {
        return entity.write('./data',reqbody)
    }
}
    async find(requisicao, uniquereq){
    if ( ENV === 'prod'){
        if (!uniquereq){
       const entity = await prisma[requisicao].findMany();
       return entity}  
        else {
       const entity = await prisma[requisicao].findMany({where: uniquereq});
       return entity
    }
} 
    else {
       const key = Object.keys(uniquereq)
       const value = Object.values(uniquereq)
       
       if(!uniquereq){ return entity.find('./data') }
       
       else{
       return entity.find('./data',key[0],value[0])    
       }
    }
}
    async update(requisicao, reqbody, uniquereq ){
        if ( ENV === 'prod'){
        const entity = await prisma[requisicao].updateMany({ where: uniquereq , data: reqbody, } );
        return entity
    }   
        else{
        const {name} = reqbody
        const key = Object.keys(uniquereq)
        const value = Object.values(uniquereq)
        entity.modify('./data',key[0],value[0],name)
    }
}
    async delete(requisicao,  uniquereq ){
        const entity = await prisma[requisicao].deleteMany({ where: uniquereq } );
        return entity
    }
}

module.exports = Entity