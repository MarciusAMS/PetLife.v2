import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Dimensions, ImageBackground } from 'react-native';
import { styles } from '../../../styles';
import { auth } from '../../../firebaseService';
import { RouteProp, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomCarousel from '../../global/carousel';
import { useNavigation } from '@react-navigation/native';

export type RootStackParamList = {
  TelaLogin: undefined;
  telaEsqueciSenha: undefined;
  TelaInicio: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
  TelaPet: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
  AppMenu: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
};

interface Pet {
  nome: string;
  imagemUrl: string;
  userUID: string;
  petId: string;
}

type TelaInicioProps = {
  //navigation: NativeStackNavigationProp<RootStackParamList, 'TelaInicio'>;
  // pet?: { nome: string; imagemUrl: string; petId: string };
  pet?: Pet;
};

export default function TelaInicio({ pet }: TelaInicioProps) {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = auth.currentUser;
  const userId = user?.uid;
  const { width } = Dimensions.get('window');

  // const route = useRoute<RouteProp<RootStackParamList, 'AppMenu'>>();
  // const pet = route.params?.pet;

  useEffect(() => {
    if (!pet) {
      console.log('Nenhum pet foi selecionado ainda. Redirecionando para TelaPet.');
      navigator.navigate('TelaPet');
    } else {
      console.log('Pet já foi selecionado. Esse é o ', pet.nome);
    }
  }, [pet, navigator]);

  const OpenMapsButton = () => {
    const url = 'https://www.google.com/maps/search/?api=1&query=pet+shop+perto+de+mim';
    Linking.openURL(url).catch((err) => console.error('Erro ao abrir o Google Maps', err));
  };

  const signOutUser = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem('userToken');
      console.log('Usuário deslogado.');
      navigator.navigate('TelaLogin');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  console.log('ID do Pet:', pet?.petId);

  return (
    <View style={styles.container}>
      <View style={styles.containerInicioHorizontal}>
        <View style={styles.conteudoEsquerda}>
          <Image source={{ uri: pet?.imagemUrl }} style={styles.imagensTopo} />
          <Text style={styles.nomeDoPet}>{pet?.nome}</Text>
        </View>

        <TouchableOpacity onPress={() => navigator.navigate('TelaPet')}>
          <Image source={require('../../../assets/Inicio-verPetsCadastrados.png')} style={styles.imagensTopo} />
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <View style={{ marginTop: 180 }}>
        <CustomCarousel />
      </View>
      <TouchableOpacity onPress={OpenMapsButton} style={{ position: 'absolute', bottom: 60 }}>
        <View style={{ width: width * 0.9, height: 400, borderRadius: 10, overflow: 'hidden' }}>
          <ImageBackground
            source={require('../../../assets/pertoDeVoce.png')}
            style={{ width: '100%', height: '100%' }}
            imageStyle={{ borderRadius: 10 }}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
