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
import AppMenu from './src/global/menuGlobal';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
<<<<<<< Updated upstream
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
=======
import { PetProvider } from "./src/contextos/PetContext";
import { Icon } from 'react-native-elements';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
>>>>>>> Stashed changes


export type AppRootParamList = {
  TelaEntrar: undefined;
  TelaLogin: undefined;
  TelaCadastro: undefined;
  TelaCadastroPet: undefined;
  TelaCadastroPet2: undefined; 
  telaEsqueciSenha: undefined;
  TelaPet: undefined;
  TelaVacinacao: undefined;
};

<<<<<<< Updated upstream
=======
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppMenu({ route }) {
  const { pet } = route.params; // Pegando os parâmetros da navegação para o AppMenu

  return (
    <Tab.Navigator
      initialRouteName="TelaInicio"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: themas.colors.background, // Cor de fundo parecida com a da imagem
          borderTopWidth: 4, // Remove a borda superior
          borderTopColor: '#D2A24C',
          height: 70, // Ajusta a altura
        },
        tabBarLabelStyle: {
          fontSize: 20,
          fontFamily: themas.fonts.fontLetras,
          fontWeight: 'bold',
          color: '#000', // Cor do texto
        },
        tabBarActiveTintColor: '#000', // Cor para a aba ativa
        tabBarInactiveTintColor: '#444', // Cor para abas inativas
        tabBarIconStyle: {
          marginTop: 5, // Ajusta o espaçamento dos ícones
        },
      }}
    >
      {/* Tela Início */}
      <Tab.Screen
        name="TelaInicio"
        options={{
          headerShown: false,
          tabBarLabel: 'inicio',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={require('./asset')}
            />
            // <Icon name="home" color={color} size={36} />
          ),
        }}
      >
        {() => <TelaInicio pet={pet} />}
      </Tab.Screen>

      {/* Tela Saude */}
      <Tab.Screen
        name="TelaSaude"
        options={{
          headerShown: false,
          tabBarLabel: 'saude',
          tabBarIcon: ({ color, size }) => (
            <Icon name="hospital" color={color} size={36} />
          ),
        }}
      >
        {() => <TelaSaude pet={pet} />}
      </Tab.Screen>

      {/* Tela Vacinação */}
      <Tab.Screen
        name="TelaVacinacao"
        options={{
          headerShown: false,
          tabBarLabel: 'vacinação',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={36} />
          ),
        }}
      >
        {() => <TelaVacinacao pet={pet} />}
      </Tab.Screen>

      {/* Tela Anotações */}
      <Tab.Screen
        name="TelaDiario"
        options={{
          headerShown: false,
          tabBarLabel: 'diário',
          tabBarIcon: ({ color, size }) => (
            <Icon name="diary" color={color} size={36} />
          ),
        }}
      >
        {() => <TelaDiario pet={pet} />}
      </Tab.Screen>
    </Tab.Navigator >
  );
}

// export type AppRootParamList = {
//   TelaEntrar: undefined;
//   TelaLogin: undefined;
//   TelaCadastro: undefined;
//   TelaCadastroPet: undefined;
//   TelaCadastroPet2: undefined;
//   telaEsqueciSenha: undefined;
//   TelaPet: undefined;
//   TelaVacinacao: string | undefined;
// };
>>>>>>> Stashed changes

function App() {

  useEffect(() => {
    let fontName = themas.fonts.fontLetras2;  // Fonte definida no arquivo de temas
    GlobalFont.applyGlobal(fontName);        // Defina a fonte globalmente
  }, []);

  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaEntrar">

<<<<<<< Updated upstream
        {/* Telas de autenticação que não devem exibir o Menu Global */}
        <Stack.Screen name="TelaEntrar" component={TelaEntrar} options={{ headerShown: false }} />
        <Stack.Screen name="TelaLogin" component={TelaLogin} options={{ title: 'Login' }} />
        <Stack.Screen name="TelaCadastro" component={TelaCadastro} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="TelaCadastroPet" component={TelaCadastroPet} options={{ title: 'Cadastro do pet' }} />
        <Stack.Screen name="TelaInicio" component={TelaInicio} options={{ title: 'Tela Inicial' }} />
        <Stack.Screen name="TelaCadastroPet2" component={TelaCadastroPet2} options={{ title: 'Cadastro do pet' }} />
        <Stack.Screen name="telaEsqueciSenha" component={TelaEsqueciSenha} options={{ title: 'Esqueci a Senha' }} />
        <Stack.Screen name="TelaPet" component={TelaPet} options={{ title: 'Pet' }} />
=======
            {/* Telas de autenticação que não devem exibir o Menu Global */}
            <Stack.Screen name="TelaEntrar" component={TelaEntrar} options={{ headerShown: false }} />
            <Stack.Screen name="TelaLogin" component={TelaLogin} options={{ title: 'Login' }} />
            <Stack.Screen name="TelaCadastro" component={TelaCadastro} options={{ title: 'Cadastro' }} />
            <Stack.Screen name="TelaCadastroPet" component={TelaCadastroPet} options={{ title: 'Cadastro do pet' }} />
            <Stack.Screen name="TelaCadastroPet2" component={TelaCadastroPet2} options={{ title: 'Cadastro do pet' }} />
            <Stack.Screen name="telaEsqueciSenha" component={TelaEsqueciSenha} options={{ title: 'Esqueci a Senha' }} />
            <Stack.Screen name="TelaPet" component={TelaPet} options={{ title: 'Pet' }} />
            {/* <Stack.Screen name="TelaDiario" component={TelaDiario} options={{ title: 'Tela Diário' }} /> */}
            <Stack.Screen name="TelaEditarNota" component={TelaEditarNota} options={{ title: 'Voltar' }} />
            <Stack.Screen name="TelaRemedio" component={TelaRemedio} options={{ title: 'Voltar' }} />
>>>>>>> Stashed changes

        {/* Menu Global com as abas principais */}
        <Stack.Screen name="AppMenu" component={AppMenu} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
