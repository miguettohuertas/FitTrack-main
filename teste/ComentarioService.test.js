const { ComentarioService } = require('../service/ComentarioService');
const { ComentarioDao } = require('../dao/ComentarioDao');

jest.mock('../dao/ComentarioDao');

describe('ComentarioService', () => {
    let comentarioService;
    beforeEach(() => {
        ComentarioDao.mockClear();
        comentarioService = new ComentarioService();
    });

    describe('criarComentario', () => {
        it('deve lançar erro se cliente não estiver autenticado', async () => {
            await expect(comentarioService.criarComentario(null, 1, 'Teste')).rejects.toThrow('Usuário não autenticado.');
        });
        it('deve lançar erro se treino não for informado', async () => {
            await expect(comentarioService.criarComentario(1, null, 'Teste')).rejects.toThrow('Treino não informado.');
        });
        it('deve lançar erro se texto for vazio', async () => {
            await expect(comentarioService.criarComentario(1, 1, '')).rejects.toThrow('Comentário não pode ser vazio.');
            await expect(comentarioService.criarComentario(1, 1, '   ')).rejects.toThrow('Comentário não pode ser vazio.');
        });
        it('deve criar comentário com dados válidos', async () => {
            const mockInsertId = 123;
            ComentarioDao.prototype.inserirComentario.mockResolvedValue(mockInsertId);
            const comentario = await comentarioService.criarComentario(1, 2, 'Comentário válido');
            expect(comentario.codigo).toBe(mockInsertId);
            expect(comentario.cliente).toBe(1);
            expect(comentario.treino).toBe(2);
            expect(comentario.texto).toBe('Comentário válido');
            expect(comentario.dataHora).toBeInstanceOf(Date);
        });
    });

    describe('listarComentariosPorTreino', () => {
        it('deve retornar lista de comentários do DAO', async () => {
            const mockComentarios = [
                { codigo: 1, cliente: 1, treino: 2, texto: 'Oi', dataHora: new Date() },
                { codigo: 2, cliente: 2, treino: 2, texto: 'Olá', dataHora: new Date() }
            ];
            ComentarioDao.prototype.listarPorTreino.mockResolvedValue(mockComentarios);
            const comentarios = await comentarioService.listarComentariosPorTreino(2);
            expect(comentarios).toEqual(mockComentarios);
            expect(ComentarioDao.prototype.listarPorTreino).toHaveBeenCalledWith(2);
        });
    });
});