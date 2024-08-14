import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { initializeApp } from 'firebase/app';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import  TelaEntrar  from './views/screens/TELA_ENTRAR';


const Stack = createNativeStackNavigator();

function App() {
  return (
  <NavigationContainer>
  <Stack.Navigator initialRouteName="ENTRAR">
  <Stack.Screen name="ENTRAR" component={TelaEntrar} />

  </Stack.Navigator>
  </NavigationContainer>
  );
 }
 export default App;
 