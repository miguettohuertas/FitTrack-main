const { AvaliacaoDao } = require('../dao/AvaliacaoDao');
const { AvaliacaoModel } = require('../model/AvaliacaoModel');
const { conectarBD } = require('../database');

describe('AvaliacaoDao - Integração com banco de dados', () => {
  let dao;
  let conexao;

  const treinoId = 1000;
  const cliente1 = 2001;
  const cliente2 = 2002;

  beforeAll(async () => {
    dao = new AvaliacaoDao();
    conexao = await conectarBD();

    // Limpa dados antigos
    await conexao.query('DELETE FROM avaliacao WHERE treino = ?', [treinoId]);
  });

  afterAll(async () => {
    // Limpeza após testes
    await conexao.query('DELETE FROM avaliacao WHERE treino = ?', [treinoId]);
    await conexao.end();
  });

  test('inserirOuAtualizar deve inserir nova avaliação', async () => {
    const avaliacao = new AvaliacaoModel({ cliente: cliente1, treino: treinoId, nota: 4.5 });
    const resultado = await dao.inserirOuAtualizar(avaliacao);

    expect(resultado.affectedRows).toBeGreaterThan(0);
  });

  test('inserirOuAtualizar deve atualizar se já existir', async () => {
    const novaNota = 3.0;
    const avaliacao = new AvaliacaoModel({ cliente: cliente1, treino: treinoId, nota: novaNota });

    const resultado = await dao.inserirOuAtualizar(avaliacao);
    expect(resultado.affectedRows).toBeGreaterThan(0);

    const confirmacao = await dao.buscarPorClienteETreino(cliente1, treinoId);
    expect(confirmacao.nota).toBe(novaNota);
  });

  test('buscarPorClienteETreino deve retornar avaliação existente', async () => {
    const resultado = await dao.buscarPorClienteETreino(cliente1, treinoId);
    expect(resultado).toBeInstanceOf(AvaliacaoModel);
    expect(resultado.cliente).toBe(cliente1);
  });

  test('buscarPorClienteETreino deve retornar null para dados inexistentes', async () => {
    const resultado = await dao.buscarPorClienteETreino(9999, 9999);
    expect(resultado).toBeNull();
  });

  test('buscarPorTreino deve retornar lista de avaliações', async () => {
    // insere outra avaliação
    const avaliacao = new AvaliacaoModel({ cliente: cliente2, treino: treinoId, nota: 5.0 });
    await dao.inserirOuAtualizar(avaliacao);

    const resultados = await dao.buscarPorTreino(treinoId);
    expect(Array.isArray(resultados)).toBe(true);
    expect(resultados.length).toBeGreaterThanOrEqual(2);
    expect(resultados[0]).toBeInstanceOf(AvaliacaoModel);
  });

  test('calcularMediaPorTreino deve retornar média correta', async () => {
    const media = await dao.calcularMediaPorTreino(treinoId);
    expect(typeof media).toBe('number');
    expect(media).toBeGreaterThan(0);
  });
});
