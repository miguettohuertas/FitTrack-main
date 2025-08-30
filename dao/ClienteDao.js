const { conectarBD } = require("../database");
const { ClienteModel } = require("../model/ClienteModel");

class ClienteDao {

    /**
     * 
     * @param {ClienteModel} cliente 
     * @returns 
     */
    async deletar(cliente){
        const conexao = await conectarBD();
        const sql = 'DELETE FROM cliente WHERE cod_cli = ?';
        const [ resultado ] = await conexao.query(sql, [cliente.codigo]);
        conexao.end();

        return resultado.affectedRows > 0 ? true : false;
    }

    /**
     * Função que insere novo administrador no banco de dados
     * @param {ClienteModel} cliente 
     */
    async inserir(cliente){
        const conexao = await conectarBD();
        const sql = 'insert into cliente(nome_cli, email_cli, senha_cli, idade_cli, peso_cli, sexo_cli, foto_cli) values (?,?,?,?,?,?,?);';
        const [ resultado ] = await conexao.query(sql, cliente.toInsertArray());
        conexao.end();

        return resultado.insertId > 0 ? resultado.insertId : false;
    }

    /**
     * Função que consulta no banco de dados um cliente por email
     * @param {string} email 
     * @returns {Array<Object>|false} lista de dados de admin
     */
    async buscarPorEmail(email){
        const conexao = await conectarBD();
        const sql = "SELECT * FROM cliente WHERE email_cli = ?";
        const [ resultado ] = await conexao.query(sql, [email]);
        conexao.end();

        return resultado.length > 0 ? resultado : false;
    }

    /**
     * Função que busca todos os administradores registrados no banco de dados
     * @returns array
     */
    async listarTodos() {
        const conexao = await conectarBD();
        const sql = 'select * from cliente;';
        const [ resultado ] = await conexao.query(sql);
        conexao.end();
    
        return resultado;
    }
    
    /**
     * 
     * @param {ClienteModel} cliente 
     */
    async atualizar(cliente){
        const conexao = await conectarBD();
        const sql = 'update cliente set nome_cli = ?,email_cli = ?,senha_cli = ?,idade_cli = ?,peso_cli = ?,sexo_cli = ?,foto_cli = ? where cod_cli = ?;';

        const [ resultado ] = await conexao.query(sql, cliente.toUpdateArray());
        conexao.end();

        return resultado.affectedRows > 0 ? true : false;
    }

    async buscarPorId(id){
        const sql = 'SELECT * FROM cliente WHERE cod_cli = ?';
        const conexao = await conectarBD();
        const [ resultado ] = await conexao.query(sql, [id]);
        conexao.end();

        return resultado;
    }
}

module.exports = { ClienteDao };