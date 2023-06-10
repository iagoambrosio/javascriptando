const prisma = require('../services/prisma')
const localDatabase = require('../services/localstorage')

class User {


    async create(){
    const user = await prisma[user].create({ data: req.body, } );
    }
    async find(){
    const user = await prisma[user].findMany();
    }

}



module.exports = User