const { CategoriaExercicioDao } = require('../dao/CategoriaExercicioDao');
const { CategoriaExercicioModel } = require('../model/CategoriaExercicioModel');

class CategoriaExercicioService {
    async associarExercicioCategoria(exercicio, categoria) {
        if (!exercicio || !categoria) {
            throw new Error('Exercício e categoria são obrigatórios.');
        }
        const dao = new CategoriaExercicioDao();
        await dao.inserir(new CategoriaExercicioModel({ exercicio, categoria }));
    }

    async desassociarExercicioCategoria(exercicio, categoria) {
        if (!exercicio || !categoria) {
            throw new Error('Exercício e categoria são obrigatórios.');
        }
        const dao = new CategoriaExercicioDao();
        await dao.remover(new CategoriaExercicioModel({ exercicio, categoria }));
    }

    async listarExerciciosPorCategoria(categoria) {
        const dao = new CategoriaExercicioDao();
        return await dao.listarExerciciosPorCategoria(categoria);
    }

    async listarCategoriasPorExercicio(exercicio) {
        const dao = new CategoriaExercicioDao();
        return await dao.listarCategoriasPorExercicio(exercicio);
    }
}

module.exports = { CategoriaExercicioService };