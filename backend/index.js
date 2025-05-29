const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

// Habilita CORS
app.use(cors());

// Middleware para ler JSON no corpo de requisições (se quiser fazer POST futuramente)
app.use(express.json());

// Função para ler o db.json
function lerDatabase() {
  const dadosBrutos = fs.readFileSync('db.json');
  return JSON.parse(dadosBrutos);
}

// 🔍 Rota para buscar músicas (com ou sem filtro)
app.get('/musicas', (req, res) => {
  const { nome_like } = req.query;
  const db = lerDatabase();
  let resultado = db.musicas;

  if (nome_like) {
    resultado = resultado.filter(musica =>
      musica.nome.toLowerCase().includes(nome_like.toLowerCase())
    );
  }

  res.json(resultado);
});

// 🚀 Iniciar servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});


