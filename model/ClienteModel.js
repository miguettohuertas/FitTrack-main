class ClienteModel {
    /**
     * Gera um objeto que modela os dados de cliente
     * @param {{
     *  codigo: Number,
     *  nome: string,
     *  email: string,
     *  senha: string,
     *  sexo: string,
     *  peso: Number,
     *  foto: string
     * }}  
     */
    constructor(codigo,nome,email,senha,idade,sexo,peso,foto){
        this.codigo = codigo
        this.nome = nome
        this.email = email
        this.senha = senha
        this.idade = idade
        this.sexo = sexo
        this.peso = peso
        this.foto = foto
    }

    /**
     * Função que converte dadso de clienteModel para array de inserção 
     * no banco de dados.
     * @returns {[nome,email,senha,idade,peso,sexo,foto]} ClienteModel em formato de array
     */
    toInsertArray(){
        return [
            this.nome,
            this.email,
            this.senha,
            this.idade,
            this.peso,
            this.sexo,
            this.foto
        ];
    }

    /**
     * Função que converte os dados de cliente model para array
     * de update do banco de dados
     * @returns {[nome,email,senha,idade,peso,sexo,foto,codigo]}ClienteModel em formato de array
     */
    toUpdateArray(){
        return [
            this.nome,
            this.email,
            this.senha,
            this.idade,
            this.peso,
            this.sexo,
            this.foto,
            this.codigo
        ];
    }

    /**
     * Função que converte uma lista de resultado do banco de dados para 
     * uma lista de ClienteModel
     * @param {*} dbResult lista de dados retornados do banco de dados 
     * @returns {[ClienteModel]}lista de ClienteModel
     */
    static fromDatabase(dados) {
        let clienteList = [];

        dados.forEach(result => {
            clienteList.push(
                new ClienteModel(
                    result.cod_cli,
                    result.nome_cli,
                    result.email_cli,
                    result.senha_cli,
                    result.idade_cli,
                    result.sexo_cli,
                    result.peso_cli,
                    result.foto_cli
                )
            )
        });

        return clienteList;
    }
}

module.exports = { ClienteModel };