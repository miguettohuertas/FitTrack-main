const { conectarBD } = require('../database');
const { CategoriaExercicioModel } = require('../model/CategoriaExercicioModel');

class CategoriaExercicioDao {
    async inserir(categoriaExercicioModel) {
        const conexao = await conectarBD();
        await conexao.query(
            'insert into categoria_exercicio (exercicio, categoria) values (?, ?)',
            [categoriaExercicioModel.exercicio, categoriaExercicioModel.categoria]
        );
        conexao.end();
    }

    async remover(categoriaExercicioModel) {
        const conexao = await conectarBD();
        await conexao.query(
            'delete from categoria_exercicio where exercicio = ? and categoria = ?',
            [categoriaExercicioModel.exercicio, categoriaExercicioModel.categoria]
        );
        conexao.end();
    }

    async listarExerciciosPorCategoria(categoria) {
        const conexao = await conectarBD();
        const [dadosEncontrados] = await conexao.query(
            'select exercicio from categoria_exercicio where categoria = ?',
            [categoria]
        );
        conexao.end();
        return dadosEncontrados.map(row => row.exercicio);
    }

    async listarCategoriasPorExercicio(exercicio) {
        const conexao = await conectarBD();
        const [dadosEncontrados] = await conexao.query(
            'select categoria from categoria_exercicio where exercicio = ?',
            [exercicio]
        );
        conexao.end();
        return dadosEncontrados.map(row => row.categoria);
    }
}

module.exports = { CategoriaExercicioDao };