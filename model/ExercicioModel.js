const CategoriaModel = require('./CategoriaModel');

class ExercicioModel {
    
    /**
     * 
     * @param {*} codigo 
     * @param {*} titulo 
     * @param {*} descricao 
     * @param {*} tempoEstimado 
     * @param {*} video 
     * @param {Array<CategoriaModel>} categorias 
     */
    constructor( codigo, titulo, descricao, tempoEstimado, video, categorias) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.descricao = descricao;
        this.tempoEstimado = tempoEstimado;
        this.video = video;
        this.categorias = categorias;
    }

    /**
     * 
     * @param {CategoriaModel} categoria 
     */
    setCategoria(categoria){
        this.categorias.push(categoria);
    }

    /**
     * 
     * @param {Object} object com:
     * - {Number|Null} codigo - codigo identificador de exercicio
     * - {string|Null} titulo - titulo do exercicio
     * - {string|Null} descricao - texto com breve desccricao do exercicio
     * - {Number|Null} tempoEstimado - duração do exercicio em minutos
     * - {string|Null} video - caminho que leva ao arquivo do video
     * 
     * @returns {ExercicioModel}
     */
    static exercicioModelFactory(object){
        return new ExercicioModel(
            object.codigo,
            object.titulo,
            object.descricao,
            object.tempoEstimado,
            object.video
        );
    }
}

module.exports = { ExercicioModel };