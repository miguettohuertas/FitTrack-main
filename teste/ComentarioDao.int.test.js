const { ComentarioDao } = require('../dao/ComentarioDao');
const { ComentarioModel } = require('../model/ComentarioModel');
const { conectarBD } = require('../database');

describe('ComentarioDao - Integração', () => {
  let dao;
  let idComentarioInserido;
  const treinoId = 9999; // use um id de treino fictício ou existente

  beforeAll(() => {
    dao = new ComentarioDao();
  });

  afterAll(async () => {
    // Limpa os dados inseridos no teste
    const conexao = await conectarBD();
    await conexao.query('DELETE FROM comentarios WHERE treino = ?', [treinoId]);
    await conexao.end();
  });

  test('inserirComentario deve inserir no banco e retornar um insertId', async () => {
    const comentario = new ComentarioModel({
      cliente: 1,
      treino: treinoId,
      texto: 'Comentário de integração',
      dataHora: new Date()
    });

    const insertId = await dao.inserirComentario(comentario);
    expect(typeof insertId).toBe('number');
    expect(insertId).toBeGreaterThan(0);

    idComentarioInserido = insertId;
  });

  test('listarPorTreino deve retornar os comentários inseridos', async () => {
    const comentarios = await dao.listarPorTreino(treinoId);

    expect(Array.isArray(comentarios)).toBe(true);
    expect(comentarios.length).toBeGreaterThan(0);

    const comentario = comentarios.find(c => c.codigo === idComentarioInserido);

    expect(comentario).toBeDefined();
    expect(comentario).toBeInstanceOf(ComentarioModel);
    expect(comentario.treino).toBe(treinoId);
  });
});
