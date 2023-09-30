var input = require('fs').readFileSync('palavrasForca', 'utf8');
var aleatoria = Math.floor(Math.random()*10);
var lines = input.split('\n');
const prompt = require("prompt-sync")();

const MASCARA_LETRA = "__";

main()

function main() {
    
    let palavraSecreta = String(lines[aleatoria].trim());
    let tentativasRestantes = 6;
    let letrasTentadas = ""
    let letraEscolhida;
    let palavra;

    do {  

        console.clear();
        console.log("Letras tentadas: " + letrasTentadas);
        console.log();
        console.log("Tentativas restantes: " + tentativasRestantes);
        console.log();
        console.log("Palavra secreta: " + retornarPalavraMascarada(palavraSecreta, letrasTentadas));
        console.log();
        exibirForca(tentativasRestantes);
        console.log();
        letraEscolhida = obterTentativa();
        letrasTentadas += letraEscolhida;
        palavra = retornarPalavraMascarada(palavraSecreta, letrasTentadas).split("       ");
        if(letraEscolhida.length<=1){
            if (!letraExisteNasLetrasTentadas(letraEscolhida, palavraSecreta)) {
                tentativasRestantes--;
            }
            else if(palavra.join("") == palavraSecreta){
                break;
            }
        }
        else{ 
            if(letraEscolhida == palavraSecreta){ 
                break;     
            }
            else{ 
                tentativasRestantes = 0;  
            }
        }
        
    } while (tentativasRestantes > 0 ) 
    
    if (tentativasRestantes == 0 ) {
        console.clear();
        console.log();
        console.log("Você perdeu, tente novamente.");
        console.log("Palavra secreta: " + palavra.join("       "));
        exibirForca(tentativasRestantes);
    }
    else{
        console.clear()
        console.log();
        console.log("VOCÊ GANHOU!"); 
        console.log("Palavra secreta: " + palavra.join("       "));
        exibirForca(tentativasRestantes);
    }
}

function retornarPalavraMascarada(palavraSecreta, letrasTentadas){
    let palavraMascarada = "";
    let letraDescoberta = false;

    for (let posicao = 0; posicao < palavraSecreta.length; posicao++) {
        let letraPalavraSecreta =  palavraSecreta.charAt(posicao);
    
        letraDescoberta = letraExisteNasLetrasTentadas(letraPalavraSecreta, letrasTentadas);
       
        palavraMascarada += montarPalavraMascarada(letraDescoberta, letraPalavraSecreta);

    }

    return palavraMascarada;
}

function montarPalavraMascarada(letraDescoberta, letraPalavraSecreta) {
    let palavraMascarada = "";

    if (letraDescoberta) {
        palavraMascarada = palavraMascarada + letraPalavraSecreta + "       ";
    } else {
        palavraMascarada = palavraMascarada + MASCARA_LETRA + "       ";
    }  

    return palavraMascarada;
}

function letraExisteNasLetrasTentadas(letraPalavraSecreta, letrasTentadas){
    let letraDescoberta = false;
    
    for (let indiceTentadas = 0; indiceTentadas < letrasTentadas.length; indiceTentadas++) {
        if ( letraPalavraSecreta == letrasTentadas.charAt(indiceTentadas) ) {
            letraDescoberta = true
            break;
        } 
    }

    return letraDescoberta;
}

function obterTentativa(){
    let opcao;

    console.log(`Escolha a opção abaixo:
    1 - Digitar uma letra
    2 - Chutar a palavra
    `);
    let validaOpcao;
    do {
        validaOpcao = false;
        opcao = Number(prompt("Digite a opção: "));

        if (opcao != 1 && opcao != 2) {
            console.log("Opção digitada inválida!");
            validaOpcao = true;
        }

    } while (validaOpcao); 

    let resposta;

    switch (opcao) {
        case 1:
            resposta = prompt("Digite a letra desejada: ");
            resposta = resposta.toLowerCase();
            if(resposta.length>1){
                resposta = resposta.charAt(0);
            }
            return resposta;
            
        case 2:
            resposta = prompt("Digite a letra palavra desejada: ");
            resposta = resposta.toLowerCase();
            return resposta;
    }
}

function exibirForca(estado) {
    switch (estado) {
        case 6:
            console.log(`
  +---+
  |   |
      |
      |
      |
      |
  ========= `);
        break;
        case 5:
            console.log(`
  +---+
  |   |
  O   |
      |
      |
      |
  ========= `);
        break;
        case 4:
            console.log(`
  +---+
  |   |
  O   |
  |   |
      |
      |
  ========= `);
        break;
        case 3:
            console.log(`
  +---+
  |   |
  O   |
 /|   |
      |
      |
  ========= `);
        break;
        case 2:
            console.log(`
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
  ========= `);
        break;
        case 1:
            console.log(`
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
  ========= `);
        break;
        case 0:
            console.log(`
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
  ========= `);
    }
}