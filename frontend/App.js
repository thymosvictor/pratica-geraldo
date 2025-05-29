import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, Image, TouchableOpacity, 
  StyleSheet, TextInput, ActivityIndicator, Alert 
} from 'react-native';

import imagine from './assets/thymos.jpeg';
import heyjude from './assets/splash-icon.png'
import padrao from './assets/favicon.png'

// ⚠️ Troque localhost pelo IP da sua máquina se estiver no celular
const API_URL = 'http://localhost:5000/api/musicas';

export default function App() {
  const [tela, setTela] = useState('Home');
  const [musicas, setMusicas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const imageMap = {
  'thymos.jpeg': imagine,
  'splash-icon.png': heyjude,
  'favicon.png': padrao,
};

  useEffect(() => {
    if (tela === 'Musicas') {
      fetch(`${API_URL}`)
        .then(res => res.json())
        .then(data => setMusicas(data))
        .catch(err => console.error('Erro ao carregar músicas:', err));
    }
  }, [tela]);

  const buscarMusicas = (termo) => {
    if (termo.trim() === '') {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    fetch(`${API_URL}/buscar?nome=${termo}`)
      .then(res => res.json())
      .then(data => {
        setSearchResults(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro na busca:', err);
        setSearchResults([]);
        setLoading(false);
      });
  };

  const onChangeSearch = (text) => {
    setSearchTerm(text);
    buscarMusicas(text);
  };

  const adicionarFavorito = (musica) => {
    if (!favoritos.find(item => item.id === musica.id)) {
      setFavoritos([...favoritos, musica]);
    }
  };

  const limparFavoritos = () => {
    Alert.alert('Confirmação', 'Deseja limpar todos os favoritos?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sim', onPress: () => setFavoritos([]) },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image 
        source={imageMap[item.image] || padrao} 
        style={styles.image} 
      />
      <Text style={styles.nome}>{item.title}</Text>
      <Text>{item.artist}</Text>
      <TouchableOpacity 
        style={styles.btn}
        onPress={() => adicionarFavorito(item)}
      >
        <Text style={styles.btnText}>⭐ Favoritar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTela = () => {
    if (tela === 'Home') {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.homeText}>Bem-vindo ao app Trending Songs!</Text>

          <TextInput 
            style={styles.searchInput}
            placeholder="Pesquisar música..."
            value={searchTerm}
            onChangeText={onChangeSearch}
          />

          {loading && <ActivityIndicator size="small" color="#D3E4B9" style={{ marginTop: 10 }} />}

          {!loading && searchTerm !== '' && (
            searchResults.length === 0 ? (
              <Text style={styles.text}>Nenhuma música encontrada.</Text>
            ) : (
              <FlatList
                data={searchResults}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
              />
            )
          )}
        </View>
      );
    }

    if (tela === 'Musicas') {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>🎧 Lista de Músicas</Text>
          <FlatList
            data={musicas}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
      );
    }

    if (tela === 'Favoritos') {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>⭐ Meus Favoritos</Text>
          {favoritos.length === 0 ? (
            <Text style={styles.text}>Nenhuma música favorita.</Text>
          ) : (
            <FlatList
              data={favoritos}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
            />
          )}
        </View>
      );
    }

    if (tela === 'Configuração') {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>⚙️ Configurações</Text>
          <Text style={styles.text}>Aqui você pode limpar seus favoritos.</Text>
          <TouchableOpacity style={styles.btn} onPress={limparFavoritos}>
            <Text style={styles.btnText}>Limpar Favoritos</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trending Songs</Text>
      </View>

      {renderTela()}

      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setTela('Home')}>
          <Text style={styles.navItem}>🏠 Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTela('Musicas')}>
          <Text style={styles.navItem}>🎵 Músicas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTela('Favoritos')}>
          <Text style={styles.navItem}>⭐ Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTela('Configuração')}>
          <Text style={styles.navItem}>⚙️ Configuração</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#D3E4B9',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D3E4B9',
    paddingVertical: 10,
  },
  navItem: {
    fontSize: 16,
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  homeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#F0F4EF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  btn: {
    backgroundColor: '#A3C9A8',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
