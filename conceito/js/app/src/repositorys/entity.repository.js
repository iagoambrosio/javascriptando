const prisma = require('../services/prisma')
const localDatabase = require('../services/localstorage')

//entidade
class Entity {
    constructor(){}
    async create(requisicao, reqbody ){
    const entity = await prisma[requisicao].create({ data: reqbody, } );
    return entity
    }

    async find(requisicao){

    const entity = await prisma[requisicao].findMany();
    return entity

    }
}

module.exports = Entity