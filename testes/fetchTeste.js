async function uai (parms) {
for (let i = 0; i < parms;i++){
let promise = await fetch('http://localhost/')
if(promise.status === 200){

console.log(await promise.json())
}
else {
    console.log("ERRO no round "+i)
}
}
}

uai(1)