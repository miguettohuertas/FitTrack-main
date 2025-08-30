const { CategoriaService } = require('../service/CategoriaService');
const { ClienteService } = require('../service/ClienteService'); 
const { TreinoService } = require('../service/TreinoService');  

const clienteService = new ClienteService();
const treinoService = new TreinoService();
const categoriaService = new CategoriaService();
const clientService = new ClienteService();    

exports.editarPerfil = async function(req, res, next) {
    const {nome, email, senha, idade, peso, sexo, foto} = req.body;

    try{
        const cliente = await clientService.buscarPorEmail(global.emailCliente);
        await clienteService.atualizarPerfil(cliente, nome, email, senha, idade, peso, sexo, foto);
        
    }catch(erro){
        console.log(erro.message);
    } finally{
        res.redirect('/perfil');
    }
}

exports.logout = async function (req, res, next) {
    global.emailCliente = null;
    res.redirect('/');
}

exports.rendTeste = async function (req, res, next) {
    res.render('teste');
}

exports.deletarCliente = async function (req, res, next) {
    try{
        const id = req.params.id;
        const deletado = await clientService.deletarCliente(id);

        if (deletado) {
            return res.status(200).json({ sucesso: true, mensagem: "Administrador deletado com sucesso!"});
        } else {
            return res.status(400).json({ sucesso: false, mensagem: "Não foi possível deletar o cliente." });
        }

    }catch(erro){
        return res.status(500).json({ sucesso: false, mensagem: "Erro inesperado ao deletar cliente!", erro: erro.message });
    }
}

exports.cadastrarCliente = async function (req, res, next){
    try{
        let dados = req.body;
        
        if (req.file) {
            dados.foto = '/images/usuarios/' + req.file.filename; // caminho relativo público
        } else {
            dados.foto = '/images/assets/avatar.png';
        }

        const cliente = await clientService.novoCliente(dados);
        
        return res.status(201).json({ 
            sucesso: true, 
            mensagem: "Cadastro realizado com sucesso!", 
            cliente 
        });
    }catch(error){
        res.status(200).json({
            sucesso: false,
            mensagem: error.message
        });
    }
}

exports.renderizarDashboard = async function (req, res, next){  
    try{
        const cliente = await clienteService.buscarPorEmail(global.emailCliente);
        const treinos = await treinoService.listarTreinos();
        const categorias = await categoriaService.listarCategorias();
    
        res.render('dashboard', {
            titulo: "Cadastro",
            sucesso: null,
            message: null,
            cliente,
            treinos,
            categorias
        });
    } catch (error){
        res.json({error: error.message})
    }
}

exports.renderizarCadastroCliente = async function (req, res, next){    
    res.render('novo-cliente', { 
        titulo: "Cadastro",
        sucesso: null,
        message: null,
    });
}

exports.renderizarLogin = async function (req, res, next){
    res.render('index', { 
        titulo: "Login",
        sucesso: false,
        message: null,
    });
}

exports.renderizarPerfil = async function (req, res, next){
    try{
        const cliente = await clientService.buscarPorEmail(global.emailCliente);
        
        res.render('perfil', { 
            titulo: "Perfil",
            cliente
        });
    }catch(erro){

    }
}

exports.renderizarClientes = async function (req, res, next){
    const clientes = await clientService.listarTodos();

    res.render('admin/clientes', { titulo: "Clientes", clientes });
}

exports.login = async function (req, res, next) {
    const {email, senha} = req.body;

    try{
        const cliente = await clientService.autenticar(email, senha);

        if(!cliente){
            return res.status(300).json({
                sucesso: false,
                mensagem: "Email ou senha inválidos",
            })
        }

        global.emailCliente = cliente.email;

        res.send({
            sucesso: true,
            rota: '/dashboard'
        }).status(200);
    }catch(error){
        console.log(error);

        return res.status(400).json({
            sucesso: false,
            mensagem: error.message
        });
    } 
}

exports.atualizarCliente = async function (req, res, next){
    try{
        let dados = req.body;
        const id = req.params.id;

        if (req.file) {
            dados.foto = '/images/usuarios/' + req.file.filename; // caminho relativo público
        } else {
            dados.foto = '/images/assets/avatar.png';
        }
    
        const atualizado = await clientService.atualizarCliente(dados, id);

        if (atualizado) {
            return res.status(200).json({sucesso: true, mensagem: "Administrador atualizado com sucesso!" });
        } else {
            return res.status(400).json({ sucesso: false, mensagem: "Não foi possível atualizar o administrador." });
        }

    }catch(erro){
        console.log(erro);
        return res.status(500).json({ sucesso: false, mensagem: "Erro inesperado ao atualzar registro", erro: erro.message});
    }
}