function pegaDados() {
    let conta = document.getElementById('conta').value;
    let senha = document.getElementById('senha').value;
    let tipo;
    let aux = document.getElementsByName('fav_language');
    for (let auxs of aux) {
        if (auxs.checked) {
            tipo = auxs.value;
            console.log(tipo);
            break;
        }
    }
    let instancia = instanciaConta(conta, senha, tipo);
    telaOperacoes(instancia);
    return [instancia, tipo];
}

function telaOperacoes(instancia) {
    let label = document.createElement('label');
    let buttonY = document.createElement('button');
    let buttonN = document.createElement('button');
    let br = document.createElement('br');
    label.textContent = 'Você deseja fazer o seu primeiro depósito?';
    buttonY.textContent = 'Sim';
    buttonY.id = 'y';
    buttonY.onclick = function () {
        depositoSM("y", instancia);
    };
    buttonN.textContent = 'Não';
    buttonN.id = 'n';
    buttonN.onclick = function () {
        depositoSM("n", instancia);
    };
    document.body.appendChild(label);
    document.body.appendChild(br);
    document.body.appendChild(buttonY);
    document.body.appendChild(buttonN);
    document.body.appendChild(br);
}

function depositoSM(resposta, conta) { 

    switch (resposta) {
        case 'y':
            let br = document.createElement('br');
            let label = document.createElement('label');
            label.textContent = 'Insira o valor a ser depositado:';
            let input = document.createElement('input');
            input.id = 'deposito';
            let button = document.createElement('button');
            button.textContent = 'Depositar';
            button.id = 'Depositar';
            button.onclick = function () {
                conta.deposito(Number(document.getElementById('deposito').value));
                let fimOperacao = document.createElement('label');
                fimOperacao.textContent = `O seu novo saldo é R$ ${conta.getSaldo}!`;
                fimOperacao.id = 'fimOperacao';
                document.body.appendChild(br.cloneNode());
                document.body.appendChild(fimOperacao);
                document.body.appendChild(br.cloneNode());
                let contapj = String(conta.constructor.name);
                if (contapj == "ContaCorrentePJ") {
                    let label = document.createElement('label');
                    label.textContent = 'Você deseja realizar um empréstimo?';
                    let buttonSim = document.createElement('button');
                    buttonSim.textContent = 'Sim';
                    buttonSim.id = 'sim';
                    let buttonNao = document.createElement('button');
                    buttonNao.textContent = 'Não';
                    buttonNao.id = 'nao'
                    buttonSim.onclick = function () {
                        emprestimo("sim", conta);
                    };
                    buttonNao.onclick = function () {
                        emprestimo("nao", conta);
                    };
                    document.body.appendChild(label);
                    document.body.appendChild(buttonSim);
                    document.body.appendChild(buttonNao);
                    document.body.appendChild(br);
                }

            };
            document.body.appendChild(br);
            document.body.appendChild(label);
            document.body.appendChild(br);
            document.body.appendChild(input);
            document.body.appendChild(button);
            document.body.appendChild(br);
            break;
        case 'n':
            let fimOperacao = document.createElement('label');
            fimOperacao.textContent = "Como você não optou por realizar o primeiro depósito, não há saldo para realizar qualquer outra operação.";
            fimOperacao.id = 'fimOperacao';
            document.body.appendChild(fimOperacao);
            break;
    }
}

function instanciaConta(conta, senha, tipo) { 
    let iconta;
    switch (tipo) {
        case "pj":
            iconta = new ContaCorrentePJ(conta, senha);
            break;
        case "pf":
            iconta = new ContaCorrentePF(conta, senha);
            break;
        case "pp":
            iconta = new ContaPP(conta, senha);
            break;
    }
    return iconta;

}

function emprestimo(aceitaNaoAceita, conta) {
    if (aceitaNaoAceita == "sim") {
        let label = document.createElement('label');
        label.textContent = 'Digite o valor do empréstimo desejado:';
        let input = document.createElement('input');
        input.id = 'valor';
        let button = document.createElement('button');
        button.textContent = 'Solicitar';
        button.id = 'solicitar';
        let br = document.createElement('br');
        button.onclick = () => {
            let valorSolicitado = document.getElementById('valor').value;
            let retorno = conta.emprestimo(valorSolicitado);
            if (retorno) {
                let label4 = document.createElement('label');
                label4.textContent = `Empréstimo no valor de R$ ${valorSolicitado} concedido!`;
                document.body.appendChild(label4);
            }
            else {
                let label4 = document.createElement('label');
                label4.textContent = `Você não possui linha de crédito suficiente. Continue movimentando a sua conta para maiores benefícios.`;
                document.body.appendChild(label4);

            }
        }
        document.body.appendChild(label);
        document.body.appendChild(input);
        document.body.appendChild(button);
        document.body.appendChild(br);

    }
    else {
        let label = document.createElement('label');
        label.textContent = 'Deixa pra uma próxima';
        document.body.appendChild(label);
    }

}

class ContaPP {
    #numeroConta
    #senha
    #saldo
    constructor(numeroConta, senha) {
        this.#numeroConta = numeroConta;
        this.#senha = senha;
        this.#saldo = 0;
    }
    get getSaldo() {
        return this.#saldo;
    }
    get getConta() {
        return this.#numeroConta;
    }
    get getSenha() {
        return this.#senha;
    }

    saque(valor) {
        if (this.#saldo < valor) {
            console.log("Saldo insuficiente!");
        }
        else {
            this.#saldo -= valor;
            console.log("Seu saldo agora é " + this.getSaldo + "!");
        }
    }
    deposito(valor) {
        if (valor > 0) {
            this.#saldo += valor;
            console.log("O seu novo saldo é " + this.getSaldo + "!");
        }
        else {
            console.log("O valor do deposito não deve ser nulo!");
        }
    }

}

class ContaCorrentePF extends ContaPP {
    constructor(numeroConta, senha) {
        super(numeroConta, senha);
    }
    saque(valor) {
        if (this.getSaldo < valor) {
            console.log("Saldo insuficiente");
        }
        else {
            super.saque(valor + 5);
        }
    }
    deposito(valor) {
        if (valor > 0) {
            super.deposito(valor);
        }
        else {
            console.log("O valor do deposito não deve ser nulo");
        }
    }
}

class ContaCorrentePJ extends ContaPP {
    constructor(numeroConta, senha) {
        super(numeroConta, senha);
    }
    saque(valor) {
        if (this.getSaldo < valor) {
            console.log("Saldo insuficiente");
        }
        else {
            super.saque(valor + 10);
        }
    }
    deposito(valor) {
        if (valor > 0) {
            super.deposito(valor);
        }
        else {
            console.log("O valor do deposito não deve ser nulo");
        }
    }
    emprestimo(valorSolicitado) {
        if (valorSolicitado <= (this.getSaldo * 2)) {
            console.log(`empréstimo no valor de R$${valorSolicitado} concedido`);
            return true;
        }
        else {
            console.log(`Você não possui linha de crédito suficiente. Continue movimentando a sua conta para maiores benefefícios`);
        }
    }
}



