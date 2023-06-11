const prisma = require('../services/prisma')
const localDatabase = require('../services/localstorage')

//entidade
class Entity {
    constructor(){}

    async create(requisicao, reqbody ){
    const entity = await prisma[requisicao].createMany({ data: [reqbody], } );
    return entity
    }

    async find(requisicao){
    const entity = await prisma[requisicao].findMany();
    return entity
    }

    async update(requisicao, reqbody, uniquereq ){
        const entity = await prisma[requisicao].updateMany({ where: uniquereq , data: reqbody, } );
        return entity
    }
    async delete(requisicao, reqbody, uniquereq ){
        const entity = await prisma[requisicao].deleteMany({ where: uniquereq } );
        return entity
    }
}

module.exports = Entity