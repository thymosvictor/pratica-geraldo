let musicas = [
  {
    id: 1,
    title: 'Dellarte',
    artist: 'Bea Duarte',
    album: 'Dellarte',
    year: 2025,
    genre: 'Pop',
    "image": "Dellarte.jpg"
  },
  {
    id: 2,
    title: 'Pacto',
    artist: 'Bea Duarte',
    album: 'Dellarte',
    year: 2025,
    genre: 'Pop',
    "image": "Pacto.jpg"
  },
  {
    id: 3,
    title: 'Máscaras',
    artist: 'Bea Duarte',
    album: 'Dellarte',
    year: 2025,
    genre: 'Pop',
    "image": "Mascaras.jpeg"
  },
  {
    id: 4,
    title: 'Mensagem',
    artist: 'Bea Duarte',
    album: 'Dellarte',
    year: 2025,
    genre: 'Pop',
    "Image": "Mensagem.webp"
  },
  {
    id: 5,
    title: 'Bruxa',
    artist: 'Bea Duarte',
    album: 'Dellarte',
    year: 2025,
    genre: 'Pop',
    "imagem": "Bruxa.jpg"
  }
];

// Listar todas as músicas
exports.getAllMusics = (req, res) => {
  res.json(musicas);
};

exports.buscarMusicas = (req, res) => {
  const nomeBusca = req.query.nome?.toLowerCase() || '';

  const resultado = musicas.filter(musica => 
    musica.title.toLowerCase().includes(nomeBusca)
  );

  res.json(resultado);
};


// Buscar música por ID
exports.getMusicById = (req, res) => {
  const id = parseInt(req.params.id);
  const music = musicas.find(m => m.id === id);
  if (!music) {
    return res.status(404).json({ message: 'Música não encontrada' });
  }
  res.json(music);
};

// Criar nova música
exports.createMusic = (req, res) => {
  const newMusic = req.body;
  if (!newMusic.title || !newMusic.artist) {
    return res.status(400).json({ message: 'Título e artista são obrigatórios' });
  }

  newMusic.id = musicas.length ? musicas[musicas.length - 1].id + 1 : 1;
  musicas.push(newMusic);
  res.status(201).json(newMusic);
};

// Atualizar música
exports.updateMusic = (req, res) => {
  const id = parseInt(req.params.id);
  const index = musicas.findIndex(m => m.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Música não encontrada' });
  }

  const updatedMusic = { ...musicas[index], ...req.body, id };
  musicas[index] = updatedMusic;
  res.json(updatedMusic);
};

// Deletar música
exports.deleteMusic = (req, res) => {
  const id = parseInt(req.params.id);
  const index = musicas.findIndex(m => m.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Música não encontrada' });
  }
  musicas.splice(index, 1);
  res.json({ message: 'Música deletada com sucesso' });
};
