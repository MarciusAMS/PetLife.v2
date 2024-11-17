import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TelaInicio from '../views/screens/TELA_INICIO';
import TelaVacinacao from '../views/screens/TELA_VACINACAO';


export type RootTabParamList = {
  TelaInicio: undefined;
  TelaVacinacao: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const BottomTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string;
            switch (route.name) {
              case 'TelaInicio':
                iconName = 'home';
                break;
              case 'TelaVacinacao':
                iconName = 'paw';
                break;
              default:
                iconName = 'circle';
                break;
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ff6347',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#f9f1e7' },
          headerShown: false,
        })}
      >
        <Tab.Screen name="TelaInicio" component={TelaInicio} />
        <Tab.Screen name="TelaVacinacao" component={TelaVacinacao} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs;