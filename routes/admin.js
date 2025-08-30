const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { adminLogado } = require('../middleware/usuario_logado');

const AdministradorController = require('../controller/AdministradorController');
const ClienteController = require('../controller/ClienteController');
const CategoriaController = require('../controller/CategoriaController');
const ExercicioController = require('../controller/ExercicioController');

// Módulo de administrador
router.get('/', AdministradorController.renderLogin);
router.get('/dashboard', adminLogado, AdministradorController.renderizarDashboard);
router.get('/administradores', adminLogado, AdministradorController.renderizarAdministradores);
router.get('/logout', adminLogado, AdministradorController.logout);
router.get('/categorias', CategoriaController.renderizarPagina);
router.get('/exercicios', ExercicioController.renderizarPagina);
router.post('/login', AdministradorController.autenticar);
router.post('/novoAdministrador', adminLogado, upload.single('foto'), AdministradorController.novoAdmin);
router.post('/categorias', CategoriaController.criarCategoria);
router.post('/exercicios', ExercicioController.criarExercicio);
router.put('/atualizarAdministrador/:id', adminLogado, upload.single('foto'), AdministradorController.atualizarAdministrador);
router.put('/categorias/:id', CategoriaController.alterarCategoria);
router.put('/exercicios/:id', ExercicioController.alterarExercicio);
router.delete('/exercicios/:id', ExercicioController.excluirExercicio);
router.delete('/deletarAdministrador/:id', adminLogado, AdministradorController.deletarAdministrador);
router.delete('/categorias/:id', CategoriaController.excluirCategoria);

//Módulo de cliente
router.get('/clientes', adminLogado, ClienteController.renderizarClientes);
router.post('/novoCliente', adminLogado, upload.single('foto'), ClienteController.cadastrarCliente);
router.put('/atualizarCliente/:id', adminLogado, upload.single('foto'), ClienteController.atualizarCliente);
router.delete('/deletarCliente/:id', adminLogado, ClienteController.deletarCliente);

module.exports = router;