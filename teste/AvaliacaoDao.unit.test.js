const { AvaliacaoDao } = require('../dao/AvaliacaoDao');
const { AvaliacaoModel } = require('../model/AvaliacaoModel');
const { conectarBD } = require('../database');

jest.mock('../database', () => ({
  conectarBD: jest.fn()
}));

describe('AvaliacaoDao', () => {
  let conexaoMock;
  let dao;

  beforeEach(() => {
    conexaoMock = {
      query: jest.fn(),
      end: jest.fn()
    };
    conectarBD.mockResolvedValue(conexaoMock);
    dao = new AvaliacaoDao();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('inserirOuAtualizar', () => {
    test('deve inserir ou atualizar avaliação e retornar resultado', async () => {
      const mockResult = [{ affectedRows: 1 }];
      conexaoMock.query.mockResolvedValueOnce(mockResult);

      const model = new AvaliacaoModel({ cliente: 1, treino: 2, nota: 5 });
      const result = await dao.inserirOuAtualizar(model);

      expect(conectarBD).toHaveBeenCalled();
      expect(conexaoMock.query).toHaveBeenCalledWith(
        'insert into avaliacao (cliente, treino, nota) values (?, ?, ?) on duplicate key update nota = ?',
        [1, 2, 5, 5]
      );
      expect(conexaoMock.end).toHaveBeenCalled();
      expect(result).toBe(mockResult[0]);
    });
  });

  describe('buscarPorTreino', () => {
    test('deve retornar lista de AvaliacaoModel para treino informado', async () => {
      const rows = [
        { cliente: 1, treino: 2, nota: 4 },
        { cliente: 2, treino: 2, nota: 5 }
      ];
      conexaoMock.query.mockResolvedValueOnce([rows]);

      const result = await dao.buscarPorTreino(2);

      expect(conexaoMock.query).toHaveBeenCalledWith(
        'select cliente, treino, nota from avaliacao where treino = ?',
        [2]
      );
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(AvaliacaoModel);
    });
  });

  describe('buscarPorClienteETreino', () => {
    test('deve retornar AvaliacaoModel quando encontrar dados', async () => {
      const row = { cliente: 1, treino: 2, nota: 5 };
      conexaoMock.query.mockResolvedValueOnce([[row]]);

      const result = await dao.buscarPorClienteETreino(1, 2);

      expect(conexaoMock.query).toHaveBeenCalledWith(
        'select cliente, treino, nota from avaliacao where cliente = ? and treino = ?',
        [1, 2]
      );
      expect(result).toBeInstanceOf(AvaliacaoModel);
      expect(result.cliente).toBe(1);
    });

    test('deve retornar null se nenhum dado for encontrado', async () => {
      conexaoMock.query.mockResolvedValueOnce([[]]);

      const result = await dao.buscarPorClienteETreino(999, 999);
      expect(result).toBeNull();
    });
  });

  describe('calcularMediaPorTreino', () => {
    test('deve retornar média das avaliações do treino', async () => {
      conexaoMock.query.mockResolvedValueOnce([[{ media: 4.5 }]]);

      const result = await dao.calcularMediaPorTreino(3);

      expect(conexaoMock.query).toHaveBeenCalledWith(
        'select avg(nota) as media from avaliacao where treino = ?',
        [3]
      );
      expect(result).toBe(4.5);
    });
  });
});
