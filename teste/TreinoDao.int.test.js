const { TreinoDao } = require('../dao/TreinoDao');
const { TreinoModel } = require('../model/TreinoModel');

describe('TreinoDao - Testes de Integração', () => {
  let dao;

  beforeAll(() => {
    dao = new TreinoDao();
  });

  test('buscarPorId retorna treino se existir', async () => {
    // Use um ID real existente no seu banco
    const idExistente = 1;

    const resultado = await dao.buscarPorId(idExistente);
    expect(resultado.sucesso).toBe(true);
    expect(Array.isArray(resultado.rows)).toBe(true);
    expect(resultado.rows.length).toBeGreaterThan(0);
  });

  test('buscarPorId retorna falso para id inexistente', async () => {
    const idInexistente = 9999999; // ID que não existe
    const resultado = await dao.buscarPorId(idInexistente);
    expect(resultado.sucesso).toBe(false);
  });

  test('inserir adiciona novo treino e retorna novoId', async () => {
    const treino = new TreinoModel(null, 'Descricao Teste', 'Titulo Teste');

    const resultado = await dao.inserir(treino);

    expect(resultado.sucesso).toBe(true);
    expect(typeof resultado.novoId).toBe('number');
    expect(resultado.novoId).toBeGreaterThan(0);

    // Limpeza do dado inserido para não poluir o banco
    await dao.deletar(new TreinoModel(resultado.novoId));
  });

  test('atualizar modifica treino existente', async () => {
    const treino = new TreinoModel(null, 'Descricao para atualizar', 'Titulo para atualizar');

    // Inserir treino para depois atualizar
    const insercao = await dao.inserir(treino);

    treino.codigo = insercao.novoId;
    treino.descricao = 'Descricao atualizada';
    treino.titulo = 'Titulo atualizado';

    const resultado = await dao.atualizar(treino);

    expect(resultado.sucesso).toBe(true);

    // Limpeza
    await dao.deletar(treino);
  });

  test('deletar remove treino existente', async () => {
    const treino = new TreinoModel(null, 'Descricao para deletar', 'Titulo para deletar');

    const insercao = await dao.inserir(treino);

    treino.codigo = insercao.novoId;

    const resultado = await dao.deletar(treino);

    expect(resultado.sucesso).toBe(true);
  });

  test('vincularExercicios insere vínculos', async () => {
    // Cria treino e exercicios fictícios para teste
    const treino = new TreinoModel(null, 'Treino Vincular', 'Treino Vincular');
    const insercao = await dao.inserir(treino);
    treino.codigo = insercao.novoId;

    // Coloque IDs de exercicios válidos no seu BD
    treino.exercicios = [{ codigo: 1 }, { codigo: 2 }];

    const resultado = await dao.vincularExercicios(treino);

    expect(resultado.sucesso).toBe(true);
    expect(Array.isArray(resultado.novosIds)).toBe(true);
    expect(resultado.novosIds.length).toBeGreaterThan(0);

    // Limpeza: remover vínculo e treino
    await dao.removerVinculoExercicio(treino);
    await dao.deletar(treino);
  });

  test('removerVinculoExercicio remove vínculos', async () => {
    // Cria treino e vincula exercicios
    const treino = new TreinoModel(null, 'Treino Remover', 'Treino Remover');
    const insercao = await dao.inserir(treino);
    treino.codigo = insercao.novoId;
    treino.exercicios = [{ codigo: 1 }];

    await dao.vincularExercicios(treino);

    const resultado = await dao.removerVinculoExercicio(treino);

    expect(resultado.sucesso).toBe(true);

    // Limpeza
    await dao.deletar(treino);
  });
});
