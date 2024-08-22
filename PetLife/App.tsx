import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Carousel } from './views/screens/carousel/Tela_Inicio'; //   ESTA DANDO ERRO NESSA BCT DE IMPORTAR A PASTA DO CARROUSEL 


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Abra no seu aplicativo do EXPO GO</Text>
      <StatusBar style="auto" />
      <Carousel />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40, 
  },
});
