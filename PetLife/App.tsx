import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { initializeApp } from 'firebase/app';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import  telaEntrar  from './views/screens/TELA_ENTRAR';
import telaLogin from './views/screens/TELA_LOGIN';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="TelaEntrar">
      <Stack.Screen name="TelaEntrar" component={telaEntrar} options={{ headerShown: false }} />
      <Stack.Screen name="TelaLogin" component={telaLogin} options={{ title: 'Login' }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
 }
 export default App;
 