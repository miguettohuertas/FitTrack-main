const { glob } = require('fs');
const { TreinoService } = require('../service/TreinoService');
const { ClienteService } = require('./../service/ClienteService');
const { ExercicioService } = require('./../service/ExercicioService');

const treinoService = new TreinoService();
const clienteService = new ClienteService();
const exercicioService = new ExercicioService();

exports.listarTreinos = async function (req, res, next) {
    try {
        const treinos = await treinoService.listarTreinos();
        res.json(treinos);
    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
}

exports.renderizarTreino = async function(req, res, next) {
    const id = req.params.id;

    try{
        const cliente = await clienteService.buscarPorEmail(global.emailCliente);
        const treino = await treinoService.buscarPorId(id);

        res.render('treino', {
            titulo: treino.titulo,
            sucesso: null,
            message: null,
            cliente, 
            treino
        });
    }catch(error){
        res.status(200).json({
            sucesso: false,
            mensagem: error.message
        });
    }
}

exports.iniciarTreino = async function (req, res, next) {
    try{
        const treinoId = req.params.treino;
        const treino = await treinoService.buscarPorId(treinoId);
        const cliente = await clienteService.buscarPorEmail(global.emailCliente);

        const treinoMarcado = await treinoService.marcarTreino(treino, cliente);
        
        if(!treinoMarcado){
            throw new Error("Não foi possível marcar treino!");
        }

        res.redirect('/treino/'+treino.codigo+'/iniciar-exercicio/'+treino.exercicios[0].codigo+'?treinoMarcado='+treinoMarcado);
    }catch(error){
        console.log(error.message);
        res.json(error.message);
    }
    
}


exports.iniciarExercicio = async function (req, res, next) {
    const {treinoId,exercicioId} = req.params;
    const {treinoMarcado} = req.query;
    try{
        const cliente = await clienteService.buscarPorEmail(global.emailCliente);        
        await exercicioService.iniciarExercicio(treinoMarcado, exercicioId, cliente.codigo);

        res.redirect('/treino/'+treinoId+'/assistir/'+exercicioId+'?treinoMarcado='+treinoMarcado);
    }catch(error){
        res.send({error});
    }
}

exports.finalizarExercicio = async function (req, res, next) {
    const {treinoId,exercicioId} = req.params;
    const {peso, repeticoes, avaliacao} = req.body;
    const {treinoMarcado} = req.query;

    try{
        await exercicioService.finalizarExercicio(treinoMarcado, exercicioId, peso, repeticoes);

        const treino = await treinoService.buscarPorId(treinoId);
        const index = treino.exercicios.findIndex(exe => exe.codigo === parseInt(exercicioId));
        const proximoExercicio = treino.exercicios[index+1];

        if(!proximoExercicio){
            res.redirect('/treino/'+treinoId+'/finalizar-treino/'+treinoMarcado+'?avaliacao='+avaliacao);
        } else {
            res.redirect('/treino/'+treinoId+'/iniciar-exercicio/'+proximoExercicio.codigo+'?treinoMarcado='+treinoMarcado);
        }

    }catch(error){
        res.send({error});
    }
}

exports.finalizarTreino = async function (req, res, next) {
    const {treinoId,treinoMarcadoId} = req.params;
    const {avaliacao} = req.query;

    try{
        const cliente = await clienteService.buscarPorEmail(global.emailCliente);
        await treinoService.finalizarTreino(treinoId,avaliacao,cliente.codigo,treinoMarcadoId);
        res.redirect('/treino/'+treinoId);
    }catch(error){
        res.json(error.message);
    }
}

exports.renderizarTreinoComVideo = async function (req, res, next) {
    const {treinoId,exercicioId} = req.params;
    const {treinoMarcado} = req.query;
    try{
        const treino = await treinoService.buscarPorId(treinoId);
        const exercicio = treino.exercicios.find(exercicio => exercicio.codigo === parseInt(exercicioId));
        const cliente = await clienteService.buscarPorEmail(global.emailCliente);
        
        res.render('treino-assistindo',{
            treinoMarcado: treinoMarcado,
            treino,
            exercicio,
            cliente
        });
    }catch(error){
        res.send({error});
    }
}

exports.criarTreino = async function (req, res, next) {
    try {
        const dados = req.body;
        const service = new TreinoService();
        const treino = await service.criarTreino(dados);
        res.status(201).json(treino);
    } catch (erro) {
        res.json({ sucesso: false, mensagem: erro.message });
    }
}

exports.atualizarTreino = async function (req, res, next) {
    try{
        const dados = req.body;
        const id = req.params.id;
        const service = new TreinoService();
        
        await service.atualizarTreino(dados,id);

        res.status(204);        
    } catch(erro){
        res.json({mensagem: erro});
    }
}

exports.removerExercicios = async function (req, res, next) {
    try{
        const dados = req.body;
        const id = req.params.id;
        const service = new TreinoService();

        await service.removerExercicios(dados, id);

        res.status(204);
    }catch(erro){
        res.json({mensagem: erro});
    }
}

exports.adicionarExercicios = async function (req, res, next) {
    try{
        const dados = req.body;
        const id    = req.params.id;
        const service = new TreinoService();

        await service.adicionarExercicios(dados, id);

        res.status(204);
    }catch(erro){
        return res.json({mensagem: erro});
    }
}

