import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Dimensions, ImageBackground } from 'react-native';
import { styles } from '../../../styles';
import { auth } from '../../../firebaseService';
import { RouteProp, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomCarousel from '../../global/carousel';

export type RootStackParamList = {
    TelaLogin: undefined,
    telaEsqueciSenha: undefined,
    TelaInicio: { pet: { nome: string; imagemUrl: string; petId: string} } | undefined;
    TelaPet: undefined;
    AppMenu: undefined;
  };
  
type TelaEntrarProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TelaInicio'>;
};

export default function TelaInicio({ navigation }: TelaEntrarProps) {
  const user = auth.currentUser;
  const userId = user?.uid;
  const {width} = Dimensions.get('window');

  const route = useRoute<RouteProp<RootStackParamList, 'TelaInicio'>>();
  const pet = route.params?.pet;

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

  console.log("ID do Pet:", pet?.petId)

  if(pet){
    console.log("Pet já foi selecionado. Esse é o ", pet.nome);
  }else{
    console.log('Nenhum pet foi selecionado ainda');
    navigation.navigate('TelaPet');
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInicioHorizontal}>
        <View style={styles.conteudoEsquerda}>
          <Image source={{uri: pet?.imagemUrl}} style={styles.imagensTopo} />
          <Text style={styles.nomeDoPet}>{pet?.nome}</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('TelaPet')}>
          <Image source={require('../../../assets/Inicio-verPetsCadastrados.png')} style={styles.imagensTopo} />
        </TouchableOpacity>
      </View>

      
      <View style={{ marginTop: 130 }}> 
        <CustomCarousel />
      </View>

      {/* ARREDONDAR AS BORDAS DA IMAGEM DO PETSHOP PERTO DE VOCÊ!!!!! */}
      <TouchableOpacity onPress={OpenMapsButton} style={{ 
         position: 'absolute',
         bottom: 160,
         alignSelf: 'center',
         width: width * 0.9, 
         height: 200, 
         borderRadius: 10, 
         overflow: 'hidden',
         backgroundColor: 'trasnparent' }}>
    <ImageBackground 
      source={require('../../../assets/pertoDeVoce.png')}
      style={{ width: '100%', height: '100%' }}
      resizeMode="contain"
    />
</TouchableOpacity>


     {/* <MenuGlobal /> */}
    </View>
  );
}
