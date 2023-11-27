const Conta = require("./Conta");

describe("CLASSE CONTA", () => {
  const conta = new Conta();

  // beforeEach(()=>{
  //   conta.destruirConta() // usando para apagar as contas criadas, pois a cada vez que roda o teste cria-se todas as contas novamente
  // });

  describe("CRIAÇÃO DE UMA CONTA", () => {
    test("deveria retorna uma conta", () => {
      expect(conta instanceof Conta).toBeTruthy();
    });
    
    test("verifica se os dados da conta são válidos", () => {
      const conta = new Conta("1234", "12345", 5000);

      expect(conta.getAgencia).toBe("1234");
      expect(conta.getConta).toBe("12345");
      expect(conta.getSaldo).toBe(5000);
    });

    test("verifica se a conta foi criada corretamente e retorna uma mensagem de sucesso", () => {

      expect(conta.criarConta("1234", "12345", 5000)).toBe("Conta cadastrada com sucesso!");
      expect(conta.getAgencia).toBe("1234");
      expect(conta.getConta).toBe("12345");
      expect(conta.getSaldo).toBe(5000);

    });
    
    test("verifica se ocorre ERRO quando algum dado é inválido", () => {

      expect(()=>{
        conta.criarConta("12346789", "24680", -2000).toThrow('Dados inválidos!')
      })
    });
  });

  describe("MÉTODO DEPOSITAR", () => {
    conta.criarConta("1234", "12345", 5000);

    test("deveria retornar ERRO ao receber um valor negativo", () => {
        expect(()=>{
          conta.depositar(-30).toThrow('Erro ao depositar. Valor inválido.')
        })
    });

    test("deve efetuar deposito numa conta", () => {
      expect(conta.depositar(500)).toBe('Depósito recebido com sucesso!')
      expect(conta.getSaldo).toBe(5500)
    });

  });

  describe("MÉTODO SACAR", () => {
    test("erro ao tentar sacar -300", () => {
        conta.criarConta("1234", "12345", 5000)

        expect(()=>{
          conta.sacar(-300).toThrow('Valor inválido para saque.')
        })
        expect(conta.getSaldo).toBe(5000)
    });

    test("saque realizado com sucesso", () => {
        conta.criarConta("1234", "12345", 5000)

        expect(conta.sacar(300)).toBe('Saque realizado com sucesso!')
        expect(conta.getSaldo).toBe(4700)
    });

    test("saldo insuficiente para realizar o saque", () => {
        conta.criarConta("1234", "12345", 200);

        expect(()=>{
            conta.sacar(3000).toThrow(`Saldo insuficiente para realizar o saque. Seu saldo é R$ 200!`)
        })
        expect(conta.getSaldo).toBe(200)
    });

  });

  describe("MÉTODO TRANSFERIR", () => {

    const emissor = new Conta()
    const receptor = new Conta()
    
    emissor.criarConta('0001', '12345', 300)
    receptor.criarConta('0002', '67890', 1000)
    test("deveria realizar uma transferência com sucesso quando todos os dados estão corretos", () => {      
      const transferencia = emissor.transferir(200, '0002', '67890')

      expect(transferencia).toBe('Transferência realizada com sucesso!')
      expect(emissor.getSaldo).toBe(100)
      expect(receptor.getSaldo).toBe(1200)

    });

    test("testa ERRO quando a conta não existe para realizar uma transferência ", () => {

      const transferencia = emissor.transferir(200, '0001', '6789')

      expect(()=>{
        emissor.transferir(200, '0001', '6789').toThrow('Conta não encontrada... Verifique novamente os dados.')
      })

    });
  });

  describe("MÉTODO CRIAR PIX", () => {
    test("testa a criação de uma chave-pix através do CPF com sucesso", () => {
      const criaPix = conta.criarChavePix('123456789101', 'CPF');

      expect(criaPix).toBe('Chave Pix do CPF criada com sucesso!')
      expect(conta.chavesPix.cpf).toBe('123456789101')
    });

    test("testa o ERRO na criação de uma chave-pix através do CPF inválido", () => {
      const conta = new Conta()
      const criaPix = conta.criarChavePix('12345', 'CPF');

      expect(criaPix).toBe('Erro: CPF inválido!')
      expect(()=>{ conta.criarChavePix('12345', 'CPF').toThrow('Erro: CPF inválido!') })
    });

    test("testa a criação de uma chave-pix através do e-mail com sucesso", () => {
      const criaPix = conta.criarChavePix('geice@email.com', 'email');

      expect(criaPix).toBe('Chave Pix do Email criada com sucesso!')
      expect(conta.chavesPix.email).toBe('geice@email.com')
    });

    test("testa o ERRO ao tentar criar uma chave-pix através do e-mail inválido", () => {
      const criaPix = conta.criarChavePix('geice@.com', 'email');

      expect(criaPix).toBe('Erro: E-mail inválido!')
      // expect(()=> {conta.criarChavePix('geice@.com', 'email').toThrow('Erro: E-mail inválido!')})
    });

    test("testa a criação de uma chave-pix através do telefone com sucesso", () => {
      const criaPix = conta.criarChavePix('71987620419', 'telefone');

      expect(criaPix).toBe('Chave Pix do Telefone criada com sucesso!')
      expect(conta.chavesPix.telefone).toBe('71987620419')
    });

    test("testa o ERRO ao tentar criar chave-pix pelo telefone inválido", () => {
      const criaPix = conta.criarChavePix('620419', 'telefone');

      expect(criaPix).toBe(`Erro: Telefone inválido!`)
      // expect(()=>{ conta.criarChavePix('620419', 'telefone').toThrow('Erro: E-mail inválido!')})
      
    });
  });
  
  describe('MÉTODO TRANSFERÊNCIA VIA PIX', ()=>{
    const emissor = new Conta()
    const receptor = new Conta()
    
    emissor.criarConta('0001', '12345', 300)
    receptor.criarConta('0002', '67890', 1000)

    test("deveria fazer uma transferência por PIX com sucesso", () => {
      // sozinho ele passa, quando roda todos dá erro
      receptor.criarChavePix('geice@email.com', 'email');

      const fazerPix = emissor.pix(50, 'geice@email.com', 'email')

      expect(fazerPix).toBe('Pix realizado com sucesso!')
      expect(emissor.getSaldo).toBe(250)
      expect(receptor.getSaldo).toBe(1050) 
    });

    test("deveria retornar um ERRO ao tentar fazer um PIX com valor -50", () => {
      receptor.criarChavePix('geice@email.com', 'email');
      
      const fazerPix = emissor.pix(-50, 'geice@email.com', 'email')

      expect(fazerPix).toBe('Valor inválido para realizar o pix.')
    });

    test("deveria retornar um ERRO passar a chavePix errada", () => {
      receptor.criarChavePix('geice@email.com', 'email');
      
      const fazerPix = receptor.pix(50, 'g@email.com', 'email')

      expect(fazerPix).toBe('Pix não encontrado.')

    });

  });

});
