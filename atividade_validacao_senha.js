/*
Escreva um algoritmo que solicite o nome completo, a data de nascimento e uma senha do usuário. 
O algoritmo deve avaliar a senha fornecida e verificar se a senha será aceita.

A senha será aceita se atender 2 critérios do Grupo 01 e todos os critérios do Grupo 02.

Grupo 01:
Critérios:

- deve ser composta por no mínimo um dígito.
- deve ser composta por no mínimo um caractere maiúsculo.
- deve ser composta por no mínimo um caractere minúsculo.
- deve ser composta por no mínimo um caractere especial.

Grupo 02: 
Critérios:

- comprimento mínimo de 8 caracteres.
- não deve conter mais do que 3 caracteres repetidos. Ex: aaa, bbb, ccc, 111, ***, etc ...
- não deve conter mais do que 3 caracteres em sequência. Ex: abc, bcd, 234, !@#, @#$, etc ... 
- não deve conter palavras do nome do usuário. Ex: Rogerio ou Freitas ou Ribeiro, caso o nome do usuário seja Rogério de Freitas Ribeiro
- não deve conter o dia, mês ou ano da data de nascimento do usuário. Ex: 15 ou 03 ou 1983 ou 83 caso a data de nascimento seja 15/03/1983
*/

let prompt = require("prompt-sync")();

main();

function main(){

    let nome = prompt("Digite o seu nome: ");
    let data = prompt("Digite sua data nascimento: ");
    let senha, valida, cont = 3;

    do{
        senha = prompt("Digite sua senha: ");
        console.log();
        valida = validaSenha(senha,nome,data);
        console.log();
        console.log("STATUS SENHA:\n");
        
        if(valida){
            if(cont>1){
                cont--
                console.log(`Senha inválida. Você possui ${cont} tentativa${cont <= 1 ? ' restante!\n' : 's restantes!\n'}` );    
            }
            else{
                console.log(`Tentativas excedidas! Tente novamente em alguns minutos!\n`);
                break;
            }
        }
        else{
            console.log(`Senha válida.\n`)
            break;
        }   
    }while(true);
}

function validaSenha(senhaP, nomeP, dataP) {
    
    const ESPECIAL = "@.,:;=-+*!&#(){}[]|><?";
    let valida = true;
    let cont = 0;
    let nome = nomeP.split(" ");
    let data = dataP.split("/");

    for (let i = 0; i < senhaP.length; i++) {
        //GRUPO 2:
        if (senhaP.length < 8) {
            console.log("A senha precisa ter no mínimo 8 caracteres!");
            return valida;
        }
        for (let j = 0; j < senhaP.length - 2; j++) {
            let repetidos = senhaP.charAt(j) + senhaP.charAt(j) + senhaP.charAt(j);
            if (senhaP.includes(repetidos)) {
                console.log("A senha não pode ter 3 caracteres repetidos seguidos!");
                return valida;
            }
        }
        for (let j = 3; j <= 120; j++) {
            let sequencia = String.fromCharCode(j) + String.fromCharCode(j + 1) + String.fromCharCode(j + 2)
            if (senhaP.includes(sequencia)) {
                console.log("A senha não pode conter mais de 3 caracteres em sequência!");
                return valida;
            }
        }
        for (let j = 0; j < nome.length; j++) {
            if (senhaP.includes(nome[j])) {
                console.log("Não pode conter o nome/sobrenome do usuário!");
                return valida;
            }
        }
        for (let j = 0; j < data.length; j++) {
            if (senhaP.includes(data[j])) {
                console.log("Não pode conter a dia/mês/ano de nascimento do usuário!");
                return valida;
            }
        }
        //GRUPO 1:
        for (let j = 0; j <= 9; j++) {
            if (senhaP.charAt(i) == j) {
                cont++;
                break;  
            }
        }
        for (let j = 65; j <= 90; j++) {
            if (senhaP.charAt(i) == String.fromCharCode(j)) {
                cont++;
                break;   
            }
        }
        for (let j = 97; j <= 122; j++) {
            if (senhaP.charAt(i) == String.fromCharCode(j)) {
                cont++;
                break;    
            }
        }
        for (let j = 0; j < ESPECIAL.length; j++) {
            if (senhaP.charAt(i) == ESPECIAL.charAt(j)) {
                cont++;
                break;   
            }
        }
    }
    if (cont >= 2) {
        let validaG1 = false;
        return validaG1;    
    }
    else {
        console.log(`Lembre-se de caracteres especiais, letras minusculas e maisculas e dígitos!`);
        return valida;   
    }
}

