const { ExercicioService } = require('../service/ExercicioService');
const service = new ExercicioService();
const multer = require('multer');
const upload = multer();

async function renderizarPagina(req, res) {
    try {
        const exercicios = await service.listarExercicios();

        res.render('admin/exercicios', {
            titulo: 'Gerenciar Exercícios',
            exercicios: exercicios
        });
    } catch (erro) {
        res.status(500).send("Erro ao carregar a página: " + erro.message);
    }
}

async function criarExercicio(req, res) {
    try {
        if (!global.emailAdmin) {
            return res.status(403).json({ mensagem: "Acesso negado. Faça login como administrador." });
        }

        const usuarioLogado = {
            email: global.emailAdmin,
            tipo: 'administrador'
        };

        const dadosExercicio = req.body;
        const exercicioCriado = await service.criarExercicio(dadosExercicio, usuarioLogado);

        res.status(201).json(exercicioCriado);

    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

async function alterarExercicio(req, res) {
    try {
        if (!global.emailAdmin) {
            return res.status(403).json({ mensagem: "Acesso negado." });
        }
        const { id } = req.params;
        const dadosExercicio = req.body;
        await service.editarExercicio(id, dadosExercicio);
        res.status(200).json({ mensagem: "Exercício alterado com sucesso!" });
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

async function excluirExercicio(req, res) {
    try {
        const { id } = req.params;
        
        if (!global.emailAdmin) {
            return res.status(403).json({ mensagem: "Acesso negado." });
        }

        const sucesso = await service.excluirExercicio(id);

        if (sucesso) {
            res.status(200).json({ mensagem: "Exercício excluído com sucesso!" });
        } else {
            res.status(404).json({ mensagem: "Exercício não encontrado." });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
}

module.exports = {
    renderizarPagina,
    criarExercicio: [upload.none(), criarExercicio],
    alterarExercicio: [upload.none(), alterarExercicio],
    excluirExercicio 
};