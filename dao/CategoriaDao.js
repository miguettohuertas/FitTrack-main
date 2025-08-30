const { conectarBD } = require('../database');
const { CategoriaModel } = require('../model/CategoriaModel');

class CategoriaDao {
    async listarCategorias() {
        const conexao = await conectarBD();
        try{
            const [dadosEncontrados] = await conexao.query('select cod_cat, titulo_cat from categoria;');
            
            
            return dadosEncontrados.map(row => new CategoriaModel({
                codigo: row.cod_cat,
                titulo: row.titulo_cat
            }));
            
        }finally{
            conexao.end();
        }
    }

    async inserirCategoria(categoriaModel) {
        const conexao = await conectarBD();
        try{
            const [resultado] = await conexao.query('insert into categoria (titulo_cat) values (?)', [categoriaModel.titulo]);
            return resultado.insertId;
        } finally {
            conexao.end();
        }
    }

    async buscarPorTitulo(titulo) {
        const conexao = await conectarBD();
        
        try{
            const [dadosEncontrados] = await conexao.query('select cod_cat, titulo_cat from categoria where titulo_cat = ?;', [titulo]);

            return dadosEncontrados.length > 0 ? new CategoriaModel({
                codigo: dadosEncontrados[0].cod_cat,
                titulo: dadosEncontrados[0].titulo_cat
            }) : null;
        } finally {
            conexao.end();
        }
    }

    async editarCategoria(novoTitulo, codigo) {
        const conexao = await conectarBD();
        try{
            const [resultado] = await conexao.query('update categoria set titulo_cat = ? where cod_cat = ?', [novoTitulo, codigo]);
            return resultado.affectedRows > 0;

        } finally {
            conexao.end();
        }
    }

    async excluirCategoria(codigo) {
        const conexao = await conectarBD();
        const [resultado] = await conexao.query('delete from categoria where cod_cat = ?', [codigo]);
        return resultado.affectedRows > 0;
    }
}

module.exports = { CategoriaDao };
