import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TelaPet from '../views/screens/TELA_ESQUECI_SENHA';  // Exemplo de uma tela
import TelaPerfil from '../views/screens/TELA_LOGIN';  // Exemplo de outra tela
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

export default function MenuGlobal() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000', // Cor do ícone ativo
        tabBarInactiveTintColor: '#aaa', // Cor do ícone inativo
        tabBarStyle: { backgroundColor: '#f2c2a2' }, // Personalize a cor de fundo
      }}
    >
      <Tab.Screen 
        name="Início" 
        component={TelaPet} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Saúde" 
        component={TelaPerfil} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heartbeat" color={color} size={size} />
          ),
        }}
      />
      {/* Adicione mais telas conforme necessário */}
    </Tab.Navigator>
  );
}
