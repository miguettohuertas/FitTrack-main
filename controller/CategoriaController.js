const { CategoriaService } = require('../service/CategoriaService');
const service = new CategoriaService();

async function renderizarPagina(req, res) {
    try {
        const categorias = await service.listarCategorias();
        res.render('admin/categorias', {
            titulo: 'Gerenciar Categorias',
            categorias: categorias
        });
    } catch (erro) {
        res.status(500).send("Erro ao carregar a página: " + erro.message);
    }
}

async function criarCategoria(req, res) {
    try {
        const { titulo } = req.body;
        const categoria = await service.criarCategoria(titulo);
        res.status(201).json(categoria);
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

async function alterarCategoria(req, res) {
    try {
        const { id } = req.params;
        const { titulo } = req.body;
        await service.editarCategoria(titulo, id);
        res.status(200).json({ mensagem: "Categoria alterada com sucesso!" });
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

async function excluirCategoria(req, res) {
    try {
        const { id } = req.params;
        
        const sucesso = await service.excluirCategoria(id);

        if (sucesso) {
            res.status(200).json({ mensagem: "Categoria excluída com sucesso!" });
        } else {
            res.status(404).json({ mensagem: "Categoria não encontrada." });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
}

module.exports = {
    renderizarPagina,
    criarCategoria,
    alterarCategoria,
    excluirCategoria
};