const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const timesRotas = require('./rotas/timesRotas');

const app = express();
const PORTA = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api', timesRotas);

// Inicializar o servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});