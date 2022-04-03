
let prato;
let bebida;
let sobremesa;

let pratoEscolhido;
let precoPrato;

let bebidaEscolhida;
let precoBebida;

let sobremesaEscolhida;
let precoSobremesa;

function marcarPorCategoria(selecionado, produto, categoriaMarcada) {

    if (selecionado !== null) {
        //REMOVE A CLASSE SELECIONADO DO PRODUTO E ESCONDE MARCADOR
        selecionado.classList.remove("selecionado");
        selecionado.querySelector(".check").classList.add("escondido");


        if (categoriaMarcada === "pratos") {
            prato = undefined;
            pratoEscolhido = undefined;
            precoPrato = undefined;
        }

        if (categoriaMarcada === "bebidas") {
            bebida = undefined;
            bebidaEscolhida = undefined;
            precoBebida = undefined;
        }

        if (categoriaMarcada === "sobremesas") {
            sobremesa = undefined;
            sobremesaEscolhida = undefined;
            precoSobremesa = undefined;
        }
    }

    //VERIFICA SE NOVA SELEÇÃO DE PRODUTO É DIFERENTE DA ANTERIOR
    if (selecionado !== produto) {
        //ADICIONA A CLASSE SELECIONADO DO PRODUTO E MOSTRA MARCADOR
        produto.classList.add("selecionado");
        produto.querySelector(".check").classList.remove("escondido");
        const precoProduto = parseFloat(produto.querySelector(".preco").querySelector("span").innerText.replace(',','.'));

        if (categoriaMarcada === "pratos") {
            prato = "ok";
            pratoEscolhido = produto.querySelector(".titulo").innerText;
            precoPrato = Number(precoProduto);
        }

        if (categoriaMarcada === "bebidas") {
            bebida = "ok";
            bebidaEscolhida = produto.querySelector(".titulo").innerText;
            precoBebida = Number(precoProduto);
        }

        if (categoriaMarcada === "sobremesas") {
            sobremesa = "ok";
            sobremesaEscolhida = produto.querySelector(".titulo").innerText;
            precoSobremesa = Number(precoProduto);
        }
    }
    console.log(pratoEscolhido);
    console.log(precoPrato);
    console.log(bebidaEscolhida);
    console.log(precoBebida);
    console.log(sobremesaEscolhida);
    console.log(precoSobremesa);
    let total = precoPrato + precoBebida + precoSobremesa;
    total = total.toFixed(2);

    console.log(total);
}


function marcarProduto(produto) {
    const selecionado = produto.parentElement.querySelector(".selecionado");
    const categoriaMarcada = produto.parentElement.classList.item(1);
    const botaoPedido = document.querySelector(".botao-pedido");

    marcarPorCategoria(selecionado, produto, categoriaMarcada);

    if (prato !== undefined && bebida !== undefined && sobremesa !== undefined) {
        botaoPedido.classList.add("botao-ativo");
        botaoPedido.querySelector("p").innerText = "Fechar Pedido";
        botaoPedido.disabled = false;
    } else {
        botaoPedido.classList.remove("botao-ativo");
        botaoPedido.querySelector("p").innerText = "Selecione os 3 itens para fechar o pedido";
        botaoPedido.disabled = true;
    }
}




