const { CategoriaService } = require('../service/CategoriaService');
const { CategoriaDao } = require('../dao/CategoriaDao');
const { CategoriaModel } = require('../model/CategoriaModel');

jest.mock('../dao/CategoriaDao');
jest.mock('../model/CategoriaModel');

describe('CategoriaService - Testes Unitários', () => {
  let service;
  let dao;

  beforeEach(() => {
    dao = new CategoriaDao();
    service = new CategoriaService();
    jest.clearAllMocks();
  });

  describe('listarCategorias', () => {
    it('deve retornar lista de categorias', async () => {
      const fakeCategorias = [{ codigo: 1, titulo: 'Categoria 1' }];
      dao.listarCategorias.mockResolvedValue(fakeCategorias);

      const categorias = await service.listarCategorias();

      expect(dao.listarCategorias).toHaveBeenCalled();
      expect(categorias).toEqual(fakeCategorias);
    });
  });

  describe('criarCategoria', () => {
    it('deve criar categoria com título válido', async () => {
      const titulo = 'Nova Categoria';
      dao.listarCategorias.mockResolvedValue([]);
      dao.inserirCategoria.mockResolvedValue(10);
      const categoriaMock = { titulo };

      CategoriaModel.mockImplementation((args) => ({
        ...args,
        codigo: null
      }));

      const categoria = await service.criarCategoria(titulo);

      expect(dao.listarCategorias).toHaveBeenCalled();
      expect(dao.inserirCategoria).toHaveBeenCalled();
      expect(categoria.titulo).toBe(titulo);
      expect(categoria.codigo).toBe(10);
    });

    it('deve lançar erro se título for vazio', async () => {
      await expect(service.criarCategoria('')).rejects.toThrow('Título da categoria não pode ser vazio');
      await expect(service.criarCategoria('   ')).rejects.toThrow('Título da categoria não pode ser vazio');
    });

    it('deve lançar erro se categoria já existir', async () => {
      const titulo = 'Existente';
      dao.listarCategorias.mockResolvedValue([{ titulo: 'existente' }]); // case insensitive

      await expect(service.criarCategoria(titulo)).rejects.toThrow('Já existe uma categoria com esse nome.');
    });
  });

  describe('editarCategoria', () => {
    it('deve editar categoria com título válido e código', async () => {
      const novoTitulo = 'Categoria Editada';
      const codigo = 1;
      dao.buscaTodasCategorias.mockResolvedValue([{ codigo: 1, titulo: 'Categoria Antiga' }]);
      dao.editarCategoria.mockResolvedValue(true);

      const resultado = await service.editarCategoria(novoTitulo, codigo);

      expect(dao.buscaTodasCategorias).toHaveBeenCalled();
      expect(dao.editarCategoria).toHaveBeenCalledWith(novoTitulo, codigo);
      expect(resultado).toBe(true);
    });

    it('deve lançar erro se novo título for vazio', async () => {
      await expect(service.editarCategoria('', 1)).rejects.toThrow('Título da categoria não pode ser vazio');
      await expect(service.editarCategoria('   ', 1)).rejects.toThrow('Título da categoria não pode ser vazio');
    });

    it('deve lançar erro se título já existir para outro código', async () => {
      const novoTitulo = 'Categoria Existente';
      const codigo = 2;
      dao.buscaTodasCategorias.mockResolvedValue([
        { codigo: 1, titulo: 'Categoria Existente' },
        { codigo: 2, titulo: 'Outra Categoria' }
      ]);

      await expect(service.editarCategoria(novoTitulo, codigo)).rejects.toThrow('Já existe uma categoria com esse nome.');
    });
  });
});
