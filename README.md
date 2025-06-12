# Trending Songs App

Um aplicativo de músicas feito em **React Native** com **Expo**, que exibe músicas populares, permite pesquisar músicas por nome e favoritar aquelas que você mais gosta.

## Como Rodar o App

### 1. Clone o projeto

```bash
git clone https://github.com/seuusuario/trending-songs-app.git
cd trending-songs-app
```

### 2. Instale as dependências

Certifique-se de que você tem o [Node.js](https://nodejs.org/), [npm](https://www.npmjs.com/) e [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) instalados:

```bash
npm install
npm install -g expo-cli
```

### 3. Configure o backend (API)

Se estiver usando uma **API local**, como `http://localhost:5000`, siga os passos:

```bash
cd backend
npm install
node index.js
```

Certifique-se de que o backend está rodando em `http://localhost:5000/api/musicas`.

> Obs: Se for testar no celular, substitua `"http://localhost:5000"` pelo seu **IP local da máquina**.

### 4. Rode o app mobile

Volte para a pasta do app (frontend):

```bash
cd ..
expo start
```

Escaneie o QR Code com o app **Expo Go** no seu celular para visualizar o app.

Feito por **Thymos Victor** 

