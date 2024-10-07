import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TelaPet from '../views/screens/TELA_PET';
import TelaPerfil from '../views/screens/TELA_LOGIN';
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
        name="Inicio" 
        component={TelaPet} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="font-awesome" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen 
        name="Saúde" 
        component={TelaPet} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heartbeat" type="font-awesome" color={color} size={size} />
          ),
        }}
      /> */}
      {/* Adicione mais telas conforme necessário */}
    </Tab.Navigator>
  );
}
