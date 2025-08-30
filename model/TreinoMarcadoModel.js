const { ExercicioRealizadoModel } = require('./ExercicioRealizadoModel');
const { TreinoModel } = require('./TreinoModel');
const { ClienteModel } = require('./ClienteModel');

class TreinoMarcado {
    /**
     * 
     * @param {{
     *  codigo: Number, 
     *  cliente: ClienteModel, 
     *  treino: TreinoModel, 
     *  dhInicio: Number, 
     *  dhFim: Number, 
     *  exerciciosRealizados: Array<ExercicioRealizadoModel>
     * }
     * }  
     */
    constructor({codigo, cliente, treino, dhInicio, dhFim, exerciciosRealizados}){
        this.codigo = codigo;
        this.dhInicio = dhInicio;
        this.dhFim = dhFim;
        this.cliente = cliente;
        this.treino = treino;
        this.exercicioRealizado = exerciciosRealizados;
    }
}

module.exports = { TreinoMarcado };