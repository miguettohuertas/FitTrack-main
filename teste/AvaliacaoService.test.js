const { AvaliacaoService } = require('../service/AvaliacaoService');
const { AvaliacaoDao } = require('../dao/AvaliacaoDao');

jest.mock('../dao/AvaliacaoDao');

describe('AvaliacaoService', () => {
    let avaliacaoService;
    beforeEach(() => {
        AvaliacaoDao.mockClear();
        avaliacaoService = new AvaliacaoService();
    });

    describe('avaliarTreino', () => {
        it('deve lançar erro se cliente não estiver autenticado', async () => {
            await expect(avaliacaoService.avaliarTreino(null, 1, 5, 'Bom')).rejects.toThrow('Usuário não autenticado.');
        });
        it('deve lançar erro se treino não for informado', async () => {
            await expect(avaliacaoService.avaliarTreino(1, null, 5, 'Bom')).rejects.toThrow('Treino não informado.');
        });
        it('deve lançar erro se nota for inválida', async () => {
            await expect(avaliacaoService.avaliarTreino(1, 1, null, 'Bom')).rejects.toThrow('Nota inválida.');
            await expect(avaliacaoService.avaliarTreino(1, 1, 0, 'Bom')).rejects.toThrow('Nota inválida.');
            await expect(avaliacaoService.avaliarTreino(1, 1, 6, 'Bom')).rejects.toThrow('Nota inválida.');
        });
        it('deve criar avaliação com dados válidos', async () => {
            const mockInsertId = 321;
            AvaliacaoDao.prototype.inserirOuAtualizar.mockResolvedValue(mockInsertId);
            const avaliacao = await avaliacaoService.avaliarTreino(1, 2, 5, 'Ótimo treino');
            expect(avaliacao.codigo).toBe(mockInsertId);
            expect(avaliacao.cliente).toBe(1);
            expect(avaliacao.treino).toBe(2);
            expect(avaliacao.nota).toBe(5);
            expect(avaliacao.comentario).toBe('Ótimo treino');
            expect(avaliacao.dataHora).toBeInstanceOf(Date);
        });
    });

    describe('listarAvaliacoesPorTreino', () => {
        it('deve retornar lista de avaliações do DAO', async () => {
            const mockAvaliacoes = [
                { codigo: 1, cliente: 1, treino: 2, nota: 5, comentario: 'Bom', dataHora: new Date() },
                { codigo: 2, cliente: 2, treino: 2, nota: 4, comentario: 'Legal', dataHora: new Date() }
            ];
            AvaliacaoDao.prototype.buscarPorTreino.mockResolvedValue(mockAvaliacoes);
            const avaliacoes = await avaliacaoService.listarAvaliacoesPorTreino(2);
            expect(avaliacoes).toEqual(mockAvaliacoes);
            expect(AvaliacaoDao.prototype.buscarPorTreino).toHaveBeenCalledWith(2);
        });
    });
});