import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles';
import { auth } from '../../../firebaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomCarousel from '../../global/carousel';

export type RootStackParamList = {
    TelaLogin: undefined,
    telaEsqueciSenha: undefined,
    TelaInicio: undefined;
  };
  
type TelaEntrarProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TelaInicio'>;
};

export default function TelaInicio({ navigation }: TelaEntrarProps) {
  const user = auth.currentUser;
  const userId = user?.uid;

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

        <TouchableOpacity>
          <Image source={require('../../../assets/Inicio-verPetsCadastrados.png')} style={styles.imagensTopo} />
        </TouchableOpacity>
      </View>

      {/* Certifique-se de que o CustomCarousel está dentro de uma View sem strings */}
      <View style={{ marginTop: 130 }}> 
        <CustomCarousel />
      </View>

      <TouchableOpacity style={{position:'absolute', bottom: 100}}>
        <Image source={require('../../../assets/pertoDeVoce.png')}
         style={{ width: 350, height: 300}}
         resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  );
}
