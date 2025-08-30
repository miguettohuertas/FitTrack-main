const { TreinoDao } = require('../dao/TreinoDao');
const { TreinoFactory } = require('../factory/TreinoFactory');
const { ClienteModel } = require('../model/ClienteModel');
const { ExercicioModel } = require('../model/ExercicioModel');
const { TreinoModel } = require('../model/TreinoModel');
const { FuncoesUtil } = require('../util/FuncoesUtil');
const { ComentarioService } = require('./ComentarioService');

class TreinoService {
    /**
     * 
     * @param {TreinoModel} treino 
     * @param {ClienteModel} cliente 
     */
    async marcarTreino(treino, cliente){
        const dao = new TreinoDao();
        const dataHora = FuncoesUtil.dataHoraAtual();
        return await dao.marcarTreino(treino.codigo, cliente.codigo, dataHora);
    } 
    
    /**
     * 
     * @param {TreinoModel} treino 
     * @param {ClienteModel} cliente 
     */
    async finalizarTreino(treinoId,avaliacao,clienteId,treinoMarcadoId){
        try{
            const dao = new TreinoDao();
            const dataHora = FuncoesUtil.dataHoraAtual();

            const sucesso = await dao.finalizarTreino(treinoMarcadoId, dataHora);
            
            if(!sucesso){
                throw new Error('Não foi possivel finalizar treino!');
            }

            this.avaliarTreino(treinoId,avaliacao,clienteId);
        }catch(error){
            throw new Error(error.message);
        }        
    }   

    /**
     * 
     * @param {TreinoModel} treino 
     * @param {ClienteModel} cliente 
     */
    async avaliarTreino(treinoId, avaliacao, clienteId){
        try{
            const dao = new TreinoDao();
            const clienteJaAvaliouTreino = await dao.clienteJaAvaliouTreino(clienteId, treinoId);

            if(!clienteJaAvaliouTreino){
                const sucesso = await dao.avaliarTreino(treinoId, clienteId, avaliacao);
                
                if(!sucesso){
                    throw new Error('Não foi possivel gravar avalição do treino!');
                }
            }
            
        }catch(error){
            throw new Error(error.message);
        }
        
    }  
    
    /**
     * Função que vincula um exercicio a um treino
     * @param {Object} dados dados do corpo da requisição recebida
     * @param {Number} id id do treino vindo como parâmetro da requisição
     */
    async adicionarExercicios(dados, id){
        this.validarDadosVinculoExercicios(dados,id);
        const treino = this.novoTreino(dados);
        const dao = new TreinoDao();

        treino.codigo = id;

        const resultado = await dao.vincularExercicios(treino);
        this.validaResultadoDao(resultado);
    }

    /**
     * Função que desvincula um exercicio de um treino
     * @param {Object} dados dados do corpo da requisição recebida
     * @param {Number} id id do treino vindo como parâmetro da requisição
     */
    async removerExercicios(dados, id){
        this.validarDadosVinculoExercicios(dados, id);
        const treino = this.novoTreino(dados);
        const dao = new TreinoDao();
        
        treino.codigo = id;

        const resultado = await dao.removerVinculoExercicio(treino);
        this.validaResultadoDao(resultado);
    }

    /**
     * Função que valida e atualiza dados de treino
     * @param {Array} dados 
     * @param {Number} id 
     */
    async atualizarTreino(dados, id){
        this.validarDadosParaAtualizar(dados, id);
        const treino = this.novoTreino(dados);
        treino.codigo = id;

        const dao = new TreinoDao();

        const resultado = await dao.atualizar(treino);

        this.validaResultadoDao(resultado);
    }

    /**
     * Método que procura por um treino 
     * @param {Number} id codigo de identificação de treino
     * @returns {TreinoModel} objeto com os dados do treino
     */
    async buscarPorId(id){
        const dao = new TreinoDao();
        
        const resultado = await dao.buscarPorId(id);
        this.validaResultadoDao(resultado);

        let [ treino ] = TreinoFactory.buildFromRows(resultado.rows);

        const result = await dao.buscarNota(treino.codigo);

        this.validaResultadoDao(result);
        treino.avaliacao = result.rows.nota;
        
        const comentarioService = new ComentarioService();
        const comentarios = await comentarioService.listarComentariosPorTreino(id);

        comentarios.forEach(comentario => {
            comentario.dataHora = FuncoesUtil.formatarDataHora(comentario.dataHora);
        });

        treino.comentarios = comentarios;

        return treino;
    }

    /**
     * Função que busca por todos os treinos no banco
     * de dados
     * @returns {Array<TreinoModel>} 
     */
    async listarTreinos(){
        const dao = new TreinoDao();

        let treinos = await this.buscarTreinos(dao);        
        const notas = await this.buscarNotas(dao);
        
        notas.forEach(avaliacao => {
            const index = treinos.findIndex(treino => treino.codigo === avaliacao.treino);
            treinos[index].avaliacao = avaliacao.nota;
        });    

        return treinos; 
    }

    /**
     * 
     * @param {TreinoDao} dao 
     */
    async buscarNotas(dao){
        const dados = await dao.buscarNotas();
        this.validaResultadoDao(dados);
        return dados.rows;
    }

    /**
     * 
     * @param {TreinoDao} dao 
     * @returns 
     */
    async buscarTreinos(dao){
        const dados = await dao.listarTodos();
        this.validaResultadoDao(dados); 
            
        return TreinoFactory.buildFromRows(dados.rows);
    }

    /**
     * Função que aplica regras de negócio e cadastra treino e vincula 
     * exercicios ao mesmo
     * @param {Object<string,string,Array>} dados corpo da requisição com:
     * - {string} descricao - texto descrevendo treino
     * - {string} titulo    - texto com titulo do treino
     * - {Array} exercicios - Array contendo exercicios 
     * @returns {Promise<TreinoModel>}
     */
    async criarTreino(dados){
        this.validarDadosCadastro(dados);
        const dao = new TreinoDao();
        const treino = this.novoTreino(dados);
        const resultado = await dao.inserir(treino);
        
        this.validaResultadoDao(resultado);

        this.insereNovoIdAoTreino(treino, resultado.novoId);

        await this.vincularExercicios(treino);

        return treino;
    }

    async vincularExercicios(treino){
        const dao = new TreinoDao();
        const resultado = await dao.vincularExercicios(treino);

        this.validaResultadoDao(resultado);
    }

    insereNovoIdAoTreino(treino, novoId){
        treino.codigo = novoId; 
    }

    novoTreino(dados){
        return new TreinoModel(
            dados.codigo, 
            dados.descricao, 
            dados.titulo, 
            this.toArrayOfExercicioModel(dados.exercicios)
        );
    }

    /**
     * Função que converte array de objetos para 
     * array de TreinoModel
     * @param {Array} exercicios 
     * @returns {Array<TreinoModel>}
     */
    toArrayOfExercicioModel(exercicios){
        let listaExercicio = [];
        exercicios.forEach(exercicio => listaExercicio.push(
            ExercicioModel.exercicioModelFactory(exercicio)
        ));

        return listaExercicio;
    }

    /**
     * 
     * @param {Array<Object>} treinos 
     */
    toArrayOfTreinoModel(treinos){
        let listaDeTreinos = [];

        treinos.forEach( treino => listaDeTreinos.push(
            new TreinoModel(
                treino.cod_tre,
                treino.descricao_tre,
                treino.titulo_tre,
                treino.capa_tre,
                treino.exercicios
            )
        ))

        return listaDeTreinos;
    }

    validaResultadoDao(resultado){
        if(!this.retornouSucesso(resultado)){
            if(this.possuiErro(resultado)){
                this.log(resultado.erro);
            }

            this.jogarErro(resultado.mensagem);
        }
    }
    
    
    validarDadosCadastro(dados){
        if(!this.listaExercicioValido(dados.exercicios)){
            throw Error("Treino deve ter pelo meno um exercício!");
        }
        
        if(!this.tituloValido(dados.titulo)){
            throw Error("Titulo inválido");
        }
        
        if(!this.descricaoValida(dados.descricao)){
            throw Error("Descrição inválida");
        }
    }

    validarDadosVinculoExercicios(dados, id){
        if(!this.idValido(id)){
            throw new Error("id inválido!");
        }

        if(!this.listaExercicioValido(dados.exercicios)){
            throw Error("Treino deve ter pelo meno um exercício!");
        }
        
        if(!this.tituloValido(dados.titulo)){
            throw Error("Titulo inválido");
        }
        
        if(!this.descricaoValida(dados.descricao)){
            throw Error("Descrição inválida");
        }
    }       


    validarDadosParaAtualizar(dados, id){        
        if(!this.idValido(id)){
            throw new Error("id inválido!");
        }

        if(!this.tituloValido(dados.titulo)){
            throw Error("Titulo inválido");
        }
        
        if(!this.descricaoValida(dados.descricao)){
            throw Error("Descrição inválida");
        }
    }

    /**
     * Verifica se id é válido
     * @param {Number} id 
     * @returns {boolean} true caso seja válido, false caso 
     * seja inválido
     */
    idValido(id){
        if(!id || id === "" || id === 0){
            return false;
        }
        return true;
    }


    jogarErro(mensagem){
        throw Error("Falha inesperada ao vincular exercicios ao treino: " + mensagem);
    }

    log(erro){
        console.log(erro);
    }

    retornouSucesso(resultado){
        if(!resultado.sucesso){
            return false;
        }
        return true;
    }

    possuiErro(resultado){
        if(!resultado.erro){
            return false;
        }
        return true;
    }
    
    listaExercicioValido(exercicios){
        if(exercicios.length < 1){
            return false;
        }
        return true;
    }

    descricaoValida(descricao){
        if(!descricao || descricao === ""){
            return false;
        }
        return true;
    }

    tituloValido(titulo){
        if(!titulo || titulo === ""){
            return false; 
        }
        return true;
    }
}

module.exports = { TreinoService };