import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
  StyleSheet, TextInput, ActivityIndicator, ScrollView
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import Dellarte from './assets/Dellarte.jpg';
import Pacto from './assets/Pacto.jpg';
import Máscaras from './assets/Mascaras.jpeg';
import Mensagem from './assets/Mensagem.webp';
import Bruxa from './assets/Bruxa.jpg';

const API_URL = 'http://localhost:5000/api/musicas';

export default function App() {
  const [tela, setTela] = useState('Home');
  const [musicas, setMusicas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const imageMap = {
    'Dellarte.jpg': Dellarte,
    'Pacto.jpg': Pacto,
    'Mascaras.jpeg': Máscaras,
    'Mensagem.webp': Mensagem,
    'Bruxa.jpg': Bruxa,
  };

  useEffect(() => {
    fetch(`${API_URL}`)
      .then(res => res.json())
      .then(data => setMusicas(data))
      .catch(err => console.error('Erro ao carregar músicas:', err));
  }, []);

  const buscarMusicas = () => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    fetch(`${API_URL}/buscar?nome=${searchTerm}`)
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

  const adicionarFavorito = (musica) => {
    if (!favoritos.find(item => item.id === musica.id)) {
      setFavoritos([...favoritos, musica]);
    }
  };

  const removerFavorito = (id) => {
    setFavoritos(favoritos.filter(item => item.id !== id));
  };

  const renderItem = ({ item }, isFavorito = false) => (
    <View style={styles.card}>
      <Image source={imageMap[item.image] || Dellarte} style={styles.image} />
      <Text style={styles.nome}>{item.title}</Text>
      <Text>{item.artist}</Text>
      {isFavorito ? (
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#cc0000' }]}
          onPress={() => removerFavorito(item.id)}
        >
          <Text style={styles.btnText}>Remover</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.btn} onPress={() => adicionarFavorito(item)}>
          <Text style={styles.btnText}>Favoritar</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderTrending = () => (
    <View>
      <Text style={styles.trendingTitle}>TOP TRENDING DA SEMANA</Text>
      <FlatList
        data={musicas.slice(0, 3)}
        keyExtractor={item => item.id.toString()}
        renderItem={(props) => renderItem(props)}
      />
    </View>
  );

  const renderTela = () => {
    if (tela === 'Home') {
      return (
        <ScrollView style={styles.contentContainer}>
          {/* CAMPO DE BUSCA NO TOPO */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar música..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            {searchResults.length > 0 && (
              <TouchableOpacity onPress={() => {
                setSearchTerm('');
                setSearchResults([]);
              }}>
                <Ionicons name="close-circle" size={24} color="#cc0000" style={styles.clearIcon} />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={buscarMusicas}>
            <Text style={styles.btnText}>Pesquisar</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="small" color="#A3C9A8" style={{ marginTop: 10 }} />}

          {/* RESULTADOS DA BUSCA OU TRENDING */}
          {searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              keyExtractor={item => item.id.toString()}
              renderItem={(props) => renderItem(props)}
            />
          ) : renderTrending()}
        </ScrollView>
      );
    }

    if (tela === 'Musicas') {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Lista de Músicas</Text>
          <FlatList
            data={musicas}
            keyExtractor={item => item.id.toString()}
            renderItem={(props) => renderItem(props)}
          />
        </View>
      );
    }

    if (tela === 'Favoritos') {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Meus Favoritos</Text>
          {favoritos.length === 0 ? (
            <Text style={styles.text}>Nenhuma música favorita.</Text>
          ) : (
            <FlatList
              data={favoritos}
              keyExtractor={item => item.id.toString()}
              renderItem={(props) => renderItem(props, true)}
            />
          )}
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
          <Ionicons name="home" size={28} color={tela === 'Home' ? '#333' : '#aaa'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTela('Musicas')}>
          <FontAwesome5 name="music" size={24} color={tela === 'Musicas' ? '#333' : '#aaa'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTela('Favoritos')}>
          <MaterialIcons name="favorite" size={28} color={tela === 'Favoritos' ? '#cc0000' : '#aaa'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#A3C9A8',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D3E4B9',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  trendingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
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
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
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
    marginTop: 5,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#fff',
    width: '20%',
  },
  searchButton: {
    backgroundColor: '#87b08c',
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'center',
    width: '10%',
  },
  clearIcon: {
    marginLeft: 8,
  },
});
