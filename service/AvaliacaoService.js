const { AvaliacaoDao } = require('../dao/AvaliacaoDao');
const { AvaliacaoModel } = require('../model/AvaliacaoModel');

class AvaliacaoService {
    async avaliarTreino(cliente, treino, nota, comentario) {
        if (!cliente) {
            throw new Error('Usuário não autenticado.');
        }
        if (!treino) {
            throw new Error('Treino não informado.');
        }
        if (typeof nota !== 'number' || nota < 1 || nota > 5) {
            throw new Error('Nota inválida.');
        }
        const dao = new AvaliacaoDao();
        const avaliacao = new AvaliacaoModel({
            cliente,
            treino,
            nota,
            comentario,
            dataHora: new Date()
        });

        const insertId = await dao.inserirOuAtualizar(avaliacao);
        avaliacao.codigo = insertId;
        return avaliacao;
    }

    async listarAvaliacoesPorTreino(treino) {
        const dao = new AvaliacaoDao();
        return await dao.buscarPorTreino(treino);
    }
}

module.exports = { AvaliacaoService };