import React from 'react';
import { View, Text, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../../../styles';
import { themas } from '../../global/themes';
//import { Logo } from '../../assets/Logo.png';
import { auth } from '../../../firebaseService';

// Defina o tipo para o stack do navegador
type RootStackParamList = {
  TelaEntrar: undefined;
  TelaLogin: undefined;
  TelaCadastroPet: undefined;
  TelaCadastro: undefined;
};

type TelaEntrarProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TelaEntrar'>;
};

export default function TelaEntrar({ navigation }: TelaEntrarProps) {
  
  const user = auth.currentUser;
  const userId = user?.uid;

  console.log(userId);

  const handleSignIn = () => {
    navigation.navigate('TelaLogin'); // Navega para a tela de login
  };

  const handleSignUp = () => {
    navigation.navigate('TelaCadastro'); // Navega para a tela de cadastro
  };
  const CadastrarPet = () => {
    navigation.navigate('TelaCadastroPet');
  }



  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      <Image style={styles.logo}
         source={require('../../../assets/Logo.png')}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>PetLife</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="ENTRE" onPress={handleSignIn}  color={styles.buttonColor.color}/>
        <Text style={styles.orText}>ou</Text>
        <Button title="CADASTRE-SE" onPress={handleSignUp} color={styles.buttonColor.color} />
        <Button title="CADASTRe o PET" onPress={CadastrarPet} color={styles.buttonColor.color} />
      </View>
      <Text style={styles.orText}>usando</Text>
      <View style={styles.socialIcons}>

        <TouchableOpacity onPress={() => console.log('Facebook Login!')} activeOpacity={0.5}>
          <Image source={require('../../../assets/logo_facebook.png')} style={styles.Icon}>
          
          </Image>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('Google Login!')} activeOpacity={0.5}>
          <Image source={require('../../../assets/logo_google.png')} style={styles.Icon}>
          
          </Image>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('Windows Login!')} activeOpacity={0.5}>
          <Image source={require('../../../assets/logo_windows.png')} style={styles.Icon}>
          
          </Image>
        </TouchableOpacity>
        
      </View>
    </View>
    </ScrollView>
    // Em () se insere a lógica de autenticação de outros meios.
  //  <Button title="F" onPress={() => console.log('Facebook login')} />  
  //  <Button title="M" onPress={() => console.log('Microsoft login')} />  
  );
}
