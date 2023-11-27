const Conta = require("../Conta/Conta");

class ContaStandart extends Conta {
  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
    this.limiteTransacional = 1000;
  }

  criarConta(agencia, conta, saldo, renda) {
    if (renda < 4999.99) {
      return "Não é possível criar conta, renda insuficiente.";
    }

    super.criarConta(agencia, conta, saldo);
    return "Conta criada com sucesso!";
  }

  transferir(valor, conta, agencia) {
    if (valor > this.limiteTransacional) {
      return "Não é possível realizar transferências maiores que R$1.000,00.";
    }

    super.transferir(valor, conta, agencia);
    return "Transferência realizada com sucesso!";
  }

  pix(valor, chavePix, tipoChave) {
    if (valor > this.limiteTransacional) {
      return "Não é possível realizar pix maior que R$1.000,00.";
    }

    super.pix(valor, chavePix, tipoChave);
    return "Pix realizado com sucesso!";
  }
}

module.exports = ContaStandart;
