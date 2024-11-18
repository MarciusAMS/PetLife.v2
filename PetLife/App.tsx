import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaEntrar from './src/views/screens/TELA_ENTRAR';
import TelaLogin from './src/views/screens/TELA_LOGIN';
import TelaEsqueciSenha from './src/views/screens/TELA_ESQUECI_SENHA';
import TelaCadastro from './src/views/screens/TELA_CADASTRO';
import TelaInicio from './src/views/screens/TELA_INICIO';
import TelaCadastroPet from './src/views/screens/TELA_CADASTRO_PET'
import TelaCadastroPet2 from './src/views/screens/TELA_CADASTRO_PET2';
import TelaPet from './src/views/screens/TELA_PET';
import TelaVacinacao from './src/views/screens/TELA_VACINACAO';
import { themas } from './src/global/themes';
import GlobalFont from 'react-native-global-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TelaDiario from './src/views/screens/TELA_DIARIO';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppMenu() {
  return (
    <Tab.Navigator>
      {/* Aqui você pode adicionar mais telas que devem aparecer com o Menu Global */}
      <Tab.Screen name="TelaInicio" component={TelaInicio} options={{ title: 'Tela Inicial' }} />
      <Tab.Screen name='TelaVacinacao' component={TelaVacinacao} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export type AppRootParamList = {
  TelaEntrar: undefined;
  TelaLogin: undefined;
  TelaCadastro: undefined;
  TelaCadastroPet: undefined;
  TelaCadastroPet2: undefined; 
  telaEsqueciSenha: undefined;
  TelaPet: undefined;
  TelaVacinacao: undefined;
  TelaDiario: undefined;
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
        <Stack.Screen name="TelaCadastroPet" component={TelaCadastroPet} options={{ title: 'Cadastro do pet' }} />
        <Stack.Screen name="TelaInicio" component={TelaInicio} options={{ title: 'Tela Inicial' }} />
        <Stack.Screen name="TelaCadastroPet2" component={TelaCadastroPet2} options={{ title: 'Cadastro do pet' }} />
        <Stack.Screen name="telaEsqueciSenha" component={TelaEsqueciSenha} options={{ title: 'Esqueci a Senha' }} />
        <Stack.Screen name="TelaPet" component={TelaPet} options={{ title: 'Pet' }} />
        <Stack.Screen name="TelaDiario" component={TelaDiario} options={{ title: 'Tela Diario' }} />
        {/* Menu Global com as abas principais */}
        <Stack.Screen name="AppMenu" component={AppMenu} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
