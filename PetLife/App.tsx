import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { StatusBar } from 'expo-status-bar';
// import { initializeApp } from 'firebase/app';
// import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import telaEntrar from './src/views/screens/TELA_ENTRAR';
import telaLogin from './src/views/screens/TELA_LOGIN';
import telaEsqueciSenha from './src/views/screens/TELA_ESQUECI_SENHA';
import telaCadastro from './src/views/screens/TELA_CADASTRO';
import { themas } from './src/global/themes';
import GlobalFont from 'react-native-global-font';
import MenuGlobal from './src/global/menuGlobal';
import telaPet from './src/views/screens/TELA_PET';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {

  // function AppMenu() {
  //   return (
  //     <Tab.Navigator>
  //       <Tab.Screen name="telaPet" component={telaPet} options={{ title: 'Pet' }} />
  //       {/* Aqui você pode adicionar mais telas que devem aparecer com o Menu Global */}
  //     </Tab.Navigator>
  //   );
  // }

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
        <Stack.Screen name="TelaCadastro" component={telaCadastro} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="telaEsqueciSenha" component={telaEsqueciSenha} options={{ title: 'Esqueci a Senha' }} />
       <Stack.Screen name="telaPet" component={telaPet} options={{ title: 'Pet' }}/> 

        {/* Menu Global com as abas principais */}
        {/* <Stack.Screen name="AppMenu" component={AppMenu} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
