const { AdministradorService } = require('../service/AdministradorService');
const { AdministradorDao } = require('../dao/AdministradorDao');

describe('AdministradorService - Integração', () => {
  let service;
  let dao;

  beforeAll(() => {
    service = new AdministradorService();
    dao = new AdministradorDao();
  });

  afterEach(async () => {
    const admins = await dao.listarTodos();
    for (const a of admins) {
      if (a.email_admin && a.email_admin.startsWith('test_admin@')) {
        await dao.deletar(a.cod_admin);
      }
    }
  });

  test('criarNovoAdministrador - sucesso', async () => {
    const dados = {
      nome: 'Admin Teste',
      email: 'test_admin@teste.com',
      senha: '123456',
      foto: 'teste.jpg'
    };

    const resultado = await service.criarNovoAdministrador(dados);
    expect(resultado).toBeDefined();
    expect(resultado.email).toBe(dados.email);
  });

  test('autenticar - administrador existente com senha correta', async () => {
    const dados = {
      nome: 'Admin Autenticado',
      email: 'test_admin@teste.com',
      senha: '123456',
      foto: 'foto.jpg'
    };

    await service.criarNovoAdministrador(dados);

    const autenticado = await service.autenticar(dados.email, dados.senha);
    expect(autenticado).toBeDefined();
    expect(autenticado.email).toBe(dados.email);
  });

  test('deletarAdministrador - remove admin existente', async () => {
    const dados = {
      nome: 'Admin Delete',
      email: 'test_admin@delete.com',
      senha: '123456',
      foto: 'delete.jpg'
    };

    const admin = await service.criarNovoAdministrador(dados);

    const resultado = await service.deletarAdministrador(admin.codigo);
    expect(resultado).toBe(true);
  });

  test('consultarTodos - deve retornar array', async () => {
    const lista = await service.consultarTodos();
    expect(Array.isArray(lista)).toBe(true);
  });
});
