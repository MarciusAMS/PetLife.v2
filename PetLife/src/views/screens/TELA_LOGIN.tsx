import React, { useRef, useState } from 'react';
import { View, Text, Button, Image, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles';
import { signIn } from '../../controllers/TELA_LOGIN';
//import { CheckBoxCustom } from '../../global/checkbox';
import { CheckBox } from 'react-native-elements';
import { themas } from '../../global/themes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../../firebaseService';

export type RootStackParamList = {
  telaLogin: undefined,
  AppMenu: undefined; // Observação: Por estar dentro do Container do Menu Global, precisa ser importado o container e não a tela diretamente
  TelaPet: undefined;
  telaEsqueciSenha: undefined, // Adicione todas as suas telas aqui
  TelaInicio: undefined;
};

type TelaEntrarProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'telaLogin'>;
};

export default function TelaLogin( { navigation }: TelaEntrarProps ) {

  const handleEsqueciSenha = () => {
    navigation.navigate('telaEsqueciSenha'); 
  };

  const handlePet = () => {
    navigation.navigate('TelaPet');
  };

   const signOutUser = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem('userToken'); // Limpa o token ao sair.
      console.log('Usuário deslogado.');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  // Estados para gerenciar o estado dos checkboxes
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  // const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [manterLogado, setManterLogado] = useState(false);
  //  const [isPasswordChecked, setIsPasswordChecked] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    email: false,
    senha: false,
  });

  const emailInputRef = useRef<TextInput>(null);
  const senhaInputRef = useRef<TextInput>(null);

  const handleSignIn = async () => {

    const isValid = validarCampos();

    if (!isValid) return;

    try {
      
     
      const usuario = await signIn(email, senha, manterLogado);
      console.log(manterLogado);
      handlePet();
      navigation.navigate('TelaInicio');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro na autenticação', error.message);
      }
    }
  };

  const validarCampos = () => {

    let isValid = true;

    const errors = {
      email: !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      senha: !senha,
    };

    setInputErrors(errors);

    if (errors.email && emailInputRef.current) {
      emailInputRef.current.focus();
      isValid = false;
    } else if (errors.senha && senhaInputRef.current) {
      senhaInputRef.current.focus();
      isValid = false;
    };
    return isValid;
  }

 

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.container}>

        <View style={styles.containerHorizontal}>
          <Image
            style={styles.imagemCadastroLogin}
            source={require('../../../assets/Logo.png')}
          />
          <Text style={styles.textoPetlife}>PetLife</Text>
        </View>

        <View style={styles.inputContainer}>
            <Image 
              style={styles.imagemCadastroLogin}
              source={require('../../../assets/logoLogin.png')}
            />
          </View>

        <View style={styles.inputContainer}>
          <View style={styles.orText}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={[
                styles.input, 
                inputErrors.email && { borderColor: themas.colors.errorColor }
              ]}
              ref={emailInputRef}
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
            />
            {inputErrors.email && <Text style={themas.textStyles.errorText}>Email inválido ou vazio.</Text>}
          </View>

          <View style={styles.orText}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={[
                styles.input, 
                inputErrors.senha && { borderColor: themas.colors.errorColor }
              ]}
              ref={senhaInputRef}
              placeholder="Digite sua senha"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
            {inputErrors.senha && <Text style={themas.textStyles.errorText}>Senha é obrigatória.</Text>}
          </View>

          <View style={styles.containerCheckBox}>
            <CheckBox
              style={styles.orCheckBox}
              title="Manter-me logado"
              checked={manterLogado}
              onPress={() => setManterLogado((prev) => !prev)}
            />
          </View>

        {/* Link para Esqueci Minha Senha */}
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={(handleEsqueciSenha)}> 
            <Text style={styles.linkText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
        </View>

        {/* onPress={() => navigation.navigate('')} */}

        <View style={styles.containerLoginAndCadastro}>
          <View style={themas.buttonStyles.roundedButton}>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={themas.buttonStyles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
