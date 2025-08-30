const { ClienteService } = require('../service/ClienteService');
const { ClienteDao } = require('../dao/ClienteDao');
const { ClienteModel } = require('../model/ClienteModel');
const { FuncoesUtil } = require('../util/FuncoesUtil');

describe('ClienteService - Testes de Integração', () => {
  let service;
  let dao;

  beforeAll(() => {
    service = new ClienteService();
    dao = new ClienteDao();
  });

  afterEach(async () => {
    // Limpa clientes de teste criados para não poluir o banco
    const clientes = await dao.listarTodos(); // supondo que listarTodos exista e funcione
    for (const c of clientes) {
      if (c.email.startsWith('teste@')) {
        await dao.deletar(c);
        FuncoesUtil.removerFoto(c.foto_admin);
      }
    }
  });

  test('novoCliente cria cliente real no banco', async () => {
    const dados = {
      nome: 'Teste Integração',
      email: `teste@integ-${Date.now()}.com`,
      senha: 'senha123',
      idade: 30,
      sexo: 'M',
      peso: 70,
      foto: 'foto.jpg'
    };

    const cliente = await service.novoCliente(dados);

    expect(cliente).toBeDefined();
    expect(cliente.codigo).toBeGreaterThan(0);

    const clienteDoBanco = await service.buscarPorEmail(cliente.email);
    expect(clienteDoBanco.email).toBe(cliente.email);
  });

  test('autenticar com cliente real', async () => {
    const dados = {
      nome: 'Teste Auth',
      email: `teste@auth-${Date.now()}.com`,
      senha: 'senha123',
      idade: 25,
      sexo: 'F',
      peso: 60,
      foto: ''
    };

    await service.novoCliente(dados);

    const clienteAutenticado = await service.autenticar(dados.email, dados.senha);

    expect(clienteAutenticado).toBeDefined();
    expect(clienteAutenticado.email).toBe(dados.email);
  });

  test('deletarCliente remove cliente', async () => {
    const dados = {
      nome: 'Teste Deletar',
      email: `teste@deletar-${Date.now()}.com`,
      senha: 'senha123',
      idade: 40,
      sexo: 'M',
      peso: 80,
      foto: ''
    };

    const cliente = await service.novoCliente(dados);

    const resultado = await service.deletarCliente(cliente.codigo);

    expect(resultado).toBe(true);

    const busca = await service.buscarPorEmail(cliente.email);
    expect(busca).toBeUndefined(); // ou null dependendo do retorno
  });

  test('atualizarCliente altera dados no banco', async () => {
    const dados = {
      nome: 'Teste Atualizar',
      email: `teste@atualizar-${Date.now()}.com`,
      senha: 'senha123',
      idade: 28,
      sexo: 'F',
      peso: 65,
      foto: ''
    };

    const cliente = await service.novoCliente(dados);

    const novosDados = {
      nome: 'Nome Atualizado',
      email: cliente.email,
      senha: cliente.senha,
      idade: 29,
      sexo: cliente.sexo,
      peso: 66,
      foto: ''
    };

    const atualizado = await service.atualizarCliente(novosDados, cliente.codigo);

    expect(atualizado).toBe(true);

    const clienteAtualizado = await service.buscarPorEmail(cliente.email);

    expect(clienteAtualizado.nome).toBe('Nome Atualizado');
    expect(clienteAtualizado.idade).toBe(29);
  });
});
