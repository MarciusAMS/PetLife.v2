import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaEntrar from './src/views/screens/TELA_ENTRAR';
import TelaLogin from './src/views/screens/TELA_LOGIN';
import TelaEsqueciSenha from './src/views/screens/TELA_ESQUECI_SENHA';
import TelaCadastro from './src/views/screens/TELA_CADASTRO';
import TelaInicio from './src/views/screens/TELA_INICIO';
import TelaCadastroPet from './src/views/screens/TELA_CADASTRO_PET';
import TelaCadastroPet2 from './src/views/screens/TELA_CADASTRO_PET2';
import TelaPet from './src/views/screens/TELA_PET';
import TelaVacinacao from './src/views/screens/TELA_VACINACAO';
import TelaSaude from './src/views/screens/TELA_SAUDE';
import TelaDiario from './src/views/screens/TELA_DIARIO';
import TelaEditarNota from './src/views/screens/TELA_EDITAR_NOTA';
import TelaRemedio from './src/views/screens/TELA_REMEDIO'
import { themas } from './src/global/themes';
import GlobalFont from 'react-native-global-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PetProvider } from "./src/contextos/PetContext";
import { Icon } from 'react-native-elements';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Image, Text } from 'react-native';



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
          color: '#000',
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#444',
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      {/* Tela inicio */}
      <Tab.Screen
        name="TelaInicio"
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 20, // Tamanho do texto
                fontWeight: focused ? 'bold' : 'normal', // Negrito se selecionado
                color: focused ? '#000' : '#aaa', // Cor diferente para selecionado e não-selecionado
              }}
            >
              Inicio
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Image
              source={require('./assets/homePet.png')}
              style={{
                width: 36,
                height: 36,
                tintColor: color, // Aplica a cor baseada no estado (ativo/inativo)
              }}
              resizeMode="contain"
            />
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
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 20, // Tamanho do texto
                fontWeight: focused ? 'bold' : 'normal', // Negrito se selecionado
                color: focused ? '#000' : '#aaa', // Cor diferente para selecionado e não-selecionado
              }}
            >
              Saúde
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Image
              source={require('./assets/saudePet.png')}
              style={{
                width: 36,
                height: 36,
                tintColor: color, // Aplica a cor baseada no estado (ativo/inativo)
              }}
              resizeMode="contain"
            />
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
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 20, // Tamanho do texto
                fontWeight: focused ? 'bold' : 'normal', // Negrito se selecionado
                color: focused ? '#000' : '#aaa', // Cor diferente para selecionado e não-selecionado
              }}
            >
              Vacinação
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Image
              source={require('./assets/vacinaPet.png')}
              style={{
                width: 36,
                height: 36,
                tintColor: color, // Aplica a cor baseada no estado (ativo/inativo)
              }}
              resizeMode="contain"
            />
          ),
        }}
      >
        {() => <TelaVacinacao pet={pet} />}
      </Tab.Screen>

      {/* Tela Anotação */}
      <Tab.Screen
        name="TelaDiario"
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 20, // Tamanho do texto
                fontWeight: focused ? 'bold' : 'normal', // Negrito se selecionado
                color: focused ? '#000' : '#aaa', // Cor diferente para selecionado e não-selecionado
              }}
            >
              Diário
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Image
              source={require('./assets/diarioPet.png')}
              style={{
                width: 36,
                height: 36,
                tintColor: color, // Aplica a cor baseada no estado (ativo/inativo)
              }}
              resizeMode="contain"
            />
          ),
        }}
      >
        {() => <TelaDiario pet={pet} />}
      </Tab.Screen>
    </Tab.Navigator >
  );
}

function App() {
  useEffect(() => {
    let fontName = themas.fonts.fontLetras2; // Fonte definida no arquivo de temas
    GlobalFont.applyGlobal(fontName); // Defina a fonte globalmente
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PetProvider> {/* Envolvendo a aplicação com PetProvider */}
        <NavigationContainer>
          <Stack.Navigator initialRouteName="TelaEntrar">

            {/* Telas de autenticação que não devem exibir o Menu Global */}
            <Stack.Screen name="TelaEntrar" component={TelaEntrar} options={{ headerShown: false }} />
            <Stack.Screen name="TelaLogin" component={TelaLogin} options={{ title: 'Login' }} />
            <Stack.Screen name="TelaCadastro" component={TelaCadastro} options={{ title: 'Cadastro' }} />
            <Stack.Screen name="TelaCadastroPet" component={TelaCadastroPet} options={{ title: 'Cadastro do pet' }} />
            <Stack.Screen name="TelaCadastroPet2" component={TelaCadastroPet2} options={{ title: 'Cadastro do pet' }} />
            <Stack.Screen name="telaEsqueciSenha" component={TelaEsqueciSenha} options={{ title: 'Esqueci a Senha' }} />
            <Stack.Screen name="TelaPet" component={TelaPet} options={{ title: 'Pet' }} />
            <Stack.Screen name="TelaEditarNota" component={TelaEditarNota} options={{ title: 'Voltar' }} />
            <Stack.Screen name="TelaRemedio" component={TelaRemedio} options={{ title: 'Voltar' }} />
            {/* <Stack.Screen name='TelaInicio' component={TelaInicio} options={{ headerShown: false }} /> */}

            {/* Menu Global com as abas principais */}
            <Stack.Screen name="AppMenu" component={AppMenu} options={{ headerShown: false }} />

          </Stack.Navigator>
        </NavigationContainer>
      </PetProvider>
    </GestureHandlerRootView>
  );
}

export default App;
