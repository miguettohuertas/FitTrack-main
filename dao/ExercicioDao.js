const { conectarBD } = require('../database');
const { ExercicioModel } = require('../model/ExercicioModel');

class ExercicioDao {

    async iniciarExercicio(treinoMarcadoId, exercicioId, clienteId, dataHora){
        const conexao = await conectarBD();
        try{
            const sql = 'CALL iniciar_exercicio(?,?,?,?)';
            const [ resultado ]= await conexao.query(sql, [treinoMarcadoId, exercicioId, dataHora, clienteId]);

            return resultado.affectedRows;
        }catch(error){
            throw new Error(error.message);
        }finally{
            await conexao.end();
        }
    }

    async finalizarExercicio(treinoMarcadoId, exercicioId, dataHora, peso, repeticoes){
        const conexao = await conectarBD();
        try{
            const sql = 'CALL finalizar_exercicio(?,?,?,?,?)';
            const [ resultado ]= await conexao.query(sql, [treinoMarcadoId, exercicioId, dataHora, peso, repeticoes]);

            return resultado.affectedRows;
        }catch(error){
            throw new Error(error.message);
        }finally{
            await conexao.end();
        }
    }

    async listarExercicios() {
        const conexao = await conectarBD();
        const [dadosEncontrados] = await conexao.query('select cod_exe, titulo_exe, descricao_exe, duracao_exe, video_exe from exercicio;');

        conexao.end();
        return dadosEncontrados.map(row => new ExercicioModel({
            codigo: row.cod_exe,
            titulo: row.titulo_exe,
            descricao: row.descricao_exe,
            tempoEstimado: row.duracao_exe,
            video: row.video_exe
        }));
    }

    async inserirExercicio(exercicioModel) {
        const conexao = await conectarBD();
        try{
            const [resultado] = await conexao.query('insert into exercicio (titulo_exe, descricao_exe, duracao_exe, video_exe) values (?, ?, ?, ?)',
                [
                    exercicioModel.titulo,
                    exercicioModel.descricao,
                    exercicioModel.tempoEstimado,
                    exercicioModel.video
                ]
            );
            return resultado.insertId;
        }finally{
            conexao.end();
        }
    }

    async buscarPorTitulo(titulo) {
        const conexao = await conectarBD();
        try{
            const [dadosEncontrados] = await conexao.query('select cod_exe, titulo_exe, descricao_exe, duracao_exe, video_exe from exercicio where titulo_exe = ?;', [titulo]);
            conexao.end();

            return dadosEncontrados.length > 0 ? new ExercicioModel({
                codigo: dadosEncontrados[0].cod_exe,
                titulo: dadosEncontrados[0].titulo_exe,
                descricao: dadosEncontrados[0].descricao_exe,
                tempoEstimado: dadosEncontrados[0].duracao_exe,
                video: dadosEncontrados[0].video_exe
            }) : null;
        }catch(erro){
            throw new Error(erro);
        }finally{
            conexao.end();
        }
        
    }
    async buscarPorId(id) {
        const conexao = await conectarBD();
        try{
            const [dadosEncontrados] = await conexao.query('select * from exercicio where cod_exe = ?;', [id]);

            return dadosEncontrados.length > 0 ? new ExercicioModel({
                codigo: dadosEncontrados[0].cod_exe,
                titulo: dadosEncontrados[0].titulo_exe,
                descricao: dadosEncontrados[0].descricao_exe,
                tempoEstimado: dadosEncontrados[0].duracao_exe,
                video: dadosEncontrados[0].video_exe
            }) : null;
        }catch(erro){
            throw new Error(erro);
        }finally{
            conexao.end();
        }
        
    }

    async editarExercicio(exercicioModel) {
        const conexao = await conectarBD();
        const sql = `update exercicio set titulo_exe = ?, descricao_exe = ?, duracao_exe = ?, video_exe = ? where cod_exe = ?`;

        const valores = [
            exercicioModel.titulo,
            exercicioModel.descricao,
            exercicioModel.tempoEstimado,
            exercicioModel.video,
            exercicioModel.codigo
        ];

        const [resultado] = await conexao.query(sql, valores);

        return resultado.affectedRows > 0;
    }

    async excluirExercicio(codigo) {
        const conexao = await conectarBD();
        const sql = 'delete from exercicio where cod_exe = ?';
        const [resultado] = await conexao.query(sql, [codigo]);

        return resultado.affectedRows > 0;
    }
}

module.exports = { ExercicioDao };
