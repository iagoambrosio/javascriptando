//export prisma
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Connect the client
  await prisma.$connect()
  // ... you will write your Prisma Client queries here
  console.log("Conectado ao mysql")

}
// caso precise desconectar a cada query, utilize o parametro assincrono abaixo
main()
/*
.then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
*/
module.exports = prisma
