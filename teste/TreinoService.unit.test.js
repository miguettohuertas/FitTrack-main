// tests/unit/treinoService.unit.test.js
const { TreinoService } = require('../service/TreinoService');
const { TreinoDao } = require('../dao/TreinoDao');
const { ComentarioService } = require('../service/ComentarioService');
const { TreinoModel } = require('../model/TreinoModel');
const { ExercicioModel } = require('../model/ExercicioModel');

jest.mock('../dao/TreinoDao');
jest.mock('../service/ComentarioService');

describe('TreinoService - Unitários extendidos', () => {
  let service;
  let mockDao;
  let mockComentarioService;

  beforeEach(() => {
    TreinoDao.mockClear();
    ComentarioService.mockClear();

    service = new TreinoService();
    mockDao = new TreinoDao();
    mockComentarioService = new ComentarioService();

    service.novoTreino = jest.fn().mockImplementation((dados) => new TreinoModel(dados.codigo, dados.descricao, dados.titulo, (dados.exercicios || []).map(e => new ExercicioModel(e.codigo, e.titulo, e.descricao, e.tempoEstimado, e.video))));
  });

  test('criarTreino lança erro se dados inválidos', async () => {
    const dadosInvalidos = { descricao: '', titulo: '', exercicios: [] };
    await expect(service.criarTreino(dadosInvalidos)).rejects.toThrow("Treino deve ter pelo meno um exercício!");
  });

  test('vincularExercicios lança erro se resultado DAO é falha', async () => {
    mockDao.vincularExercicios.mockResolvedValue({ sucesso: false, mensagem: 'Erro qualquer', erro: 'Erro detalhe' });
    const treino = new TreinoModel(1, 'desc', 'tit', [new ExercicioModel(1, 'ex', 'desc', 10, '')]);
    await expect(service.vincularExercicios(treino)).rejects.toThrow(/Falha inesperada ao vincular/);
  });

  test('adicionarExercicios chama vincular e valida dados', async () => {
    const dados = { descricao: 'desc', titulo: 'tit', exercicios: [{ codigo: 1 }] };
    const id = 10;
    mockDao.vincularExercicios.mockResolvedValue({ sucesso: true });
    service.novoTreino = jest.fn().mockReturnValue(new TreinoModel(id, dados.descricao, dados.titulo, []));

    await expect(service.adicionarExercicios(dados, id)).resolves.not.toThrow();
  });

  test('removerExercicios chama dao remover e valida resultado', async () => {
    const dados = { descricao: 'desc', titulo: 'tit', exercicios: [{ codigo: 1 }] };
    const id = 5;
    mockDao.removerVinculoExercicio.mockResolvedValue({ sucesso: true });
    service.novoTreino = jest.fn().mockReturnValue(new TreinoModel(id, dados.descricao, dados.titulo, []));

    await expect(service.removerExercicios(dados, id)).resolves.not.toThrow();
  });

  test('buscarPorId lança erro se dao retornar falha', async () => {
    mockDao.buscarPorId.mockResolvedValue({ sucesso: false, mensagem: 'Erro de busca' });
    await expect(service.buscarPorId(1)).rejects.toThrow(/Falha inesperada/);
  });

  test('buscarPorId busca nota e comentarios, e fecha conexao', async () => {
    const id = 1;
    const treinoRow = [{ cod_tre: id, descricao_tre: 'desc', titulo_tre: 'tit', capa_tre: 'img', exercicios: [] }];
    mockDao.buscarPorId.mockResolvedValue({ rows: treinoRow, sucesso: true });
    mockDao.buscarNota.mockResolvedValue({ rows: [{ treino: id, nota: 5 }], sucesso: true });
    mockDao.conexao = Promise.resolve({ end: jest.fn() });
    mockComentarioService.listarComentariosPorTreino.mockResolvedValue(['comentario']);

    const treino = await service.buscarPorId(id);

    expect(treino.codigo).toBe(id);
    expect(treino.notaAvaliacao).toEqual([{ treino: id, nota: 5 }]);
    expect(treino.comentarios).toEqual(['comentario']);
    expect((await mockDao.conexao).end).toHaveBeenCalled();
  });

  test('listarTreinos associa nota ao treino', async () => {
    const treinosMock = [{ cod_tre: 1, descricao_tre: 'desc', titulo_tre: 'tit', capa_tre: 'img', exercicios: [] }];
    const notasMock = [{ treino: 1, nota: 9 }];
    mockDao.listarTodos.mockResolvedValue({ rows: treinosMock, sucesso: true });
    mockDao.buscarNotas.mockResolvedValue({ rows: notasMock, sucesso: true });
    mockDao.conexao = Promise.resolve({ end: jest.fn() });

    const treinos = await service.listarTreinos();

    expect(treinos[0]).toHaveProperty('avaliacao', 9);
    expect((await mockDao.conexao).end).toHaveBeenCalled();
  });

  test('validarDadosCadastro, validarDadosVinculoExercicios e validarDadosParaAtualizar lançam erro para dados inválidos', () => {
    expect(() => service.validarDadosCadastro({ descricao: '', titulo: '', exercicios: [] })).toThrow();
    expect(() => service.validarDadosVinculoExercicios({ descricao: '', titulo: '', exercicios: [] }, 0)).toThrow();
    expect(() => service.validarDadosParaAtualizar({ descricao: '', titulo: '' }, 0)).toThrow();
  });

  test('idValido retorna false para valores inválidos', () => {
    expect(service.idValido(null)).toBe(false);
    expect(service.idValido('')).toBe(false);
    expect(service.idValido(0)).toBe(false);
    expect(service.idValido(1)).toBe(true);
  });

  test('retornouSucesso e possuiErro funcionam corretamente', () => {
    expect(service.retornouSucesso({ sucesso: true })).toBe(true);
    expect(service.retornouSucesso({ sucesso: false })).toBe(false);
    expect(service.possuiErro({ erro: 'erro' })).toBe(true);
    expect(service.possuiErro({})).toBe(false);
  });

  test('listaExercicioValido retorna false para lista vazia', () => {
    expect(service.listaExercicioValido([])).toBe(false);
    expect(service.listaExercicioValido([{}])).toBe(true);
  });

  test('tituloValido e descricaoValida validam strings corretamente', () => {
    expect(service.tituloValido('')).toBe(false);
    expect(service.tituloValido('titulo')).toBe(true);
    expect(service.descricaoValida('')).toBe(false);
    expect(service.descricaoValida('desc')).toBe(true);
  });

  
  test('adicionarExercicios lança erro com id inválido', async () => {
    await expect(service.adicionarExercicios({
      descricao: 'desc',
      titulo: 'titulo',
      exercicios: [{ codigo: 1 }]
    }, 0)).rejects.toThrow('id inválido!');
  });

  test('removerExercicios lança erro se lista de exercicios vazia', async () => {
    await expect(service.removerExercicios({
      descricao: 'desc',
      titulo: 'titulo',
      exercicios: []
    }, 1)).rejects.toThrow('Treino deve ter pelo meno um exercício!');
  });

  test('validaResultadoDao não lança erro se resultado sucesso true', () => {
    expect(() => service.validaResultadoDao({ sucesso: true })).not.toThrow();
  });

  test('toArrayOfExercicioModel com lista vazia retorna lista vazia', () => {
    expect(service.toArrayOfExercicioModel([])).toEqual([]);
  });

  test('idValido retorna false para valores inválidos', () => {
    expect(service.idValido(0)).toBe(false);
    expect(service.idValido(null)).toBe(false);
    expect(service.idValido(undefined)).toBe(false);
    expect(service.idValido('')).toBe(false);
  });

  test('buscarPorId lida com dao rejeitando', async () => {
    const daoMock = {
      buscarPorId: jest.fn().mockRejectedValue(new Error('erro dao')),
    };
    TreinoDao.mockImplementation(() => daoMock);

    await expect(service.buscarPorId(1)).rejects.toThrow('erro dao');
  });
});
