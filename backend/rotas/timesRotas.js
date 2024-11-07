const express = require('express');
const roteador = express.Router();
const timesControlador = require('../controladores/timesControlador');

// Rota para listar todos os times
roteador.get('/times', timesControlador.obterTodosTimes);

module.exports = roteador;