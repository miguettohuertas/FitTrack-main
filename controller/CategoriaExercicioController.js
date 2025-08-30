const { CategoriaExercicioService } = require('../service/CategoriaExercicioService');

async function associarExercicioCategoria(req, res, next) {
    try {
        const { exercicio, categoria } = req.body;
        const service = new CategoriaExercicioService();
        await service.associarExercicioCategoria(exercicio, categoria);
        res.status(201).json({ mensagem: 'Associação criada com sucesso.' });
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

async function desassociarExercicioCategoria(req, res, next) {
    try {
        const { exercicio, categoria } = req.body;
        const service = new CategoriaExercicioService();
        await service.desassociarExercicioCategoria(exercicio, categoria);
        res.json({ mensagem: 'Associação removida com sucesso.' });
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

async function listarExerciciosPorCategoria(req, res, next) {
    try {
        const { categoria } = req.params;
        const service = new CategoriaExercicioService();
        const exercicios = await service.listarExerciciosPorCategoria(categoria);
        res.json(exercicios);
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

async function listarCategoriasPorExercicio(req, res, next) {
    try {
        const { exercicio } = req.params;
        const service = new CategoriaExercicioService();
        const categorias = await service.listarCategoriasPorExercicio(exercicio);
        res.json(categorias);
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

module.exports = {
    associarExercicioCategoria,
    desassociarExercicioCategoria,
    listarExerciciosPorCategoria,
    listarCategoriasPorExercicio
};