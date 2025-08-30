class ComentarioModel {
    constructor({ codigo, cliente, treino, texto, dataHora }) {
        this.codigo = codigo;
        this.cliente = cliente;
        this.treino = treino;
        this.texto = texto;
        this.dataHora = dataHora;
    }
}

module.exports = { ComentarioModel };