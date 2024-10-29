import React from 'react';
import { View, Text, TextInput, Alert, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles';
import { auth } from '../../../firebaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomCarousel from '../../global/carousel';

export type RootStackParamList = {
    TelaLogin: undefined,
    telaEsqueciSenha: undefined, // Adicione todas as suas telas aqui
    TelaInicio: undefined;
  };
  
  type TelaEntrarProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'TelaInicio'>;
  };

export default function TelaInicio( { navigation }: TelaEntrarProps ){
    

    const user = auth.currentUser;
    const userId = user?.uid;
  
    console.log(userId);
    
    const signOutUser = async () => {
        try {
            console.log(userId);
          await auth.signOut();
          await AsyncStorage.removeItem('userToken'); // Limpa o token ao sair.
          console.log('Usuário deslogado.');
          navigation.navigate('TelaLogin');

        } catch (error) {
          console.error('Erro ao deslogar:', error);
        }
      };

return (
    <ScrollView  contentContainerStyle={styles.container}>
      
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
      <Image source={require('../../../assets/logo_windows.png')} style={styles.Icon}>
          </Image>
        </TouchableOpacity>
        <CustomCarousel/>
      </ScrollView>
      )

    }

