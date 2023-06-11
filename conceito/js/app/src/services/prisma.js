//export prisma
const { PrismaClient, Prisma } = require('@prisma/client')
const { spawn } = require('child_process');

const prisma = new PrismaClient()

if (process.env.ENV==='prod'){

async function main() {
  // Connect the client
  await prisma.$connect()
  // ... you will write your Prisma Client queries here
  console.log("Conectado ao mysql, modo produção ativo")
  console.log("validando a existência do tenant, caso não exista, será criada")
  const tableExists = await prisma.tenant.findUnique({where: {name: 'default'}})
  if (tableExists === null) {
    console.log('formatando database....')
    const command = spawn('npx' , ['prisma', 'migrate', 'dev', '--name', 'init', '--schema', 'app/prisma/schema.prisma']);
    command.stdout.on('data', (data) => {
      console.log(JSON.stringify({'commandSTDOUT': data.toString()}));
    });
  } 
  else {
    console.log("BOOTSTRAP COMPLETE! , no need to create database!!")}
}
// caso precise desconectar a cada query, utilize o parametro assincrono abaixo
main()
}
module.exports = prisma

