const { ComentarioDao } = require('../dao/ComentarioDao');
const { ComentarioModel } = require('../model/ComentarioModel');
const { ClienteService } = require('./ClienteService');

class ComentarioService {
    async criarComentario(treino, texto) {
        if (!texto || texto.trim() === '') {
            throw new Error('Comentário não pode ser vazio.');
        }

        const clienteService = new ClienteService();

        const cliente = await clienteService.buscarPorEmail(global.emailCliente);

        const comentario = new ComentarioModel({        
            cliente,
            treino,
            texto,
            dataHora: new Date()
        });        

        console.log(comentario);

        const dao = new ComentarioDao();
        const codigo = await dao.inserirComentario(comentario);
        comentario.codigo = codigo;
        return comentario;
    }

    async listarComentariosPorTreino(idTreino) {
        const dao = new ComentarioDao();
        return await dao.listarPorTreino(idTreino);        
    }
}

module.exports = { ComentarioService };