import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StatusBar } from 'expo-status-bar';
// import { initializeApp } from 'firebase/app';
// import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import  telaEntrar  from './src/views/screens/TELA_ENTRAR';
import telaLogin from './src/views/screens/TELA_LOGIN';
import TelaCadastroPet from './src/views/screens/TELA_CADASTRO_PET';
import TelaCadastro from './src/views/TELA_CADASTRO';
import { themas } from './src/global/themes';
import GlobalFont from 'react-native-global-font';


const Stack = createNativeStackNavigator();

function App() {

  useEffect(() => {
    let fontName = themas.fonts.fontLetras2;  // Fonte definida no arquivo de temas
    GlobalFont.applyGlobal(fontName);        // Defina a fonte globalmente
  }, []);

  return (
    
    <NavigationContainer>
    <Stack.Navigator initialRouteName="TelaEntrar">
      <Stack.Screen name="TelaEntrar" component={telaEntrar} options={{ headerShown: false }} />
      <Stack.Screen name="TelaLogin" component={telaLogin} options={{ title: 'Login' }} />
      <Stack.Screen name="TelaCadastroPet" component={TelaCadastroPet} options={{ title: 'Cadastro de Pets' }} />
      <Stack.Screen name="TelaCadastro" component={TelaCadastro} options={{ title: 'Cadastro' }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
 }
 export default App;
 