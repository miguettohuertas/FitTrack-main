const { CategoriaService } = require('../service/CategoriaService');
const { CategoriaDao } = require('../dao/CategoriaDao');

describe('CategoriaService - Testes de Integração', () => {
  let service;
  let dao;

  beforeAll(() => {
    service = new CategoriaService();
    dao = new CategoriaDao();
  });

  afterEach(async () => {
    // Remova categorias de teste criadas para não poluir o banco
    const categorias = await dao.listarCategorias();
    for (const cat of categorias) {
      if (cat.titulo.startsWith('Teste')) {
        await dao.deletarCategoria(cat.codigo); // Assumindo método que delete categoria
      }
    }
  });

  test('criarCategoria cria nova categoria real', async () => {
    const titulo = `Teste Categoria ${Date.now()}`;
    const categoria = await service.criarCategoria(titulo);

    expect(categoria).toBeDefined();
    expect(categoria.codigo).toBeGreaterThan(0);

    const lista = await service.listarCategorias();
    expect(lista.some(c => c.titulo === titulo)).toBe(true);
  });

  test('editarCategoria altera título da categoria', async () => {
    const tituloOriginal = `Teste Categoria Original ${Date.now()}`;
    const categoria = await service.criarCategoria(tituloOriginal);

    const novoTitulo = `Teste Categoria Editada ${Date.now()}`;
    const sucesso = await service.editarCategoria(novoTitulo, categoria.codigo);

    expect(sucesso).toBe(true);

    const lista = await service.listarCategorias();
    expect(lista.some(c => c.titulo === novoTitulo)).toBe(true);
  });
});
