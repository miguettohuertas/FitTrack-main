class Resposta{
    
    /**
     * 
     * @param {boolean} sucesso 
     * @param {string} mensagem 
     */
    constructor(sucesso, mensagem){
        this.sucesso = sucesso;
        this.mensagem = mensagem;
    }
}

module.exports = { Resposta };