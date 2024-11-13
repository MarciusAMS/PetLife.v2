import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { styles } from '../../../styles';
import { auth } from '../../../firebaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomCarousel from '../../global/carousel';
import MenuGlobal from '../../global/menuGlobal';

export type RootStackParamList = {
    TelaLogin: undefined,
    telaEsqueciSenha: undefined,
    TelaInicio: undefined;
    TelaCadastroPet2: undefined;
  };
  
type TelaEntrarProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TelaInicio'>;
};

export default function TelaInicio({ navigation }: TelaEntrarProps) {
  const user = auth.currentUser;
  const userId = user?.uid;

  const OpenMapsButton = () => {
      const url = 'https://www.google.com/maps/search/?api=1&query=pet+shop+perto+de+mim';
      Linking.openURL(url)
        .catch((err) => console.error("Erro ao abrir o Google Maps", err));
    };

  const signOutUser = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem('userToken');
      console.log('Usuário deslogado.');
      navigation.navigate('TelaLogin');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInicioHorizontal}>
        <View style={styles.conteudoEsquerda}>
          <Image source={require('../../../assets/logo_facebook.png')} style={styles.imagensTopo} />
          <Text style={styles.nomeDoPet}>PetLife</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('TelaCadastroPet2')}>
          <Image source={require('../../../assets/Inicio-verPetsCadastrados.png')} style={styles.imagensTopo} />
        </TouchableOpacity>
      </View>

      
      <View style={{ marginTop: 130 }}> 
        <CustomCarousel />
      </View>

      {/* ARREDONDAR AS BORDAS DA IMAGEM DO PETSHOP PERTO DE VOCÊ!!!!! */}
      <TouchableOpacity onPress={OpenMapsButton} style={{position:'absolute', bottom: 110}}>
        <Image source={require('../../../assets/pertoDeVoce.png')}
         style={{ width: 700, height: 400, borderRadius:10, overflow: 'hidden'}}
         resizeMode='cover'
        />
      </TouchableOpacity>


     {/* <MenuGlobal /> */}
    </View>
  );
}
