jest.mock('../database', () => ({
  conectarBD: jest.fn(),
}));

const { conectarBD } = require('../database');
const { ComentarioDao } = require('../dao/ComentarioDao');
const { ComentarioModel } = require('../model/ComentarioModel');

describe('ComentarioDao - Unitário', () => {
  let dao;
  let mockConexao;

  beforeEach(() => {
    dao = new ComentarioDao();

    // simula conexão com .query e .end
    mockConexao = {
      query: jest.fn(),
      end: jest.fn()
    };

    conectarBD.mockResolvedValue(mockConexao);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('inserirComentario', () => {
    test('deve inserir comentário e retornar insertId', async () => {
      const mockInsertId = 123;
      const comentario = new ComentarioModel({
        cliente: 1,
        treino: 10,
        texto: 'Comentário de teste',
        dataHora: new Date()
      });

      mockConexao.query.mockResolvedValueOnce([{ insertId: mockInsertId }]);

      const resultado = await dao.inserirComentario(comentario);

      expect(conectarBD).toHaveBeenCalled();
      expect(mockConexao.query).toHaveBeenCalledWith(
        'insert into comentario (cliente, treino, texto_com, dhcadastro_com) values (?, ?, ?, ?)',
        [comentario.cliente, comentario.treino, comentario.texto, comentario.dataHora]
      );
      expect(mockConexao.end).toHaveBeenCalled();
      expect(resultado).toBe(mockInsertId);
    });
  });

  describe('listarPorTreino', () => {
    test('deve retornar lista de ComentarioModel com dados do banco', async () => {
      const idTreino = 10;
      const rows = [
        {
          codigo: 1,
          cliente: 2,
          treino: 10,
          comentario: 'Muito bom',
          data_hora: '2025-07-04T10:00:00'
        },
        {
          codigo: 2,
          cliente: 3,
          treino: 10,
          comentario: 'Gostei bastante',
          data_hora: '2025-07-04T09:00:00'
        }
      ];

      mockConexao.query.mockResolvedValueOnce([rows]);

      const resultado = await dao.listarPorTreino(idTreino);

      expect(conectarBD).toHaveBeenCalled();
      expect(mockConexao.query).toHaveBeenCalledWith(
        'select * from comentarios where treino = ? order by data_hora desc',
        [idTreino]
      );
      expect(mockConexao.end).toHaveBeenCalled();

      expect(resultado).toHaveLength(2);
      expect(resultado[0]).toBeInstanceOf(ComentarioModel);
      expect(resultado[0].texto).toBe('Muito bom');
    });
  });
});
