//VARIÁVEIS GLOBAIS
let pratoEscolhido;
let precoPrato;

let bebidaEscolhida;
let precoBebida;

let sobremesaEscolhida;
let precoSobremesa;

let total;

let nome;
let endereco;

/* - MARCA PRODUTO SELECIONADO POR CATEGORIA
   - ARMAZENA PRODUTO ESCOLHIDO E SEU VALOR E FAZ A SOMA DO TOTAL DO PEDIDO */
function marcarPorCategoria(selecionado, produto, categoriaMarcada) {
    /* - VERIFICA SE JÁ EXISTE PRODUTO SELECIONADO NA CATEGORIA E DESMARCA CASO TENHA 
         - REDEFINE OS VALORES ARMAZENADOS DA SELEÇÃO ANTERIOR */
    if (selecionado !== null) {
        //REMOVE A CLASSE "SELECIONADO" DO PRODUTO E ESCONDE MARCADOR
        selecionado.classList.remove("selecionado");
        selecionado.querySelector(".check").classList.add("escondido");

        //REDEFINE VALORES ARMAZENADOS NAS VARIÁVEIS GLOBAIS DE CADA CATEGORIA
        if (categoriaMarcada === "pratos") {
            pratoEscolhido = undefined;
            precoPrato = undefined;
        }

        if (categoriaMarcada === "bebidas") {
            bebidaEscolhida = undefined;
            precoBebida = undefined;
        }

        if (categoriaMarcada === "sobremesas") {
            sobremesaEscolhida = undefined;
            precoSobremesa = undefined;
        }
    }

    /* - VERIFICA SE NOVA SELEÇÃO DE PRODUTO É DIFERENTE DA ANTERIOR E MARCA NOVA SELEÇÃO
         - ARMAZENA VALORES DOS ITENS SELECIONADOS */
    if (selecionado !== produto) {
        /* - ADICIONA A CLASSE "SELECIONADO" AO PRODUTO E MOSTRA MARCADOR
               - TRANSFORMA MARCADOR DECIMAL DO PREÇO DE VÍRGULA PARA PONTO */
        produto.classList.add("selecionado");
        produto.querySelector(".check").classList.remove("escondido");
        const precoProduto = parseFloat(
            produto
                .querySelector(".preco")
                .querySelector("span")
                .innerText.replace(",", ".")
        );

        /* ARMAZENA OS VALORES DOS ITENS ESCOLHIDOS NA VARIÁVEIS GLOBAIS DE CADA CATEGORIA E 
            TRANSFORMA OS PREÇOS EM NÚMEROS */
        if (categoriaMarcada === "pratos") {
            pratoEscolhido = produto.querySelector(".titulo").innerText;
            precoPrato = Number(precoProduto);
        }

        if (categoriaMarcada === "bebidas") {
            bebidaEscolhida = produto.querySelector(".titulo").innerText;
            precoBebida = Number(precoProduto);
        }

        if (categoriaMarcada === "sobremesas") {
            sobremesaEscolhida = produto.querySelector(".titulo").innerText;
            precoSobremesa = Number(precoProduto);
        }
    }

    //SOMA O VALOR TOTAL DO PEDIDO, DEFINE O NÚMERO DE DECIMAIS PARA 2 DÍGITOS TRANSFORMANDO-O EM STRING NOVAMENTE
    total = precoPrato + precoBebida + precoSobremesa;
    total = total.toFixed(2);
}

/* - BUSCA LOCALIZAÇÃO DOS ELEMENTOS NECESSÁRIOS PARA RODAR FUNÇÃO DE MARCAR POR CATEGORIA
   - ATIVA BOTÃO DE FECHAR PEDIDO QUANDO SELECIONADAS AS 3 OPÇÕES */
function marcarProduto(produto) {
    //BUSCA ELEMENTOS DE ENTRADA PARA FUNÇÃO MARCAR POR CATEGORIA
    const selecionado = produto.parentElement.querySelector(".selecionado");
    const categoriaMarcada = produto.parentElement.classList.item(1);
    //BUSCA ELEMENTO DO BOTÃO "FECHAR PEDIDO"
    const botaoPedido = document.querySelector(".botao-pedido");
    //CHAMA FUNÇÃO DE MARCAR PRODUTO COM ELEMENTO DA CATEGORIA SELECIONADA, ELEMENTO DO PRODUTO ESCOLHIDO E NOME DA CATEGORIA SELECIONADA
    marcarPorCategoria(selecionado, produto, categoriaMarcada);

    //VERIFICA SE FOI ESCOLHIDA UMA OPÇÃO EM CADA CATEGORIA E ATIVA O BOTÃO EM CASO VERDADEIRO
    if (pratoEscolhido !== undefined && bebidaEscolhida !== undefined && sobremesaEscolhida !== undefined) {
        botaoPedido.classList.add("botao-ativo");
        botaoPedido.querySelector("p").innerText = "Fechar Pedido";
        botaoPedido.disabled = false;
    } else {
        botaoPedido.classList.remove("botao-ativo");
        botaoPedido.querySelector("p").innerText = "Selecione os 3 itens para fechar o pedido";
        botaoPedido.disabled = true;
    }
}

//ENVIA OS VALORES DO PEDIDO VIA MENSAGEM POR WHATSAPP
function pedir() {
    nome = prompt("Informe quem receberá o pedido:");
    endereco = prompt("Informe o endereço completo de entrega:");

    /* - VERIFICA SE NOME E ENDEREÇO FORAM INFORMADOS
       - EM CASO VERDADEIRO ADICIONA OS ITENS ESCOLHIDOS E SEUS VALORES NOS ELEMENTOS DA CAIXA DE CONFIRMAÇÃO E MOSTRA A CAIXA*/
    if (nome !== "" && endereco !== "" && nome !== null && endereco !== null) {
        //VARIÁVEIS DE ARMAZENAMENTO DOS ITENS ESCOLHIDOS PARA CAIXA DE CONFIRMAÇÃO
        const janelaConfirmacao = document.querySelector(".confirmar-pedido");
        const pratoConfirmar = janelaConfirmacao.querySelector(".prato-escolhido");
        const bebidaConfirmar = janelaConfirmacao.querySelector(".bebida-escolhida");
        const sobremesaConfirmar = janelaConfirmacao.querySelector(".sobremesa-escolhida");
        const totalConfirmar = janelaConfirmacao.querySelector(".total-pedido");

        //SUBSTITUI PONTO POR VÍRGULA NOS PREÇOS
        function pontoPorVirgula (preco) {
            return preco.toFixed(2).replace(".", ",");
        }
        //VARIÁVEIS DE ARMAZENAMENTO DOS PREÇOS DAS OPÇÕES ESCOLHIDAS
        let precoPratoConfirmar = pontoPorVirgula(precoPrato);
        let precoBebidaConfirmar = pontoPorVirgula(precoBebida);
        let precoSobremesaConfirmar = pontoPorVirgula(precoSobremesa);
        let valorTotalConfirmar = total.replace(".", ",");

        //SUBSTITUIÇÃO DOS PREÇOS E NOMES DOS PRATOS ESCOLHIDOS PARA CAIXA DE CONFIRMAÇÃO 
        pratoConfirmar.querySelector("p").innerText = pratoEscolhido;
        pratoConfirmar.querySelector("span").innerText = precoPratoConfirmar;
        bebidaConfirmar.querySelector("p").innerText = bebidaEscolhida;
        bebidaConfirmar.querySelector("span").innerText = precoBebidaConfirmar;
        sobremesaConfirmar.querySelector("p").innerText = sobremesaEscolhida;
        sobremesaConfirmar.querySelector("span").innerText = precoSobremesaConfirmar;
        totalConfirmar.querySelector("span").innerText = `R$ ${valorTotalConfirmar}`;
        
        //MOSTRA A CAIXA DE CONFIRMAÇÃO
        janelaConfirmacao.classList.remove("escondido");

    } else {
        alert("Por favor informe quem receberá o pedido e o endereço de entrega!");
    }
}

//ENVIA MENSAGEM VIA WHATSAPP COM TODAS AS INFORMAÇÕES DO PEDIDO
function confirmarPedido() {
    let mensagemPedido = `Olá, gostaria de fazer o pedido: \n- Prato: ${pratoEscolhido}\n- Bebida: ${bebidaEscolhida}\n- Sobremesa: ${sobremesaEscolhida}\nTotal: R$ ${total}\n\nNome: ${nome}\nEndereço: ${endereco}`;
    mensagemPedido = encodeURIComponent(mensagemPedido);
    window.open(`https://wa.me/5532998188861?text=${mensagemPedido}`);
}
//VOLTA PARA TELA INICIAL DE SELEÇÃO DO PEDIDO
function cancelarPedido() {
    document.querySelector(".confirmar-pedido").classList.add("escondido");
}
