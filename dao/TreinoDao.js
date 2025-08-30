const { conectarBD } = require("../database");
const { ExercicioModel } = require("../model/ExercicioModel");
const { TreinoModel } = require("../model/TreinoModel");

class TreinoDao{    

    /**
     * 
     * @param {Number} treinoId 
     * @param {Number} clienteId 
     */
    async marcarTreino(treinoId, clienteId, dataHora){
        const conexao = await conectarBD();
        try{
            const sql = 'CALL iniciar_treino(?,?,?);';
            const [resultado] = await conexao.query(sql, [clienteId, treinoId, dataHora]);

            return resultado[0][0].id;
        }catch(erro){
            throw new Error(erro.message);
        }finally{
            await conexao.end();
        }
    }

    /**
     * 
     * @param {Number} treinoId 
     * @param {Number} clienteId 
     */
    async finalizarTreino(treinoMarcadoId, dataHora){
        const conexao = await conectarBD();
        try{
            const sql = 'CALL finalizar_treino(?,?);';
            const [resultado] = await conexao.query(sql, [treinoMarcadoId,  dataHora]);
            
            return resultado.affectedRows;
        }catch(erro){
            throw new Error(erro.message);
        }finally{
            await conexao.end();
        }
    }

    /**
     * 
     * @param {Number} treinoId 
     * @param {Number} clienteId 
     */
    async avaliarTreino(treinoId, clienteId, avaliacao){
        const conexao = await conectarBD();
        try{
            const sql = 'CALL inserir_avaliacao(?,?,?);';
            const [resultado] = await conexao.query(sql, [clienteId,  treinoId, avaliacao]);
            
            return resultado.affectedRows;
        }catch(erro){
            throw new Error(erro.message);
        }finally{
            await conexao.end();
        }
    }

    async clienteJaAvaliouTreino(clienteId, treinoId){
        const conexao = await conectarBD();
        try{
            const sql = 'select nota from avaliacao where treino = ? AND cliente = ?;';
            const [resultado] = await conexao.query(sql, [treinoId,  clienteId]);
            
            return resultado.length > 0 ? true : false;
        }catch(erro){
            throw new Error(erro.message);
        }finally{
            await conexao.end();
        }
    }

    /**
     * Função que busca os dados de um treino
     * @param {Number} id codigo de identificação de treino 
     
     * @returns objeto com - 
     * - {boolean} sucesso      - indica se a operação foi bem sucedida
     * - {Object} rows         - Array com linhas encontradas pela operação
     * - {string} mensagem      - Presente se nenhuma linha foi encontrada ou ocorreu erro
     * - {Error} erro           - Objeto de erro em caso de falha inesperada.
     */
    async buscarPorId(id) {
        const conexao = await conectarBD();
        try{
            const sql ='select * from listar_dados_treinos where cod_tre = ?;';
            const [resultado]  = await conexao.query(sql, [ id ]);

            return resultado.length > 0 
                ? { sucesso: true,  rows: resultado }
                : { sucesso: false, mensagem: "Nenhum dado encontrado"};
        }catch(erro){
            return { sucesso: false, mensagem: "Houve algum erro durante execução", erro};
        }finally{
            await conexao.end();
        }
    }

    async listarTreinosComNota(){
        const conexao = await conectarBD();
        try{
            const sql ='call treinos_cat_nota();';
            const [ resultado ] = await conexao.query(sql);

            return resultado.length > 0 
                ? { sucesso: true,  rows: resultado }
                : { sucesso: false, mensagem: "Nenhum dado encontrado"};
        }catch(erro){
            return { sucesso: false, mensagem: "Houve algum erro durante execução", erro};
        }finally{
            await conexao.end();
        }
    }

    /**
     * Função que busca no banco de dados por uma nota média de um 
     * treino específico
     * @param {TreinoModel} treino 
     */
    async buscarNota(id){
        const conexao = await conectarBD();
        try{
            const sql = 'call nota_do_treino(?)';
            const [ [resultado] ] = await conexao.query(sql, [ id ]);
            
            return resultado.length > 0 
                ? { sucesso: true,  rows: resultado[0] }
                : { sucesso: false, mensagem: "Nenhum dado encontrado"};
        } finally{
            await conexao.end();
        }
    }

    /**
     * Função que busca por todos os registros de treinos no banco
     * de dados.
     * @returns objeto com - 
     * - {boolean} sucesso      - indica se a operação foi bem sucedida
     * - {Array<Object>} lista  - Array com linhas encontradas pela operação
     * - {string} mensagem      - Presente se nenhuma linha foi encontrada ou ocorreu erro
     * - {Error} erro           - Objeto de erro em caso de falha inesperada.
     */
    async listarTodos(){
        const conexao = await conectarBD();
        try{
            const sql ='select * from treinos_dashboard;';
            const [ resultado ] = await conexao.query(sql);
    
            return resultado.length > 0 
                ? { sucesso: true,  rows: resultado }
                : { sucesso: false, mensagem: "Nenhum dado encontrado"};
        }catch(erro){
            return { sucesso: false, mensagem: "Houve algum erro durante execução", erro};
        }finally{
            await conexao.end();
        }
    }

    async buscarNotas(){
        const conexao = await conectarBD();
        try{
            const sql ='select treino, avg(nota) as nota from avaliacao group by treino;';
            const [ resultado ] = await conexao.query(sql);
    
            return resultado.length > 0 
                ? { sucesso: true,  rows: resultado }
                : { sucesso: false, mensagem: "Nenhum dado encontrado"};
        } catch(erro){
            return { sucesso: false, mensagem: "Houve algum erro durante execução", erro};
        } finally{
            await conexao.end();
        }
    }

    /**
     * Função que insere um novo treino no banco de dados
     * @param {TreinoModel} model retorna um objeto modelo de 
     * @returns objeto com - 
     * - {boolean} sucesso - indica se a operação foi bem sucedida
     * - {Number} novoId campo com novo id registrado
     * - {string} mensagem - Presente se nenhuma linha foi inserida ou ocorreu erro
     * - {Error} erro - Objeto de erro em caso de falha inesperada.
     */
    async inserir(treino){    
        const conexao = await conectarBD();
        try{
            const sql = 'INSERT INTO treino(descricao_tre, titulo_tre) values (?,?);';
            const [ results ] = await conexao.query(sql, treino.toInsertArray());
            const { insertId } = results;
    
            if(!insertid){
                return {sucesso: false, mensagem: "Não foi possível inserir dados no banco de dados."};
            }
            return { sucesso: true, novoId: insertId};
        
        }catch(erro){
            return { sucesso: false, mensagem: "Houve algum erro durante execução", erro};
        } finally{
            await conexao.end();
        }
        
    }

    /**
     * Função que atualiza registro de treino no banco de dados
     * @param {TreinoModel} treino 
     * @returns {Object} objeto com - 
     * - {boolean} sucesso - indica se a operação foi bem sucedida
     * - {string} mensagem - Presente se nenhuma linha foi alterada ou ocorreu erro
     * - {Error} erro - Objeto de erro em caso de falha inesperada.
    */
    async atualizar(treino){
        const conexao = await conectarBD();
        try{
            const sql = 'UPDATE treino set descricao_tre = ?, titulo_tre = ? WHERE cod_tre = ?';
            const [ resultado ] = await conexao.query(sql, treino.toUpdateArray());
            const { affectedRows } = resultado;

            if(!affectedRows){
                return {sucesso: false, mensagem: "Nenhuma linha foi alterada."};
            }

            return {sucesso: true};
        }catch(erro){
            return {sucesso: false, mensagem: "Erro ao atualizar dados.", erro};
        } finally{
            conexao.end();
        }
    }

    /**
     * Função que deleta um registro de treino no banco de dados
     * @param {TreinoModel} treino 
     * @returns objeto com - 
     * - {boolean} sucesso - indica se a operação foi bem sucedida
     * - {string} mensagem - Presente se nenhuma linha foi alterada ou ocorreu erro
     * - {Error} erro - Objeto de erro em caso de falha inesperada.
    */
    async deletar(treino){
        const conexao = await conectarBD();
        try{
            const sql = 'DELETE FROM treino WHERE cod_tre = ?';
            const [ resultado ] = await conexao.query(sql, [treino.codigo]);
            const { affectedRows } = resultado;

            if(!affectedRows){
                return {sucesso: false, mensagem: "Nenhuma linha foi deletada."};
            }

            return {sucesso: true};
        } catch(erro){
            return {sucesso: false, mensagem: "Falha ao deletar treino", erro};
        } finally{
            await conexao.end();
        }
    }

    /**
     * 
     * @param {TreinoModel} treino 
     * @returns objeto com - 
     * - {boolean} sucesso - indica se a operação foi bem sucedida
     * - {Array<Object>} novosIds - array com objetos obtendo ids inseridos.
     * - {string} mensagem - Presente se nenhuma linha foi inserida ou ocorreu erro
     * - {Error} erro - Objeto de erro em caso de falha inesperada.
    */
    async vincularExercicios(treino){
        const conexao = await conectarBD();
        try{
            const sql = "INSERT INTO treino_exercicio(treino, exercicio) VALUES ?";
            const [ resultado ] = await conexao.query(sql, treino.toInsertTreinoExercicioArray());
            const { affectedRows } = resultado;
            
            if(!affectedRows){
                return { sucesso: false, mensagem: "Falha ao inserir exercicios ao treino."};
            }

            const novosIds = [];
            treino.exercicios.forEach( 
                exercicio => novosIds.push({treino: treino.codigo, exercicio: exercicio.codigo}));
            return { sucesso: true, novosIds: novosIds};
        
        }catch(erro){
            return { sucesso: false, mensagem: "Erro inesperado ao inserir exercicios ao treino", erro};
        
        } finally{
            await conexao.end();
        }
    }

    /**
     * 
     * @param {TreinoModel} treino 
     * - {boolean} sucesso - indica se a operação foi bem sucedida
     * - {string} mensagem - Presente se nenhuma linha foi deletada ou ocorreu erro
     * - {Error} erro - Objeto de erro em caso de falha inesperada.
    */
    async removerVinculoExercicio(treino){
        const conexao = await conectarBD();
        try{
            const sql = "DELETE FROM treino_exercicio WHERE treino = ? AND exercicio in (?)";
            const [ resultado ] = await this.conexao.query(sql, [treino.codigo, treino.arrayCodigoExercicios()]);
            const { affectedRows } = resultado;

            return affectedRows > 0
            ? { sucesso: true }
            : { sucesso: false, mensagem: "Nenhuma linha deletada"}
        }catch(erro){
            return { sucesso: false, mensagem: "Erro inesperado ao deletar exercicio de treino", erro };
        } finally{
            await conexao.end();
        }
    }
}

module.exports = { TreinoDao };
