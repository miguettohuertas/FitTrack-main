const { AdministradorDao } = require('../dao/AdministradorDao');
const { FuncoesUtil } = require('../util/FuncoesUtil');
const { AdministradorModel } = require('../model/AdministradorModel');

class AdministradorService {
    /**
     * Função que valida credenciais de administrador
     * @param {string} email 
     * @param {string} senha 
     * @returns 
     */
    async autenticar(email, senha){        
        this.validaDadosLogin(email, senha);

        const dao = new AdministradorDao();  
        const [ admin ] = await AdministradorModel.fromDatabase(await dao.consultarPorEmail(email));

        if(!this.dadosCorrespondem(admin, senha)){
            return false;
        }

        return admin;
    }

    async criarNovoAdministrador(dados){
        const adminModel = new AdministradorModel(
            null,
            dados.nome,
            dados.email,
            dados.senha,
            dados.foto
        )

        try{            
            this.validarDados(adminModel.email,adminModel.senha);
            const dao = new AdministradorDao();
            const existeAdmin = await this.existeAdministrador(adminModel.email); 

            if(existeAdmin){
                FuncoesUtil.removerFoto(adminModel.foto);
                return false;
            }

            const insertId = await dao.inserir(adminModel);

            if(!insertId){
                FuncoesUtil.removerFoto(adminModel.foto);
                return false;
            }

            return adminModel;
            
        }catch(erro){
            FuncoesUtil.removerFoto(adminModel.foto);
            throw new Error(erro.message);
        }
    }

    async existeAdministrador(email){
        const dao = new AdministradorDao();
        const resultado = await dao.consultarPorEmail(email);
        const admin =  await AdministradorModel.fromDatabase(resultado);

        if(admin.length > 0){
            return true;
        }

        return false;
    }

    /**
     * Função que busca por todos os administradores no banco de dados.
     * @returns {Array<AdministradorModel>} retorna uma lista de administradores. Se não 
     * houver administradores cadastrados no bano de dados, retorna falso.
     */
    async consultarTodos() {        
        const dao = new AdministradorDao();
        const resultado = await dao.listarTodos();
        const administradores = await AdministradorModel.fromDatabase(resultado);

        return administradores;
    }

    async deletarAdministrador(codigo){
        const dao = new AdministradorDao();
        const admin = await dao.buscarPorId(codigo);        
        const deletado = await dao.deletar(codigo);

        if(!deletado){
            return false;
        }

        FuncoesUtil.removerFoto(admin.foto_admin);

        return true;
    }

    /**
     * Atualiza um registro de administrador no banco de dados
     * @param {Array} admin 
     * @param {Number|} id 
     * @returns {boolean} true caso a operação tenha sido um sucesso.
     * false caso haja falha ao atualizar no banco de dados.
     * @throws {Error} Em caso de dados esperados não vierem no formato
     * correto
     */
    async atualizarAdministrador(admin, id){     
        this.validarDados(admin.email, admin.senha);
        
        const adminModel = new AdministradorModel(
            id,
            admin.nome,
            admin.email,
            admin.senha,
            admin.foto
        );

        const dao = new AdministradorDao();
        
        const dadosAntigos = await dao.buscarPorId(adminModel.codigo);
        const atualizado = await dao.atualizar(adminModel);
        
        if(!atualizado){
            FuncoesUtil.removerFoto(adminModel.foto);
        } else {
            FuncoesUtil.removerFoto(dadosAntigos.foto_admin)
        }

        return atualizado;
    }

    /**
     * Valida dados de email, senha e foto
     * @param {string} email email a ser inserido 
     * @param {string} senha senha a ser inserida
     * @param {string} foto caminho da imagem a ser inserida
     */
    validarDados(email, senha){
        if(this.emailInvalido(email)){
            throw Error("Email inválido");
        }

        if(this.senhaInvalida(senha)){
            throw Error("Senha possui mais que 18 caracteres");
        }
    }

    emailInvalido(email){
        if(!FuncoesUtil.emailValido(email)){
            return true;
        }
        return false;
    }

    senhaInvalida(senha){
        if(senha.length > 18){
            return true;
        }
        return false;
    }

    /**
     * 
     * @param {string} email 
     * @param {string} senha 
     */
    validaDadosLogin(email, senha){
        if(this.emailVazio(email)){
            throw new Error("Email deve estar preenchido!");
        }
        
        if(this.emailInvalido(email)){
            throw new Error("Email inválido!");
        }
        
        if(this.senhaVazia(senha)){
            throw new Error("Senha deve estar preenchida!");
        }
    }

    emailVazio(email){
        if(email || email !== ""){
            return false;
        }
        return true;
    }

    senhaVazia(senha){
        if(senha || senha !== ""){
            return false;
        }
        return true;
    }

    /**
     * 
     * @param {AdministradorModel} admin 
     * @param {string} email 
     * @param {string} senha 
     */
    dadosCorrespondem(admin,senha){
        if(!admin){
            return false;
        }

        if(senha !== admin.senha){
            return false;
        }

        return true;
    }
}


module.exports = { AdministradorService };