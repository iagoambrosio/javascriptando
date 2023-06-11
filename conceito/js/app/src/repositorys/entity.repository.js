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
    if ( ENV === 'prod'){if (!uniquereq){
       const entity = await prisma[requisicao].findMany();
       return entity}  
    else {
       const entity = await prisma[requisicao].findMany({where: uniquereq});
       return entity}} 
    else {
        console.log(uniquereq)
       return entity.find('./data')    
    }
}
    async update(requisicao, reqbody, uniquereq ){
        const entity = await prisma[requisicao].updateMany({ where: uniquereq , data: reqbody, } );
        return entity
    }
    async delete(requisicao,  uniquereq ){
        const entity = await prisma[requisicao].deleteMany({ where: uniquereq } );
        return entity
    }
}

module.exports = Entity