import React, { useState } from 'react';
import { View, Text, Button, Image, ScrollView, TextInput, Alert} from 'react-native';
import { styles } from '../../../styles';
import { signIn } from '../../controllers/TELA_LOGIN';
//import { CheckBoxCustom } from '../../global/checkbox';
import { CheckBox } from 'react-native-elements';

export default function telaLogin() {
  // Estados para gerenciar o estado dos checkboxes
  const [email, setEmail ] = useState('');
  const [senha, setSenha ] = useState('');
  const [isEmailChecked, setIsEmailChecked] = useState(false);
//  const [isPasswordChecked, setIsPasswordChecked] = useState(false);

const handleSignIn = async () => {
  try {
    const usuario = await signIn(email, senha);
  } catch (error) {
   if (error instanceof Error) {
    Alert.alert('Erro na autenticação', error.message);
  }
  //else{
   // Alert.alert('Erro de autenticação', 'Ocorreu um erro inesperado.');
  //}
 }
};

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../../assets/Logo.png')}
        />
        <Text style={styles.title}>PETLIFE</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} 
        placeholder="Digite seu e-mail" 
        value={email} 
        onChangeText={setEmail} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <CheckBox
          title="Manter-me logado"
          checked={isEmailChecked}
          onPress={() => setIsEmailChecked(!isEmailChecked)}
        />
      </View>
      <Button title="Entrar" onPress={handleSignIn} />
    </ScrollView>
  );

  // <CheckBox
  //         title="Lembrar senha"
  //         checked={isPasswordChecked}
  //         onPress={() => setIsPasswordChecked(!isPasswordChecked)}
  //       />
}
