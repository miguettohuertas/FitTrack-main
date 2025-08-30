const { ExercicioModel } = require('../model/ExercicioModel');
const { ExercicioDao } = require('../dao/ExercicioDao');
const { FuncoesUtil } = require('../util/FuncoesUtil');

class ExercicioService {
    constructor() {
        this.dao = new ExercicioDao();
    }

    async iniciarExercicio(treinoMarcadoId, exercicioId, clienteId){
        const dao = new ExercicioDao();
        const sucesso = dao.iniciarExercicio(
            treinoMarcadoId,
            exercicioId,
            clienteId,
            FuncoesUtil.dataHoraAtual()
        );

        if(!sucesso){
            throw new Error('não foi possivel iniciar exercicio!');
        }
    }

    async finalizarExercicio(treinoMarcadoId, exercicioId, peso, repeticoes){
        const dao = new ExercicioDao();
        const sucesso = dao.finalizarExercicio(
            treinoMarcadoId,
            exercicioId,
            FuncoesUtil.dataHoraAtual(),
            peso,
            repeticoes
        );
        
        if(!sucesso){
            throw new Error('não foi possivel iniciar exercicio!');
        }
    }

    async listarExercicios() {
        return await this.dao.listarExercicios();
    }

    async buscarPorId(id) {
        return await this.dao.buscarPorId(id);
    }

    async criarExercicio(dados, usuario) {
        if (!usuario || usuario.tipo !== 'administrador') {
            throw new Error('Apenas administradores podem criar exercícios');
        }

        if (!dados.titulo_exe || !dados.descricao_exe || !dados.duracao_exe) {
            throw new Error('Título, descrição e tempo estimado são obrigatórios');
        }

        if (dados.titulo_exe.length > 50) {
            throw new Error('O título do exercício não pode exceder 50 caracteres.');
        }

        const exercicioExistente = await this.exercicioDao.buscarPorTitulo(dados.titulo_exe);
        if (exercicioExistente) {
            throw new Error('Já existe um exercício com esse título.');
        }
        
        const exercicioModel = new ExercicioModel({
            titulo: dados.titulo_exe,
            descricao: dados.descricao_exe,
            tempoEstimado: dados.duracao_exe,
            video: dados.video_exe
        });

        const codigo = await this.dao.inserirExercicio(exercicioModel);
        exercicioModel.codigo = codigo;

        return exercicioModel;
    }

    async editarExercicio(codigo, dadosExercicio) {
        if (!dadosExercicio.titulo_exe || !dadosExercicio.descricao_exe || !dadosExercicio.duracao_exe) {
            throw new Error('Título, descrição e tempo estimado são obrigatórios');
        }

        if (dadosExercicio.titulo_exe.length > 50) {
            throw new Error('O título do exercício não pode exceder 50 caracteres.');
        }

        const dao = new ExercicioDao();
        
        const exercicioExistente = await dao.buscarPorTitulo(dadosExercicio.titulo_exe);
        if (exercicioExistente && exercicioExistente.codigo != codigo) {
            throw new Error('Já existe outro exercício com esse título.');
        }

        const exercicioModel = new ExercicioModel({
            codigo: codigo,
            titulo: dadosExercicio.titulo_exe,
            descricao: dadosExercicio.descricao_exe,
            tempoEstimado: dadosExercicio.duracao_exe,
            video: dadosExercicio.video_exe
        });

        return await dao.editarExercicio(exercicioModel);
    }

    async excluirExercicio(codigo) {
        const dao = new ExercicioDao();
       
        return await dao.excluirExercicio(codigo);
    }
}

module.exports = { ExercicioService };