import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StatusBar } from 'expo-status-bar';
// import { initializeApp } from 'firebase/app';
// import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import telaEntrar from './src/views/screens/TELA_ENTRAR';
import telaLogin from './src/views/screens/TELA_LOGIN';
import telaEsqueciSenha from './src/views/screens/TELA_ESQUECI_SENHA';
import TelaCadastro from './src/views/screens/TELA_CADASTRO';
import { themas } from './src/global/themes';
import GlobalFont from 'react-native-global-font';
import MenuGlobal from './src/global/menuGlobal';
import TelaCadastroPet from './src/views/screens/TELA_CADASTRO_PET'

const Stack = createNativeStackNavigator();

function App() {

  useEffect(() => {
    let fontName = themas.fonts.fontLetras2;  // Fonte definida no arquivo de temas
    GlobalFont.applyGlobal(fontName);        // Defina a fonte globalmente
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaEntrar">
        {/* Telas de autenticação que não devem exibir o Menu Global */}
        <Stack.Screen name="TelaEntrar" component={telaEntrar} options={{ headerShown: false }} />
        <Stack.Screen name="TelaLogin" component={telaLogin} options={{ title: 'Login' }} />
        <Stack.Screen name="TelaCadastro" component={TelaCadastro} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="TelaCadastroPet" component={TelaCadastroPet} options={{ title: 'Cadastro do pet' }} />
        <Stack.Screen name="telaEsqueciSenha" component={telaEsqueciSenha} options={{ title: 'Esqueci a Senha' }} />

        {/* Menu Global com as abas principais */}
        <Stack.Screen name="MainApp" component={MenuGlobal} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
