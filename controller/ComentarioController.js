const { ComentarioService } = require('../service/ComentarioService');
const { TreinoService } = require('../service/TreinoService');

const comentarioService = new ComentarioService();
const treinoService = new TreinoService();

async function criarComentario(req, res, next) {
    const treinoId = req.params.treino;
    const treino = await treinoService.buscarPorId(treinoId);

    try {
        const { texto } = req.body;        
        
        if(!texto || texto === ""){
            throw Error("Texto do comentário não pode estar vazio!");
        }

        await comentarioService.criarComentario(treino, texto);
    } catch (erro) {
        console.log(erro.message);
        
    } finally {
        res.redirect('/treino/'+ treino.codigo);
    }
}

async function listarComentariosPorTreino(req, res, next) {
    try {
        const { idTreino } = req.params;
        const service = new ComentarioService();
        const comentarios = await service.listarComentariosPorTreino(idTreino);
        res.json(comentarios);
    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
}

module.exports = { criarComentario, listarComentariosPorTreino };