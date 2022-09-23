/* Using Express*/
/* Esse é o gateway */
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', function(req,res){
    let caminhoIndex=__dirname+'/index.html'
    res.sendFile(path.join(caminhoIndex));
    console.log(req.ip+" acessou "+caminhoIndex+";")
});
/**temporário, trocar por links http depois */
/** Para conteúdo estático é melhor utilizar links no front
 * a função "app.use(express.static(__dirname))" se baseia
 * no diretório atual para se referenciar 
 */
app.use("/public",express.static(__dirname+"/public"));
app.use('/',router);
app.listen(process.env.port || 3000);
