import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { signIn } from '../../controllers/TELA_LOGIN';

export default function TelaEntrar(){
  const handleSignIn = () => {
    signIn;
  };

  const handleSignUp = () => {
    // Finalizar Cadastro chamado
  };

  return (
    <View style={styles.container}>
      <Text style={styles.centeredText}>Bem-vindo ao PetLife!</Text>
      <Image
        source={require('../logos/log_ENTRAR')} 
        style={styles.logo}
      />
      <Text style={styles.title}>PetLife</Text>
      <View style={styles.buttonContainer}>
        <Button title="ENTRE" onPress={handleSignIn} />
        <Text style={styles.orText}>ou</Text>
        <Button title="CADASTRE-SE" onPress={handleSignUp} />
      </View>
      <Text style={styles.socialText}>Usando</Text>
      <View style={styles.socialIcons}>
        <Button title="F" onPress={() => console.log('Facebook login')} />
        <Button title="G" onPress={() => console.log('Google login')} />   
        <Button title="M" onPress={() => console.log('Microsoft login')} />  
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  centeredText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center', // Garante que o texto seja centralizado
    color: '#333',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20,
  },
  orText: {
    alignSelf: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
  socialText: {
    fontSize: 16,
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '60%',
  }
});
