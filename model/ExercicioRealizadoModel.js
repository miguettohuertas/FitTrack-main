class ExercicioRealizadoModel {
    constructor({treino_marcado, exercicio, dhInicio, dhFim, peso, repeticoes}){
        this.treino_marcado = treino_marcado; 
        this.exercicio = exercicio; 
        this.dhInicio = dhInicio; 
        this.dhFim = dhFim; 
        this.peso = peso; 
        this.repeticoes = repeticoes; 
    }
}

module.exports = { ExercicioRealizadoModel };