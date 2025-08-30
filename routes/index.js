const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { clienteLogado } = require('../middleware/usuario_logado');

const ClienteController = require('../controller/ClienteController');
const TreinoController = require('../controller/TreinoController');
const ComentarioController = require('../controller/ComentarioController');

router.get('/', ClienteController.renderizarLogin);
router.get('/perfil', clienteLogado, ClienteController.renderizarPerfil);
router.get('/treinos', TreinoController.listarTreinos);
router.get('/cadastro', ClienteController.renderizarCadastroCliente);
router.get('/dashboard', clienteLogado ,ClienteController.renderizarDashboard);
router.get('/logout', clienteLogado, ClienteController.logout);
router.get('/treino/:id', TreinoController.renderizarTreino);
router.get('/treino/:treino/assistir', clienteLogado, TreinoController.iniciarTreino);
router.get('/treino/:treinoId/iniciar-exercicio/:exercicioId', clienteLogado, TreinoController.iniciarExercicio)
router.get('/treino/:treinoId/assistir/:exercicioId', clienteLogado, TreinoController.renderizarTreinoComVideo)
router.get('/treino/:treinoId/finalizar-treino/:treinoMarcadoId', clienteLogado, TreinoController.finalizarTreino)
router.get('/video/stream')

router.post('/treino/:treinoId/finalizar-exercicio/:exercicioId', clienteLogado, TreinoController.finalizarExercicio)
router.post('/treino/:treino/comentario', ComentarioController.criarComentario);
router.post('/login', ClienteController.login);
router.post('/cadastrar', upload.single('foto'), ClienteController.cadastrarCliente);
router.post('/perfil/:id/editar', clienteLogado, upload.single('foto'), ClienteController.editarPerfil);

module.exports = router;