class AdministradorModel {
    constructor(codigo,nome,email,senha,foto){
        this.codigo = codigo
        this.nome = nome
        this.email = email
        this.senha = senha
        this.foto = foto
    }    

    /**
     * Função de fábrica que tranforma resultado do banco de dados em 
     * lista de AdministradorModel
     * @param {Array} dbResult 
     * @returns lista de objetos AdministradorModel
     */
    static async fromDatabase(dbResult){
        let adminModelList = [];

        dbResult.forEach(result => {
            adminModelList.push(
                new AdministradorModel(
                    result.cod_admin,
                    result.nome_admin,
                    result.email_admin,
                    result.senha_admin,
                    result.foto_admin
                )
            )
        });

        return adminModelList;
    }
}

module.exports = { AdministradorModel };