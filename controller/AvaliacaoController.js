const { AvaliacaoService } = require('../service/AvaliacaoService');

async function avaliarTreino(req, res) {
    try {
        const { cliente, treino, nota } = req.body;
        const service = new AvaliacaoService();
        await service.avaliarTreino(cliente, treino, nota);
        res.status(201).json({ mensagem: 'Avaliação registrada com sucesso.' });
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

async function listarAvaliacoesPorTreino(req, res) {
    try {
        const { treino } = req.params;
        const service = new AvaliacaoService();
        const avaliacoes = await service.listarAvaliacoesPorTreino(treino);
        res.json(avaliacoes);
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

async function buscarAvaliacaoDoCliente(req, res) {
    try {
        const { cliente, treino } = req.params;
        const service = new AvaliacaoService();
        const avaliacao = await service.buscarAvaliacaoDoCliente(cliente, treino);
        res.json(avaliacao);
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

async function calcularMediaPorTreino(req, res) {
    try {
        const { treino } = req.params;
        const service = new AvaliacaoService();
        const media = await service.calcularMediaPorTreino(treino);
        res.json({ media });
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

module.exports = {
    avaliarTreino,
    listarAvaliacoesPorTreino,
    buscarAvaliacaoDoCliente,
    calcularMediaPorTreino
};