import React, { useEffect } from 'react';
import { View, Text, Button, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../../../styles';
import { auth } from '../../../firebaseService';
import { onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
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
// 
type TelaEntrarProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TelaEntrar'>;
};

export default function TelaEntrar({ navigation }: TelaEntrarProps) {
  const user = auth.currentUser;
  const userId = user?.uid;

  console.log(userId);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // Verificação do estado de autenticação com Firebase
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // Somente redirecionar para TelaInicio se o Firebase e o AsyncStorage tiverem um usuário válido
            console.log("Usuário autenticado pelo Firebase e token encontrado, navegando para TelaInicio");
            navigation.navigate('TelaInicio');
          } else {
            console.log("Nenhum usuário autenticado ou token ausente, navegando para TelaEntrar");
            navigation.navigate('TelaEntrar');
          }
        });

        return () => {
          console.log("Cleanup da função onAuthStateChanged");
          unsubscribe();
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
