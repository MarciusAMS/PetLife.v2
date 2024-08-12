import { getApp } from 'firebase/app';
import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { signIn } from '../../controllers/TELA_LOGIN';

export const TelaEntrar = () => {
  const handleSignIn = () => {
    signIn;
  };

  const handleSignUp = () => {
    
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('colocar logo aqui')} 
        style={styles.logo}
      />
      <Text style={styles.title}>PETLIFE</Text>
      <View style={styles.buttonContainer}>
        <Button title="ENTRE" onPress={handleSignIn} />
        <Text style={styles.orText}>ou</Text>
        <Button title="CADASTRE-SE" onPress={handleSignUp} />
      </View>
      <Text style={styles.socialText}>usando</Text>
      <View style={styles.socialIcons}>
        <Button title="f" onPress={() => console.log('Facebook login')} />
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

// export default TelaEntrar;
