const prisma = require("../services/prisma")


class User {
  

	constructor(name, email ,password ){
		this.name = name;
		this.email = email;
		this.password = password;
	}

  async createUser(user) {
  
    try {
      await prisma.user.create({data:user})
      return console.log("usuário criado no banco de dados")
    } catch (e) {
    return  console.log("Erro na tag: ",e.meta) 
    }
     // const allUsers = await prisma.user.findMany()
     // console.log("Todos os usuários ",allUsers)
    }
  async deleteUser(userId){

  try {
      await prisma.user.delete({where: {id: userId}})
      return console.log("usuário criado no banco de dados")
    } catch (e) {
    return  console.log("Erro na tag: ",e.meta) 
    }
  }
  
  async getUsers(){

    try {
      const getusers = await prisma.user.findMany()
        return getusers
           } catch (e) {
      return  console.log("Erro na tag: ",e.meta) 
      }
    }
  
}
module.exports = createUser

