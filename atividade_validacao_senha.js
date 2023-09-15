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

const VALIDASEQUENCIA = "abcdefghijklmnopqrstuvwxyz@.,:;=-+*!&#(){}[]|><?0123456789";
const ALFABETO = "abcdefghijklmnopqrstuvwxyz";
const ESPECIAL = "@.,:;=-+*!&#(){}[]|><?";
const MAIUSCULAS = ALFABETO.toUpperCase();

let contDigito = 0;
let contMai = 0;
let contMin = 0;
let contEspecial=0;
let sequencia = "";

let nome = prompt("Digite o seu nome completo: ");
let data = prompt("Digite sua data nascimento: ");
let senha = prompt("Digite sua senha: ");

let quebrado = nome.split(" ");
let quebradoData = data.split("/");

for(let i = 0; i<senha.length; i++){
//GRUPO 2:
    //Se a senha é menor que 8:
    if(senha.length<8){
        console.log("A senha precisa ter no mínimo 8 caracteres!");
        return;
    }
    //Se há mais de três caracteres repetidos:
    for(let j = 0; j<senha.length-3;j++){
        if(senha.charAt(j) == senha.charAt(j+1) && senha.charAt(j) == senha.charAt(j+2) && senha.charAt(j) == senha.charAt(j+3)){
            console.log("A senha não pode ter mais de 3 caracteres repetidos seguidos!");
            return;
        }
    }
    //se há mais de 3 carecteres em sequência:
    for(let j = 0; j<VALIDASEQUENCIA.length-3; j++){
        sequencia = VALIDASEQUENCIA.charAt(j)+VALIDASEQUENCIA.charAt(j+1)+VALIDASEQUENCIA.charAt(j+2) +VALIDASEQUENCIA.charAt(j+3);
    
        if(senha.includes(sequencia)){
            console.log("A senha não pode conter mais de 3 caracteres em sequência!");
            return;
        }
    }
    //Se há nome/sobrenome do usuário
    for(let j = 0; j<quebrado.length; j++){
        if(senha.includes(quebrado[j])){
            console.log("Não pode conter o nome/sobrenome do usuário!");
            return;
        }
    }
    //Se há data/mês/ano:
    for(let j = 0; j<quebradoData.length; j++){
        if(senha.includes(quebradoData[j])){
            console.log("Não pode conter a dia/mês/ano de nascimento do usuário!");
            return;
        }
    }
    
//GRUPO 1:
    //Se há dígitos na senha:
    for(let j = 0; j<=9; j++){
        if(senha.charAt(i) == j){
            contDigito++
        }
    }
    //Se há letras maiúsculas e minúsculas na senha:
    for(let j = 0 ; j<MAIUSCULAS.length; j++){
        if(senha.charAt(i)==MAIUSCULAS.charAt(j)){
            contMai++
        }
        if(senha.charAt(i)==ALFABETO.charAt(j)){
            contMin++
        }
    }
    //Se há caracteres especiais na senha:
    for(let j = 0; j<ESPECIAL.length; j++){
        if(senha.charAt(i)==ESPECIAL.charAt(j)){
            contEspecial++
        }
        
    }    
    
}

let contVetor = 0;
let vetor = [contDigito, contMai, contMin, contEspecial];

for(let i = 0; i<vetor.length;i++){
    if(vetor[i]==0){
        contVetor++
    }
}
if(contVetor>2){
    console.log("Senha inválida!");
}
else{
    console.log("Senha válida!");
}
