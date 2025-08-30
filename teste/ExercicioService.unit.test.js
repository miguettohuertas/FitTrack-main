const { ExercicioService } = require('../service/ExercicioService');
const { ExercicioDao } = require('../dao/ExercicioDao');
const { ExercicioModel } = require('../model/ExercicioModel');

jest.mock('../dao/ExercicioDao');
jest.mock('../model/ExercicioModel');

describe('ExercicioService - Unit', () => {
    let service;

    beforeEach(() => {
        ExercicioDao.mockClear();
        ExercicioModel.mockClear();
        service = new ExercicioService();
    });

    describe('listarExercicios', () => {
        it('deve listar exercícios corretamente', async () => {
            const exerciciosFake = [{ titulo: 'Agachamento' }];
            ExercicioDao.prototype.listarExercicios.mockResolvedValue(exerciciosFake);

            const result = await service.listarExercicios();

            expect(result).toEqual(exerciciosFake);
            expect(service.exercicioDao.listarExercicios).toHaveBeenCalled();
        });
    });

    describe('criarExercicio', () => {
        it('deve lançar erro se usuário não for administrador', async () => {
            await expect(service.criarExercicio({}, { tipo: 'cliente' }))
                .rejects.toThrow('Apenas administradores podem criar exercícios');
        });

        it('deve lançar erro se dados obrigatórios estiverem ausentes', async () => {
            const usuario = { tipo: 'administrador' };
            await expect(service.criarExercicio({}, usuario))
                .rejects.toThrow('Título, descrição e tempo estimado são obrigatórios');
        });

        it('deve lançar erro se título já estiver cadastrado', async () => {
            const usuario = { tipo: 'administrador' };
            const dados = { titulo: 'Corrida', descricao: 'Desc', tempoEstimado: 15 };
            ExercicioDao.prototype.buscarPorTitulo.mockResolvedValue({ titulo: 'Corrida' });

            await expect(service.criarExercicio(dados, usuario))
                .rejects.toThrow('Já existe um exercício com esse título.');
        });

        it('deve criar exercício com sucesso', async () => {
            const usuario = { tipo: 'administrador' };
            const dados = { titulo: 'Novo', descricao: 'Desc', tempoEstimado: 10 };
            ExercicioDao.prototype.buscarPorTitulo.mockResolvedValue(null);
            ExercicioDao.prototype.inserirExercicio.mockResolvedValue(99);
            ExercicioModel.mockImplementation((d) => ({ ...d }));

            const exercicio = await service.criarExercicio(dados, usuario);

            expect(exercicio.codigo).toBe(99);
            expect(service.exercicioDao.inserirExercicio).toHaveBeenCalled();
        });
    });
});
