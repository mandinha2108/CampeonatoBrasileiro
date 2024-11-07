const bd = require('../modelos/bd');

// Função para listar todos os times
exports.obterTodosTimes = (req, res) => {
  const consulta = 'SELECT * FROM times'; // Seleciona todos os times na tabela `times`
  bd.query(consulta, (erro, resultados) => {
    if (erro) {
      res.status(500).json({ erro: 'Erro ao buscar os times' });
    } else {
      res.json(resultados);
    }
  });
};