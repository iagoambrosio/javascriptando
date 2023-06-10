//export prisma
const { PrismaClient, Prisma } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Connect the client
  await prisma.$connect()
  // ... you will write your Prisma Client queries here
  console.log("Conectado ao mysql")
}
// caso precise desconectar a cada query, utilize o parametro assincrono abaixo
main()
module.exports = prisma

