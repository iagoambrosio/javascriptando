/* isso aqui é um json que deve ser retornado por uma api */ 
const itens=[
    {
        id: 0,
        nome: 'produto_0',
        img: 'https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e',
        quantidade: 0
    },
    {
        id: 1,
        nome: 'produto_1',
        img: 'public/vazio.webp',
        quantidade: 0
    },
    {
        id: 2,
        nome: 'produto_2',
        img: 'public/vazio.webp',
        quantidade: 0
    },
    {
        id: 3,
        nome: 'produto_3',
        img: 'public/vazio.webp',
        quantidade: 0
    },
    {
        id: 4,
        nome: 'produto_4',
        img: 'public/vazio.webp',
        quantidade: 0
    }
]

 /*Ainda não sei arrowfunction, vou deixar aqui por enquanto
    initShop = () =>{

    }
 */

function initShop(){
    let divProdutos = document.getElementById('produto');
    itens.map((val)=>{
      divProdutos.innerHTML+=`
    <div class="um-produto">
        <img src="`+val.img+`"/>
        <p>`+val.nome+`</p>
        <a key="`+val.id+`" href="#">Adicionar ao carrinho!</a>
    </div>
      `
    
})
}
initShop();

function atualizaCarrinho() { 
    let divCarrinho = document.getElementById('carrinho');
    divCarrinho.innerHTML = ""
    itens.map((val)=>{
        if(val.quantidade > 0){
      divCarrinho.innerHTML+=`
   <p>`+val.nome+` | quantidade: `+val.quantidade+`</p>
   <hr>
      `;
        }
    })
}
 
let links = document.getElementsByTagName('a')

for(let i = 0; i < links.length; i++){
    links[i].addEventListener("click",function(){
        let key = this.getAttribute('key');
        itens[key].quantidade++;
        atualizaCarrinho();
        return false;
    })
}
