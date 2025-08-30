jest.mock('../database', () => ({
  conectarBD: jest.fn(),
}));

const { conectarBD } = require('../database');
const { TreinoDao } = require('../dao/TreinoDao');
const { TreinoModel } = require('../model/TreinoModel');

describe('TreinoDao - testes unitários', () => {
  let dao;
  let mockConexao;

  beforeEach(() => {
    dao = new TreinoDao();

    mockConexao = {
      query: jest.fn(),
      end: jest.fn(),
    };

    conectarBD.mockResolvedValue(mockConexao);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('buscarPorId', () => {
    test('deve retornar sucesso e rows quando encontrar dados', async () => {
      const rows = [{ cod_tre: 1, titulo_tre: 'Teste' }];
      mockConexao.query.mockResolvedValue([rows]);

      const result = await dao.buscarPorId(1);

      expect(mockConexao.query).toHaveBeenCalledWith('select * from listar_dados_treinos where cod_tre = ?;', [1]);
      expect(mockConexao.end).toHaveBeenCalled();
      expect(result).toEqual({ sucesso: true, rows });
    });

    test('deve retornar falso quando não encontrar dados', async () => {
      mockConexao.query.mockResolvedValue([[]]);

      const result = await dao.buscarPorId(999);

      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toBe('Nenhum dado encontrado');
    });

    test('deve retornar erro em caso de exceção', async () => {
      mockConexao.query.mockRejectedValue(new Error('Erro de banco'));

      const result = await dao.buscarPorId(1);

      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toMatch(/Houve algum erro/);
      expect(result.erro).toBeInstanceOf(Error);
    });
  });

  describe('inserir', () => {
    test('deve retornar sucesso com novoId quando inserir', async () => {
      const treino = new TreinoModel();
      treino.toInsertArray = jest.fn().mockReturnValue(['desc', 'titulo']);

      mockConexao.query.mockResolvedValue([{ insertId: 10 }]);

      const result = await dao.inserir(treino);

      expect(mockConexao.query).toHaveBeenCalledWith(
        'INSERT INTO treino(descricao_tre, titulo_tre) values (?,?);',
        ['desc', 'titulo']
      );
      expect(result).toEqual({ sucesso: true, novoId: 10 });
    });

    test('deve retornar falso quando insertId não existe', async () => {
      const treino = new TreinoModel();
      treino.toInsertArray = jest.fn().mockReturnValue(['desc', 'titulo']);

      // Atenção: seu código tem bug: "insertid" em minúsculo (corrigido no teste assumindo insertId)
      mockConexao.query.mockResolvedValue([{}]); // sem insertId

      const result = await dao.inserir(treino);

      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toMatch(/Não foi possível inserir/);
    });

    test('deve retornar erro ao falhar na query', async () => {
      const treino = new TreinoModel();
      treino.toInsertArray = jest.fn().mockReturnValue(['desc', 'titulo']);
      mockConexao.query.mockRejectedValue(new Error('Falha na query'));

      const result = await dao.inserir(treino);

      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toMatch(/Houve algum erro/);
      expect(result.erro).toBeInstanceOf(Error);
    });
  });

  describe('atualizar', () => {
    test('deve retornar sucesso quando affectedRows > 0', async () => {
      const treino = new TreinoModel();
      treino.toUpdateArray = jest.fn().mockReturnValue(['desc', 'titulo', 1]);

      mockConexao.query.mockResolvedValue([{ affectedRows: 1 }]);

      const result = await dao.atualizar(treino);

      expect(result).toEqual({ sucesso: true });
    });

    test('deve retornar falso quando nenhuma linha afetada', async () => {
      const treino = new TreinoModel();
      treino.toUpdateArray = jest.fn().mockReturnValue(['desc', 'titulo', 1]);

      mockConexao.query.mockResolvedValue([{ affectedRows: 0 }]);

      const result = await dao.atualizar(treino);

      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toMatch(/Nenhuma linha foi alterada/);
    });

    test('deve retornar erro em caso de exceção', async () => {
      const treino = new TreinoModel();
      treino.toUpdateArray = jest.fn().mockReturnValue(['desc', 'titulo', 1]);

      mockConexao.query.mockRejectedValue(new Error('Erro'));

      const result = await dao.atualizar(treino);

      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toMatch(/Erro ao atualizar/);
      expect(result.erro).toBeInstanceOf(Error);
    });
  });

  describe('deletar', () => {
    test('deve retornar sucesso quando affectedRows > 0', async () => {
      const treino = new TreinoModel();
      treino.codigo = 1;

      mockConexao.query.mockResolvedValue([{ affectedRows: 1 }]);

      const result = await dao.deletar(treino);

      expect(result).toEqual({ sucesso: true });
    });

    test('deve retornar falso quando nenhuma linha deletada', async () => {
      const treino = new TreinoModel();
      treino.codigo = 1;

      mockConexao.query.mockResolvedValue([{ affectedRows: 0 }]);

      const result = await dao.deletar(treino);

      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toMatch(/Nenhuma linha foi deletada/);
    });

    test('deve retornar erro em caso de exceção', async () => {
      const treino = new TreinoModel();
      treino.codigo = 1;

      mockConexao.query.mockRejectedValue(new Error('Erro'));

      const result = await dao.deletar(treino);

      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toMatch(/Falha ao deletar/);
      expect(result.erro).toBeInstanceOf(Error);
    });
  });

  describe('vincularExercicios', () => {
    test('deve retornar sucesso e novosIds quando affectedRows > 0', async () => {
      const treino = new TreinoModel();
      treino.codigo = 1;
      treino.exercicios = [
        { codigo: 11 },
        { codigo: 22 },
      ];
      treino.toInsertTreinoExercicioArray = jest.fn().mockReturnValue([[1,11],[1,22]]);

      mockConexao.query.mockResolvedValue([{ affectedRows: 2 }]);

      const result = await dao.vincularExercicios(treino);

      expect(result.sucesso).toBe(true);
      expect(result.novosIds).toEqual([
        { treino: 1, exercicio: 11 },
        { treino: 1, exercicio: 22 },
      ]);
    });

    test('deve retornar falso quando affectedRows = 0', async () => {
      const treino = new TreinoModel();
      treino.codigo = 1;
      treino.exercicios = [{ codigo: 11 }];
      treino.toInsertTreinoExercicioArray = jest.fn().mockReturnValue([[1,11]]);

      mockConexao.query.mockResolvedValue([{ affectedRows: 0 }]);

      const result = await dao.vincularExercicios(treino);

      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toMatch(/Falha ao inserir exercicios/);
    });

    test('deve retornar erro em exceção', async () => {
      const treino = new TreinoModel();
      treino.codigo = 1;
      treino.exercicios = [{ codigo: 11 }];
      treino.toInsertTreinoExercicioArray = jest.fn().mockReturnValue([[1,11]]);

      mockConexao.query.mockRejectedValue(new Error('Erro inesperado'));

      const result = await dao.vincularExercicios(treino);

      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toMatch(/Erro inesperado/);
      expect(result.erro).toBeInstanceOf(Error);
    });
  });

  describe('removerVinculoExercicio', () => {
    test('deve retornar sucesso quando affectedRows > 0', async () => {
      const treino = new TreinoModel();
      treino.codigo = 1;
      treino.arrayCodigoExercicios = jest.fn().mockReturnValue([11,22]);

      mockConexao.query.mockResolvedValue([{ affectedRows: 2 }]);

      const result = await dao.removerVinculoExercicio(treino);

      expect(result.sucesso).toBe(true);
    });

    test('deve retornar falso quando nenhuma linha deletada', async () => {
      const treino = new TreinoModel();
      treino.codigo = 1;
      treino.arrayCodigoExercicios = jest.fn().mockReturnValue([11]);

      mockConexao.query.mockResolvedValue([{ affectedRows: 0 }]);

      const result = await dao.removerVinculoExercicio(treino);

      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toMatch(/Nenhuma linha deletada/);
    });

    test('deve retornar erro em caso de exceção', async () => {
      const treino = new TreinoModel();
      treino.codigo = 1;
      treino.arrayCodigoExercicios = jest.fn().mockReturnValue([11]);

      mockConexao.query.mockRejectedValue(new Error('Erro inesperado'));

      const result = await dao.removerVinculoExercicio(treino);

      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toMatch(/Erro inesperado/);
      expect(result.erro).toBeInstanceOf(Error);
    });
  });
});
