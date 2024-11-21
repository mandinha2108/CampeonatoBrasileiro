const express = require('express');
const roteador = express.Router();
const timesControlador = require('../controladores/timesControladores');

roteador.get('/times', timesControlador.obterTodosTimes);

roteador.get('/times/:id', timesControlador.obterResumoTime);

module.exports = roteador;