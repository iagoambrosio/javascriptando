let alunos = ["João","Patricia","Carlos","Eleanor","Matilda","Elias"]

let notas = ["10","3","7","0","9","5"]

let media = [alunos,notas]

console.log(media)
console.log(media[1][4])
console.log(media[0][1])

const array = [21,31]
const arrayForEach = array.forEach(() => {
    })
const arrayMap = array.map((soma) => {
return soma += 1
})

console.log(arrayForEach)
console.log(arrayMap)