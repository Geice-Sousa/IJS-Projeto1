const ContaGold = require('./ContaGold');

describe('CLASSE CONTA GOLD', () => {
   const contaGold = new ContaGold();

  describe('criação de uma nova conta gold', () => {

    test('instanciação da classe', () => {
      expect(contaGold instanceof ContaGold).toBeTruthy();
    });

    test('criação de uma conta', ()=>{
      expect(contaGold.criarConta('0010', '12345', 6000)).toBe('Conta cadastrada com sucesso!')
    });

    test('erro ao tentar criar uma conta com dado inválido', ()=>{

      expect(contaGold.criarConta('100', '12345', 500)).toBe('Dados inválidos!')
    });

    test('erro ao tentar criar uma conta com renda insuficiente', ()=>{

      expect(contaGold.criarConta('0010', '12345', 500)).toBe('Renda insuficiente!')
    });

    test('erro ao tentar criar uma conta com renda acima da regra de negócio', ()=>{

      expect(contaGold.criarConta('0010', '12345', 50000)).toBe('De acordo com a renda, você deve aderir a conta Premium.')
    });
  });

  describe('testa método transferir', ()=>{
    const contaRecebedora = contaGold.criarConta('0010', '12345', 50000);
    const contaPagadora = contaGold.criarConta('0010', '67890', 10000);
    test('erro de transferência por causa do valor acima do limite', ()=>{

      const transferencia = contaPagadora.transferir(5010, '0010', '12345')

      expect(transferencia).toBe('Não é possível realizar transferências maiores que R$5.000,00.');
    });
    
    test('sucesso ao realizar transferência', () => { 
      const transferencia = contaPagadora.transferir(1000, '0010', '12345')
      expect(transferencia).toBe('Transferência realizada com sucesso!');
      expect(contaPagadora.getSaldo).toBe(9000);
      expect(contaRecebedora.getSaldo).toBe(51000);
    });

  });

  describe('testa o limite de transação do método pix', ()=>{
    contaGold.criarConta('0010', '12345', 50000);
    contaGold.criarChavePix('email@email.com', 'email');
    const pixPagador = contaGold.criarConta('0010', '67890', 10000);

    test('valor dentro do limite', () => { 
      const transferenciaPixOK = pixPagador.pix(750, 'email@email.com', 'email');
      
      expect(transferenciaPixOK).toBe('Pix realizado com sucesso!')
    });

    test('valor maior que o limite', () => { 
      const transferenciaPixError = pixPagador.pix(7500, 'email@email.com', 'email'); 

      expect(transferenciaPixError).toBe('Transferência não realizada, o valor máximo por dia é R$5.000,00') 
    });
  })

});