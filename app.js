let listaDeNumerosSorteados = [];// Uma lista vazia para armazenar os números sorteados anteriormente
let numeroLimite = 10; // O limite superior para o número secreto
let numeroSecreto = gerarNumeroAleatorio();// Variável que guarda o número secreto gerado aleatoriamente
let tentativas = 1; // Contador de tentativas do jogador

function exibirTextoNaTela(tag, texto) { // Função para exibir texto na tela, também utiliza a API de texto para voz para falar o texto
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() { // Função para exibir a mensagem inicial do jogo
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial(); // Chamada da função para exibir a mensagem inicial

function verificarChute() { // Função para verificar o chute do jogador e comparar com o número secreto
    let chute = document.querySelector('input').value; 
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; /*verifico se é tentativa no plural ou singular*/
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); /*reinicio o jogo*/
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() { // Função para gerar um número aleatório que não foi sorteado anteriormente
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); 
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; 

    if (quantidadeDeElementosNaLista == numeroLimite) { 
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { 
        return gerarNumeroAleatorio(); 
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() { // Função para limpar o campo de entrada após cada tentativa
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() { // Função para reiniciar o jogo, gerar um novo número secreto e limpar o campo de entrada
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}







