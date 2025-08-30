const { conectarBD } = require('../database');
const { CategoriaModel } = require('../model/CategoriaModel');
const { CategoriaDao } = require('../dao/CategoriaDao');

jest.mock('../database');

const categoriasFalsas = [
    {cod_cat: 1, titulo_cat: 'Força'}, 
    {cod_cat: 2, titulo_cat: 'Estamina'}];


const dao = new CategoriaDao();

describe('CT-007', () => {
    describe('inserirCategoria', () => {
        test('Deve retornar novo id', async () => {
            const conexaoMock = {
                query: jest.fn().mockResolvedValue([{insertId: categoriasFalsas.length + 1}, undefined])
            }

            conectarBD.mockResolvedValue(conexaoMock);

            const resultado = await dao.inserirCategoria(new CategoriaModel('Biceps'));
            
            expect(resultado).toBeTruthy();
            expect(resultado).toBeGreaterThan(categoriasFalsas.length);
            expect(resultado).toEqual(3);
        })
    });
});

describe('CT-019', () => {
    conectarBD.mockImplementation( async (sql, [titulo]) => {
        const dadosMock = [
            {cod_cat: 1, titulo_cat: 'Pernas'},
            {cod_cat: 2, titulo_cat: 'Força'}
        ];

        if(!dadosMock.some(cat => cat.titulo_cat === titulo)){
            return [[], undefined];
        }

        return [[dadosMock.find(cat => cat.titulo_cat === titulo)], undefined];
    });                   

    describe('listarCategorias', () => {
        test('Deve retornar array de CategoriaModel', async () => {
            const result = await dao.listarCategorias();
    
            expect(result).toBeInstanceOf(Array);
            expect(result[0]).toBeInstanceOf(CategoriaModel);
        });

    });

    describe('buscarPorTitulo', () => {
        test('Deve retornar um objeto CategoriaModel', async () => {
            const resultado = await dao.buscarPorTitulo('Força');
    
            expect(resultado).toBeInstanceOf(CategoriaModel);
            expect(resultado).toEqual(new CategoriaModel(2, "Força"));    
        });

        test('Deve retornar null', async () => {
            const resultado = await dao.buscarPorTitulo('Braços');
    
            expect(resultado).toBeFalsy();
            expect(resultado).toBeNull();
        });
    })
});


describe('CT-005', () => {
    const conexaoMock = {
        query: jest.fn().mockResolvedValue(async (sql, [titulo, codigo]) => {
            const select = 'select';
            
            if(sql.toLowerCase().includes(select.toLowerCase())){
                return [categoriasFalsas];
            }

            let retorno = {
                affectedRows: 1
            };

            if(!categorias.some(cat => cat.codigo === codigo)){
                retorno.affectedRows = 0;
            }

            return [retorno];
        })
    };

    conectarBD.mockResolvedValue(conexaoMock);

    describe('editarCategoria', () => {
        test('Deve retornar true', async () => {
            const resultado = await dao.editarCategoria('Pernas', 2);
            expect(resultado).toEqual(true);
        });

        test('Deve retornar false', async () => {
            const resultado = await dao.editarCategoria('Costas', 7);
            expect(resultado).toEqual(false);
        });
    });    
});

