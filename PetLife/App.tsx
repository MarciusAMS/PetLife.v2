import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StatusBar } from 'expo-status-bar';
// import { initializeApp } from 'firebase/app';
// import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import TelaEntrar from './src/views/screens/TELA_ENTRAR';
import TelaLogin from './src/views/screens/TELA_LOGIN';
import TelaEsqueciSenha from './src/views/screens/TELA_ESQUECI_SENHA';
import TelaCadastro from './src/views/screens/TELA_CADASTRO';
import TelaPet from './src/views/screens/TELA_PET';
import { themas } from './src/global/themes';
import GlobalFont from 'react-native-global-font';
import MenuGlobal from './src/global/menuGlobal';
import TelaCadastroPet from './src/views/screens/TELA_CADASTRO_PET'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// function AppMenu() {
//   return (
//     <Tab.Navigator>
//       {/* Aqui você pode adicionar mais telas que devem aparecer com o Menu Global */}
//     </Tab.Navigator>
//   );
// }

export type AppRootParamList = {
  TelaPet: undefined;
  TelaCadastroPet: { userUID: string | undefined };
};


function App() {

  useEffect(() => {
    let fontName = themas.fonts.fontLetras2;  // Fonte definida no arquivo de temas
    GlobalFont.applyGlobal(fontName);        // Defina a fonte globalmente
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaEntrar">
        {/* Telas de autenticação que não devem exibir o Menu Global */}
        <Stack.Screen name="TelaEntrar" component={TelaEntrar} options={{ headerShown: false }} />
        <Stack.Screen name="TelaLogin" component={TelaLogin} options={{ title: 'Login' }} />
        <Stack.Screen name="TelaCadastro" component={TelaCadastro} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="TelaCadastroPet" component={(props) => <TelaCadastroPet {...props} />} options={{ title: 'Cadastro do pet' }} />
        <Stack.Screen name="telaEsqueciSenha" component={TelaEsqueciSenha} options={{ title: 'Esqueci a Senha' }} />
        <Stack.Screen name="TelaPet" component={TelaPet} options={{ title: 'Pet' }} />
        {/* Menu Global com as abas principais */}
        {/* <Stack.Screen name="AppMenu" component={AppMenu} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
