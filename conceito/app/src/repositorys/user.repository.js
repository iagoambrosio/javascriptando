const prisma = require("../services/prisma")

async function createUser(user) {
    await prisma.$connect()
  
    await prisma.user.create({data:user})

  
    const allUsers = await prisma.user.findMany()
    console.dir(allUsers, { depth: null })
  }

module.exports = createUser
