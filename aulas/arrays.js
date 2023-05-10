
// Array


const notas1 = [10,6.5, 8, 7.5]

const media4 = (notas1[0] + notas1[1] + notas1[2] + notas1[3])/notas1.length;

console.log(media4)
notas1.length // atributo do tamanho do array

//adicionar no array

notas1.push(7);

const media2 = (notas1[0] + notas1[1] + notas1[2] + notas1[3]+notas1[4])/notas1.length

console.log (media2)

//deletando nota

const notas3 = [10,6,8,9,5]

notas3.pop()

const media3 = (notas3[0] + notas3[1] + notas3[2] + notas3[3]+ notas3[4])/notas3.length

console.log(media3)


//Alterar Arrays

const alunos = ["João","Juliana","Ana","Caio","Lara","Marjorie","Guilherme","Aline","Fabiana","Andre","Carlos","Paulo","Bia","Vivian","Vinicius","Renan","Renata","Daisy","Camilo"]

// fatiando array
console.log(`alunos: \n`)
console.log(alunos)

alunosFatiados = alunos.slice(0, 10)

console.log(`alunosFatiados1 (Cria um novo array): \n`)
console.log(alunosFatiados)

alunosFatiados = alunos.slice(10)

console.log(`alunosFatiados2 (Cria um novo array): \n`)
console.log(alunosFatiados)

//alterando itens da lista

// juliana e ana substituidas por Rodrigo

const alunosSubstituidos = alunos.splice(1, 2, "Rodrigo")

console.log(`alunosSubstituidos (Juliana e Ana) por Rodrigo: \n`)
console.log(alunosSubstituidos)

//array modificado
console.log(`Array alunos modificado \n`)
console.log(alunos)


//concatenando arrays

const salajs = ["Evaldo", "Camis","Mari"]
const salajs2 = ["Juliana", "Leo"," Raquel"]

const salasUnificadas = salajs.concat(salajs2)

console.log(`Salas unificadas \n`)
console.log(salasUnificadas)


//lista com duas dimensões

const alunosLista = ["João","Juliana","Caio","Ana"]

const mediasAlunos = [10,8,7.5,9]

const mixAlunosmedias = [alunosLista,  mediasAlunos]


console.log(`mixAlunos junção de arrays:`)
console.log(mixAlunosmedias)

console.log( `O aluno na primeira lista e na primeira posição é: ${mixAlunosmedias[0][1]} e a nota dela é: ${mixAlunosmedias[1][0]}`)


// - Procurando itens na lista

const alunosLista1 = ["João","Juliana","Caio","Ana"]
const mediasAlunos1 = [10,8,7.5,9]

const mixAlunosmedias1 = [alunosLista1,  mediasAlunos1]

function exibirNotasEMedias(aluno) {
// do primeiro array nós verificamos de aluno existe (booleano)

if (mixAlunosmedias1[0].includes(aluno)) {
console.log(`${aluno} está cadastrado!`)

//retorna o index do aluno, que está sendo procurado na primeira lista
// verificar a proxima variavel
const [alunosLista1,mediasAlunos1] = mixAlunosmedias1

const indice = mixAlunosmedias1[0].indexOf(aluno)

const mediaAlunoIndex = mixAlunosmedias[1][indice]

console.log(`${aluno} tem a média ${mediaAlunoIndex}`) 
} 
  else {
  console.log("aluno nao encontrado")
}

}

exibirNotasEMedias("João")

// for e arrays

const numeros = [100,200,300,400,500,600]

for (let indice=0; indice < numeros.length; indice++) {
console.log(numeros[indice])
}

// media em arrays com for

const notas2 = [10,6.5,8,7.5]

let contador = 0

for (let indice = 0; indice < notas2.length; indice++){
notas2[indice] += contador
//testar trocar o =, deixando apenas +
}
const media1 = contador / notas2.length
console.log(`A media das notas é ${media1}.`)

//medias com for of e arrays


const notas = [10,6.5,8,7.5]

let somaDasNotas = 0

for (let nota of notas){
(somaDasNotas += nota)
}

const media = somaDasNotas / notas.length

console.log(`a média entre as notas é ${media}.`)



// - Objetos e Javascript


//

listaCpfs = [111111, 2222222, 333333]

const pessoa1 = {
nome: " José ",
idade: "32"
}