const fs = require('fs')

class localDatabase {
    constructor(database){
        this.database = database
        this.check(this.database)
        this.count = 0
    }
    check(database){ 
        if (fs.existsSync(database)) {
            if (this.count === 0)
          { 
            console.log(`a database ${database} Já existe !`)

          }
            else {return }
          } else {
            fs.writeFileSync(database,JSON.stringify([]))
            console.log(`a database ${database} Foi criada !`)
          }
        
    }
    write(database,data){
    const temp =  fs.readFileSync(database)
    const fileOpen = JSON.parse(temp)
    fileOpen.push(data)
    fs.writeFileSync(database, JSON.stringify(fileOpen))
    }
    find (database,key,value){
      const temp =  fs.readFileSync(database)
      const fileOpen = JSON.parse(temp)
      if ( !key || !value ){  
      console.log(fileOpen)} 
      else {
      const result = fileOpen.filter((item)=> item[key] === value)
      console.log(result)
      }
    }
    delete (database){
      fs.writeFileSync(database,JSON.stringify([]))
      console.log(`a database ${database} foi excluida`)
    }
    modify (database,key,value,newWord){
      const temp =  fs.readFileSync(database)
      const fileOpen = JSON.parse(temp)
      const newValue = fileOpen.map((item) => { if (item[key] === value) { return { ...item, [key]: newWord }; } return item; });
      fs.writeFileSync(database, JSON.stringify(newValue))
      console.log(newValue)
  }   
}


module.exports = localDatabase