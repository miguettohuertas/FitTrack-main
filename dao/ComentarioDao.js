const { conectarBD } = require('../database');
const { ComentarioModel } = require('../model/ComentarioModel');

class ComentarioDao {
    async inserirComentario(comentarioModel) {
        const conexao = await conectarBD();
        try{
            const [resultado] = await conexao.query(
                'insert into comentario (cliente, treino, texto_com, dhcadastro_com) values (?, ?, ?, ?)',
                [comentarioModel.cliente.codigo, comentarioModel.treino.codigo, comentarioModel.texto, comentarioModel.dataHora]
            );
            return resultado.insertId;

        } finally {
            conexao.end();

        }
    }

    // async listarPorTreino(idTreino) {
    //     console.log(idTreino);
        
    //     const conexao = await conectarBD();
    //     const [dadosEncontrados] = await conexao.query(
    //         'select cod_com, cliente, treino, texto_com, dhcadastro_com from comentario where treino = ? order by dhcadastro_com desc',
    //         [idTreino]
    //     );
    //     conexao.end();
    //     console.log("dadosEncontrados");
    //     return dadosEncontrados.map(row => new ComentarioModel({
    //         codigo: row.cod_com,
    //         cliente: row.cliente,
    //         treino: row.treino,
    //         texto: row.texto_com,
    //         dataHora: row.dhcadastro_com
    //     }));
    // }

    async listarPorTreino(idTreino) {
        const conexao = await conectarBD();
        try{
            const sql = 'select * from comentarios where treino = ? order by data_hora desc'; 
            const [dadosEncontrados] = await conexao.query(sql,[idTreino]);
            
            return dadosEncontrados.map(row => new ComentarioModel({
                codigo: row.codigo,
                cliente: row.cliente,
                treino: row.treino,
                texto: row.texto,
                dataHora: row.data_hora
            }));
        } finally {
            conexao.end();
        }        
    }
}

module.exports = { ComentarioDao };