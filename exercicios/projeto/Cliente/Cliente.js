const Conta = require('../Conta/Conta');

class Cliente {
  nome;
  #cpf;
  #renda;
  #conta;

  static todosClientes = [];

  registrar(nome, cpf, renda, conta) {
    if (conta instanceof Conta) {
      this.nome = nome;
      this.#cpf = cpf;
      this.#renda = renda;
      this.#conta = conta;

      Cliente.todosClientes.push({ nome: this.nome, cpf: this.#cpf, renda: this.#renda, conta: this.#conta })
      
      return `Cliente cadastrado com sucesso!`;
    } else {
      throw new Error(`Houve um erro! Cliente não cadastrado...`);
    }
  }

  get getRenda(){
    return this.#renda;
  }
}

module.exports = Cliente
