const { ExercicioService } = require('../service/ExercicioService');
const { ExercicioDao } = require('../dao/ExercicioDao');

describe('ExercicioService - Integração', () => {
    let service;
    let dao;

    beforeAll(() => {
        service = new ExercicioService();
        dao = new ExercicioDao();
    });

    afterEach(async () => {
        const exercicios = await dao.listarExercicios();
        for (const e of exercicios) {
            if (e.titulo.startsWith('TESTE_')) {
                await dao.deletarExercicioPorTitulo(e.titulo); // certifique-se de implementar este método
            }
        }
    });

    test('deve criar exercício novo com sucesso', async () => {
        const dados = {
            titulo: 'TESTE_CRIAR',
            descricao: 'desc',
            tempoEstimado: 20,
            video: null,
            categorias: null
        };

        const usuario = { tipo: 'administrador' };

        const exercicio = await service.criarExercicio(dados, usuario);

        expect(exercicio).toBeDefined();
        expect(exercicio.codigo).toBeGreaterThan(0);
    });


    test('listarExercicios retorna array de exercícios', async () => {
        const lista = await service.listarExercicios();
        expect(Array.isArray(lista)).toBe(true);
    });

    test('não deve criar exercício com título duplicado', async () => {
        const usuario = { tipo: 'administrador' };
        const dados = {
            titulo: 'TESTE_DUPLICADO',
            descricao: 'desc',
            tempoEstimado: 15
        };

        await service.criarExercicio(dados, usuario);

        await expect(service.criarExercicio(dados, usuario))
            .rejects.toThrow('Já existe um exercício com esse título.');
    });
    
});
