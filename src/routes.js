
const express = require('express');
const router = express.Router();

const usuario = require('./controllers/usuario');
const consumo = require('./controllers/consumo');

// Rotas de usuários
router.get('/usuarios', usuario.listar);
router.post('/usuarios', usuario.cadastrar);
router.put('/usuarios/:id', usuario.atualizar);
router.delete('/usuarios/:id', usuario.excluir);
router.post('/login', usuario.login);

// Rotas de consumo
router.get('/consumo', consumo.listar);
router.post('/consumo', consumo.cadastrar);
router.put('/consumo/:id', consumo.atualizar);
router.delete('/consumo/:id', consumo.excluir);
router.get('/consumo/resumo', consumo.resumo);

module.exports = router;