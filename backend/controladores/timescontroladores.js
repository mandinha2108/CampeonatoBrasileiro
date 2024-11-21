const bd = require('../modelos/bd');

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

exports.obterResumoTime = (req, res) => {
  const timeId = req.params.id; // ID do time recebido na URL

  const consulta = `
    SELECT 
      t.time_nome,
      COUNT(p.partida_id) AS total_partidas,
      SUM(CASE WHEN (p.time_c_id = ? AND p.time_c_gols > p.time_v_gols) OR 
                   (p.time_v_id = ? AND p.time_v_gols > p.time_c_gols) THEN 1 ELSE 0 END) AS total_vitorias,
      SUM(CASE WHEN p.time_c_gols = p.time_v_gols THEN 1 ELSE 0 END) AS total_empates,
      SUM(CASE WHEN (p.time_c_id = ? AND p.time_c_gols < p.time_v_gols) OR 
                   (p.time_v_id = ? AND p.time_v_gols < p.time_c_gols) THEN 1 ELSE 0 END) AS total_derrotas
    FROM times t
    LEFT JOIN partidas p ON t.time_id = p.time_c_id OR t.time_id = p.time_v_id
    WHERE t.time_id = ?;
  `;

  bd.query(consulta, [timeId, timeId, timeId, timeId, timeId], (erro, resultados) => {
    if (erro) {
      res.status(500).json({ erro: 'Erro ao buscar resumo do time' });
    } else {
      res.json(resultados[0]); // Retorna o primeiro resultado (resumo do time)
    }
  });
};
