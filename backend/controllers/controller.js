let musics = [
  {
    id: 1,
    title: 'Imagine',
    artist: 'John Lennon',
    album: 'Imagine',
    year: 1971,
    genre: 'Rock',
    url: 'https://example.com/imagine.mp3'
  },
  {
    id: 2,
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    year: 1982,
    genre: 'Pop',
    url: 'https://example.com/billiejean.mp3'
  }
];

// Listar todas as músicas
exports.getAllMusics = (req, res) => {
  res.json(musics);
};

// Buscar música por ID
exports.getMusicById = (req, res) => {
  const id = parseInt(req.params.id);
  const music = musics.find(m => m.id === id);
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

  newMusic.id = musics.length ? musics[musics.length - 1].id + 1 : 1;
  musics.push(newMusic);
  res.status(201).json(newMusic);
};

// Atualizar música
exports.updateMusic = (req, res) => {
  const id = parseInt(req.params.id);
  const index = musics.findIndex(m => m.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Música não encontrada' });
  }

  const updatedMusic = { ...musics[index], ...req.body, id };
  musics[index] = updatedMusic;
  res.json(updatedMusic);
};

// Deletar música
exports.deleteMusic = (req, res) => {
  const id = parseInt(req.params.id);
  const index = musics.findIndex(m => m.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Música não encontrada' });
  }
  musics.splice(index, 1);
  res.json({ message: 'Música deletada com sucesso' });
};
