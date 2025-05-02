import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { registerRootComponent } from 'expo';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Foto */}
      <Image 
        source={require('./assets/thymos.jpeg')}  
        style={styles.image}
      />
      
      {/* Nome */}
      <Text style={styles.text}>Nome: Thymos Victor</Text>
      
      {/* Idade */}
      <Text style={styles.text}>Idade: 19 anos</Text>
      
      {/* Formação */}
      <Text style={styles.text}>Formação: Análise e Desenvolvimento de Sistemas</Text>
      
      {/* Experiência */}
      <Text style={styles.text}>Experiência: Estudante do 3º período de Análise e Desenvolvimento de Sistemas (ADS) 
      na faculdade SENAC em Recife, pelo programa Embarque Digital. </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
boldText: {
  fontWeight: 'bold',
},

});


registerRootComponent(App);
