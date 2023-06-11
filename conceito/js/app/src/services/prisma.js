//export prisma
const { PrismaClient, Prisma } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Connect the client
  await prisma.$connect()
  // ... you will write your Prisma Client queries here
  console.log("Conectado ao mysql")
  console.log("validando a existência do tenant, caso não exista, será criada")
  const tableExists = await prisma.tenant.findUnique({where: {name: 'efault'}})
  if (tableExists === null) {
    console.log('formatando')
  } else {console.log("BOOTSTRAP COMPLETE! , no need to create database!!")}
}
// caso precise desconectar a cada query, utilize o parametro assincrono abaixo
main()
module.exports = prisma

