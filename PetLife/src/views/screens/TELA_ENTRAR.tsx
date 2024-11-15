import React, { useEffect } from 'react';
import { View, Text, Button, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../../../styles';
import { auth } from '../../../firebaseService';
import { onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Defina o tipo para o stack do navegador
type RootStackParamList = {
  TelaEntrar: undefined;
  TelaLogin: undefined;
  TelaCadastroPet: undefined;
  TelaCadastroPet2: undefined;
  TelaCadastro: undefined;
  TelaInicio: undefined;
  TelaPet: undefined;
};

type TelaEntrarProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TelaEntrar'>;
};

export default function TelaEntrar({ navigation }: TelaEntrarProps) {
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // Verifica o token armazenado
        const userToken = await AsyncStorage.getItem('userToken');
        console.log("Token encontrado no AsyncStorage:", userToken);

        // Verificação do estado de autenticação com Firebase
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user && userToken) {
            console.log("Usuário autenticado, navegando para TelaPet");
            navigation.navigate('TelaPet'); // Navegar para TelaInicio se autenticado
          } else {
            console.log("Usuário não autenticado, permanecendo em TelaEntrar");
          }
        });

        return () => {
          unsubscribe(); // Limpa a função onAuthStateChanged ao desmontar
        };
      } catch (error) {
        console.error("Erro ao verificar estado de autenticação:", error);
      }
    };

    checkAuthState();
  }, [navigation]);

  const handleSignIn = () => {
    navigation.navigate('TelaLogin'); // Navega para a tela de login
  };

  const handleSignUp = () => {
    navigation.navigate('TelaCadastro'); // Navega para a tela de cadastro
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../../assets/Logo.png')} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>PetLife</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="ENTRE" onPress={handleSignIn} color={styles.buttonColor.color} />
          <Text style={styles.orText}>ou</Text>
          <Button title="CADASTRE-SE" onPress={handleSignUp} color={styles.buttonColor.color} />
        </View>
        <Text style={styles.orText}>usando</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => Alert.alert('Facebook Login')} activeOpacity={0.5}>
            <Image source={require('../../../assets/logo_facebook.png')} style={styles.Icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Google Login')} activeOpacity={0.5}>
            <Image source={require('../../../assets/logo_google.png')} style={styles.Icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Windows Login')} activeOpacity={0.5}>
            <Image source={require('../../../assets/logo_windows.png')} style={styles.Icon} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
