/*
Questão 11: Faça um algoritmo que receba o mes e ano de nascimento de uma pessoa e o mes
e ano atual, calcule e mostre a idade desta pessoa em anos, meses e dias. Como existe a
possibilidade do usuario digitar o ano atual menor do que o ano de nascimento, ou os meses
foram do intervalo de 1 à 12, deverá ser exibido a mensagem “Impossivel realizar o calculo. Anos
e/ou meses invalidos”. Considere para o mes inicial o primeiro dia e para o mes final o ultimo dia
do respectivo mês.

OBS: considere a quantidade de dias de cada mês. Fevereiro terá sempre 28 idas (ignorar ano
bissexto);
*/
var anoI = 2020
var anoF = 2018
var mesI = 1
var mesF = 2
contDias = 0;
qtdDiasAno= 365;
difAnos = anoF - anoI;

var meses= [31,28,31,30,31,30,31,31,30,31,30,31];

if(mesI < 1 || mesF > 12 || anoI > anoF || mesI > 12 || mesF<1){
    console.log("Impossivel realizar o calculo. Anos e/ou Meses inconsistentes");
}
else if(anoI == anoF && mesI == mesF){
    for(let i = mesI-1; i <= mesF-1; i++){
        contDias += meses[mesI -1];
    }
    console.log(contDias + " dias");
} 
else if(anoF == anoI){
    if(mesI>mesF){
        console.log("não é possível dentro do mesmo ano o mes inicial ser maior");
    }
    
    else{
        for(let i = mesI-1; i <= mesF-1; i++){
            contDias+=meses[i];
        
        }
        console.log(contDias + " dias");
    }
}
else{
    if(mesF>mesI){
        for(var i = mesF - 1; i>=mesI -1; i--){
            contDias += meses[i];
        }
        resultado = qtdDiasAno * difAnos + contDias;
        console.log(resultado + " dias");
    }
    else{
        for(var i = mesI - 1; i>mesF; i--){
            contDias -= meses[i];
        }
        resultado = qtdDiasAno * difAnos + contDias;
        console.log(resultado + " dias");
    }
}
