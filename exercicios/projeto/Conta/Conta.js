class Conta {
  #saldo;
  #agencia;
  #conta;
  chavesPix;
  static listaDeContas = []

  constructor(agencia, conta, saldo) {
    this.#agencia = agencia;
    this.#conta = conta;
    this.#saldo = saldo;
    this.chavesPix = {
      cpf: undefined,
      telefone: undefined,
      email: undefined,
    };

    Conta.listaDeContas.push(this) // armazena a conta criada 
  }

  destruirConta(){
    let index = Conta.listaDeContas.indexOf(this);
    Conta.listaDeContas.splice(index, 1)
  }

  criarConta(agencia, conta, saldo) {
    if (agencia.legth !== 4 && conta.legth !== 5 && saldo <= 0) {
      throw new Error("Dados inválidos!");
    }

    this.#agencia = agencia;
    this.#conta = conta;
    this.#saldo = saldo;

    return "Conta cadastrada com sucesso!";
  }

  sacar(valor) {
    if (valor <= 0) {
      throw new Error("Valor inválido para saque.");
    }

    if (valor > this.#saldo) {
      return `Saldo insuficiente para realizar o saque. Seu saldo é R$ ${
        this.#saldo
      }!`;
    }

    this.#saldo -= valor; // this.setSaldo(this.#saldo-valor)
    return "Saque realizado com sucesso!";
  }

  depositar(valor) {
    if (valor <= 0) {
      throw new Error("Erro ao depositar. Valor inválido.");
    }
    this.#saldo += valor;
    return "Depósito recebido com sucesso!";
  }

  transferir(valor, agencia, conta){
    let contaValida = Conta.listaDeContas.find(contaReceptora => {
      let numeroConta = contaReceptora.getConta
      let numeroAgencia = contaReceptora.getAgencia

      return conta === numeroConta && agencia === numeroAgencia
    }); // para verificar se a conta passada existe

    if(!contaValida){
      return 'Conta não encontrada... Verifique novamente os dados.'
      // throw new Error('Conta não encontrada... Verifique novamente os dados.')
    }
    
    if (valor < 0){
      return 'Valor inválido para realizar a tranferência.'
      // throw new Error('Valor inválido para realizar a tranferência.')
    }

    if(this.#saldo - valor > 0){ // a regra de négocio não permite a conta ficar negativada, então o saldo tem que ser sempre >0
     
      this.#saldo -= valor 
    
      contaValida.setSaldo = contaValida.getSaldo + valor
  
      // OU    
      // const saldoAtualizado = this.#saldo - valor  
      // this.setSaldo = saldoAtualizado
      // const saldoContaReceptora = contaValida.getSaldo + valor 
      // contaValida.setSaldo = saldoContaReceptora
      
      return 'Transferência realizada com sucesso!'
    }
  }

  pix(valor, chavePix, tipoChave){
    let pixValido = Conta.listaDeContas.find(conta => conta.chavesPix[tipoChave] === chavePix);

    if(!pixValido){ return 'Pix não encontrado.'}

    if (valor < 0){
      return 'Valor inválido para realizar o pix.'
      // throw new Error('Valor inválido para realizar o pix.')
    }

    if(this.#saldo - valor > 0){
      this.#saldo -= valor
      pixValido.setSaldo = pixValido.getSaldo + valor
      return 'Pix realizado com sucesso!'
    }
  }

  criarChavePix(chave, tipoChave) {
    switch (tipoChave) {
      case "CPF":
        let regexCPF = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;

        if (regexCPF.test(chave)) {
          this.chavesPix.cpf = chave;
          return "Chave Pix do CPF criada com sucesso!";
        } else {
          return `Erro: CPF inválido!`
          // throw new Error('Erro: CPF inválido!')
        }

      case "email":
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (regexEmail.test(chave)) {
          this.chavesPix.email = chave;
          return "Chave Pix do Email criada com sucesso!";
        } else {
          return `Erro: E-mail inválido!`
          // throw new Error('Erro: E-mail inválido!')
        }

      case "telefone":
        let regexTelefone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;

        if (regexTelefone.test(chave)) {
          this.chavesPix.telefone = chave;
          return "Chave Pix do Telefone criada com sucesso!";
        } else {
          return `Erro: Telefone inválido!`
          // throw new Error('Erro: Telefone inválido!')
        }

      default:
        return "Chave inexistente!";
    }
  }

  get getAgencia() {
    return this.#agencia;
  }

  get getConta() {
    return this.#conta;
  }

  get getSaldo() {
    return this.#saldo;
  }

  set setSaldo(novoSaldo) {
    return this.#saldo = novoSaldo;
  }
}

module.exports = Conta;
