const { TreinoService } = require('../service/TreinoService');

describe('TreinoService - Integração ampliada', () => {
  let service;

  beforeAll(() => {
    service = new TreinoService();
  });

  test('criarTreino, buscarPorId, atualizarTreino e listarTreinos integrados', async () => {
    const dadosParaCriar = {
      descricao: 'Treino integração teste',
      titulo: 'Treino teste',
      exercicios: [{ codigo: 1, titulo: 'Exercicio 1', descricao: 'desc', tempoEstimado: 10, video: '' }]
    };

    // Criar treino
    const treinoCriado = await service.criarTreino(dadosParaCriar);
    expect(treinoCriado.codigo).toBeDefined();
    expect(treinoCriado.titulo).toBe(dadosParaCriar.titulo);

    // Buscar pelo id
    const treinoBuscado = await service.buscarPorId(treinoCriado.codigo);
    expect(treinoBuscado.codigo).toBe(treinoCriado.codigo);

    // Atualizar treino
    const dadosAtualizados = {
      descricao: 'Treino atualizado',
      titulo: 'Treino atualizado',
      exercicios: dadosParaCriar.exercicios
    };
    await service.atualizarTreino(dadosAtualizados, treinoCriado.codigo);

    // Buscar atualizado
    const treinoAtualizado = await service.buscarPorId(treinoCriado.codigo);
    expect(treinoAtualizado.descricao).toBe('Treino atualizado');

    // Listar todos
    const todosTreinos = await service.listarTreinos();
    expect(Array.isArray(todosTreinos)).toBe(true);
    expect(todosTreinos.find(t => t.codigo === treinoCriado.codigo)).toBeDefined();
  });

  test('adicionarExercicios e removerExercicios funcionam corretamente', async () => {
    const treinoDados = {
      descricao: 'Teste para adicionar e remover',
      titulo: 'Adicionar remover teste',
      exercicios: [{ codigo: 1, titulo: 'Exercicio 1', descricao: 'desc', tempoEstimado: 10, video: '' }]
    };

    const treinoCriado = await service.criarTreino(treinoDados);

    // Adicionar exercicios (pode ser o mesmo exercicio por simplicidade)
    await expect(service.adicionarExercicios(treinoDados, treinoCriado.codigo)).resolves.not.toThrow();

    // Remover exercicios
    await expect(service.removerExercicios(treinoDados, treinoCriado.codigo)).resolves.not.toThrow();
  });

  test('buscarPorId lança erro para id inválido ou treino inexistente', async () => {
    await expect(service.buscarPorId(99999999)).rejects.toThrow();
  });

  // --- NOVOS TESTES DE ERRO E VALIDAÇÃO ---

  test('criarTreino lança erro para dados inválidos', async () => {
    // Falta exercicios
    await expect(service.criarTreino({ descricao: 'desc', titulo: 'titulo', exercicios: [] })).rejects.toThrow("Treino deve ter pelo meno um exercício!");

    // Falta titulo
    await expect(service.criarTreino({ descricao: 'desc', titulo: '', exercicios: [{ codigo: 1 }] })).rejects.toThrow("Titulo inválido");

    // Falta descricao
    await expect(service.criarTreino({ descricao: '', titulo: 'titulo', exercicios: [{ codigo: 1 }] })).rejects.toThrow("Descrição inválida");
  });

  test('adicionarExercicios lança erro para id inválido ou dados inválidos', async () => {
    const dadosValidos = {
      descricao: 'desc',
      titulo: 'titulo',
      exercicios: [{ codigo: 1 }]
    };

    await expect(service.adicionarExercicios(dadosValidos, 0)).rejects.toThrow("id inválido!");
    await expect(service.adicionarExercicios({ ...dadosValidos, exercicios: [] }, 1)).rejects.toThrow("Treino deve ter pelo meno um exercício!");
  });

  test('atualizarTreino lança erro para dados inválidos', async () => {
    await expect(service.atualizarTreino({ titulo: '', descricao: 'desc', exercicios: [{ codigo: 1 }] }, 1)).rejects.toThrow("Titulo inválido");
    await expect(service.atualizarTreino({ titulo: 'titulo', descricao: '', exercicios: [{ codigo: 1 }] }, 1)).rejects.toThrow("Descrição inválida");
    await expect(service.atualizarTreino({ titulo: 'titulo', descricao: 'desc', exercicios: [{ codigo: 1 }] }, 0)).rejects.toThrow("id inválido!");
  });

  test('validaResultadoDao lança erro e loga erro', () => {
    const resultado = { sucesso: false, erro: 'Erro teste', mensagem: 'Mensagem erro teste' };
    const spyLog = jest.spyOn(console, 'log').mockImplementation(() => {});

    const serviceLocal = new TreinoService();

    expect(() => serviceLocal.validaResultadoDao(resultado)).toThrow("Falha inesperada ao vincular exercicios ao treino: Mensagem erro teste");
    expect(spyLog).toHaveBeenCalledWith('Erro teste');

    spyLog.mockRestore();
  });

  test('metodos utilitários retornam valores corretos', () => {
    const serviceLocal = new TreinoService();

    expect(serviceLocal.idValido(1)).toBe(true);
    expect(serviceLocal.idValido(0)).toBe(false);
    expect(serviceLocal.idValido('')).toBe(false);
    expect(serviceLocal.idValido(null)).toBe(false);

    expect(serviceLocal.listaExercicioValido([1])).toBe(true);
    expect(serviceLocal.listaExercicioValido([])).toBe(false);

    expect(serviceLocal.tituloValido('titulo')).toBe(true);
    expect(serviceLocal.tituloValido('')).toBe(false);

    expect(serviceLocal.descricaoValida('desc')).toBe(true);
    expect(serviceLocal.descricaoValida('')).toBe(false);

    expect(serviceLocal.retornouSucesso({ sucesso: true })).toBe(true);
    expect(serviceLocal.retornouSucesso({ sucesso: false })).toBe(false);

    expect(serviceLocal.possuiErro({ erro: 'algo' })).toBe(true);
    expect(serviceLocal.possuiErro({ erro: null })).toBe(false);
  });
});
