import React, { useState, useEffect } from 'react'; 
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';

const API_URL = 'https://verbose-giggle-wrvjjqwvg7472g9g-3000.app.github.dev';

export default function App() {
  const [tela, setTela] = useState('Home'); 
  const [musicas, setMusicas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tela === 'Musicas') {
      fetch(`${API_URL}/musicas`)
        .then(response => response.json())
        .then(data => setMusicas(data))
        .catch(error => console.error('Erro ao buscar músicas:', error));
    }
  }, [tela]);

  const buscarMusicas = (term) => {
    if (term.trim() === '') {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    fetch(`${API_URL}/musicas?nome_like=${term}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro na busca:', error);
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
    Alert.alert(
      'Confirmação',
      'Deseja limpar todos os favoritos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sim', onPress: () => setFavoritos([]) },
      ]
    );
  };

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
            autoCorrect={false}
            autoCapitalize="none"
          />

          {loading && <ActivityIndicator size="small" color="#D3E4B9" style={{ marginTop: 10 }} />}

          {!loading && searchTerm !== '' && (
            searchResults.length === 0 ? (
              <Text style={styles.text}>Nenhuma música encontrada.</Text>
            ) : (
              <FlatList
                data={searchResults}
                keyExtractor={item => item.id.toString()}
                style={{ marginTop: 10 }}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <Image source={{ uri: item.imagem }} style={styles.image} />
                    <Text style={styles.nome}>{item.nome}</Text>
                    <TouchableOpacity 
                      style={styles.btn}
                      onPress={() => adicionarFavorito(item)}
                    >
                      <Text style={styles.btnText}>⭐ Favoritar</Text>
                    </TouchableOpacity>
                  </View>
                )}
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
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image 
                  source={{ uri: item.imagem }} 
                  style={styles.image}
                />
                <Text style={styles.nome}>{item.nome}</Text>
                <TouchableOpacity 
                  style={styles.btn}
                  onPress={() => adicionarFavorito(item)}
                >
                  <Text style={styles.btnText}>⭐ Favoritar</Text>
                </TouchableOpacity>
              </View>
            )}
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
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Image 
                    source={{ uri: item.imagem }} 
                    style={styles.image}
                  />
                  <Text style={styles.nome}>{item.nome}</Text>
                </View>
              )}
            />
          )}
        </View>
      );
    }

    if (tela === 'Configuração') {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>⚙️ Configurações</Text>
          <Text style={styles.text}>
            Aqui você pode gerenciar as configurações do app.
          </Text>
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
    height: 60,
    backgroundColor: '#D3E4B9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 80,
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
  },
  homeText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    borderColor: '#D3E4B9',
    borderWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 10
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  btn: {
    backgroundColor: '#D3E4B9',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 15,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D3E4B9',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  navItem: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  text: {
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
  }
});




