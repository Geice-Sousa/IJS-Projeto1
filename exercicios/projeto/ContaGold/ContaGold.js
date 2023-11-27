// #### Gold
// Clientes com conta Gold são so clientes intermediários do banco com renda mensal de R$5000,00 até R$17.999,99.
// Eles também tem limite de transação de 5000 reais por dia.


const Conta = require("../Conta/Conta");

class ContaGold extends Conta {
  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
    this.limiteTransacional = 5000;
  }

  criarConta(agencia, conta, saldo, renda) {
    if (renda < 5000) {
      return "Não é possível criar conta, renda insuficiente.";
    }
    else if (renda > 18000) {
      return "De acordo com a renda, você deve aderir a conta Premium.";
    }

    super.criarConta(agencia, conta, saldo);
    return "Conta criada com sucesso!";
  }

  transferir(valor, conta, agencia) {
    if (valor > this.limiteTransacional) {
      return "Não é possível realizar transferências maiores que R$5.000,00.";
    }

    super.transferir(valor, conta, agencia);
    return "Transferência realizada com sucesso!";
  }

  pix(valor, chavePix, tipoChave) {
    if (valor > this.limiteTransacional) {
      return "Não é possível realizar pix maior que R$5.000,00.";
    }

    super.pix(valor, chavePix, tipoChave);
    return "Pix realizado com sucesso";
  }
}

module.exports = ContaGold;
