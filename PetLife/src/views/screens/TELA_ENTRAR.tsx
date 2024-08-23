import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../../../styles';
import { themas } from '../../global/themes';
//import { Logo } from '../../assets/Logo.png';

// Defina o tipo para o stack do navegador
type RootStackParamList = {
  TelaEntrar: undefined;
  TelaLogin: undefined;
};

type TelaEntrarProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TelaEntrar'>;
};

export default function TelaEntrar({ navigation }: TelaEntrarProps) {
  const handleSignIn = () => {
    navigation.navigate('TelaLogin'); // Navega para a tela de login
  };

  const handleSignUp = () => {
    // Implementar a lógica de cadastro
  };

  return (
    <View style={styles.container}>
      <Image
         source={require('../../../assets/Logo.png')}
      />
      <Text style={styles.title}>PetLife</Text>
      <View style={styles.buttonContainer}>
        <Button title="ENTRE" onPress={handleSignIn} color={styles.buttonColor.color} />
        <Text style={styles.orText}>ou</Text>
        <Button title="CADASTRE-SE" onPress={handleSignUp} color={styles.buttonColor.color} />
      </View>
      <Text style={styles.socialText}>usando</Text>
      <View style={styles.socialIcons}>
        <Button title="F" onPress={() => console.log('Facebook login')} /> 
        <Button title="G" onPress={() => console.log('Google login')} />   
        <Button title="M" onPress={() => console.log('Microsoft login')} />  
      </View>
    </View>
    // Em () se insere a lógica de autenticação de outros meios.
  );
}
