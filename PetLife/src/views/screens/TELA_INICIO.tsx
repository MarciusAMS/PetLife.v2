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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerInicioHorizontal}>
        <View style={styles.conteudoEsquerda}>
          <Image source={require('../../../assets/logo_facebook.png')} style={styles.imagensTopo} />
          <Text style={styles.nomeDoPet}>PetLife</Text>
        </View>

        <TouchableOpacity>
          <Image source={require('../../../assets/Inicio-verPetsCadastrados.png')} style={styles.imagensTopo} />
        </TouchableOpacity>
      </View>


      <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
        <Image source={require('../../../assets/logo_windows.png')} style={styles.Icon} />
      </TouchableOpacity>

      {/* Certifique-se de que o CustomCarousel está dentro de uma View sem strings */}
      <View style={{ marginTop: 70 }}> 
        <CustomCarousel />
      </View>


      <TouchableOpacity>
        <Image source={require('../../../assets/pertoDeVoce.png')}/>
      </TouchableOpacity>
    </ScrollView>
  );
}
