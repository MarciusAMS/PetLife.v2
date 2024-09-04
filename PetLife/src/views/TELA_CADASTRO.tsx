import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { signUp } from '../controllers/TELA_CADASTRO';
import { TextInputMask } from 'react-native-masked-text';
import { styles } from '../../styles';
import { themas } from '../global/themes';
import { CheckBoxCustom } from '../global/checkbox';

export default function TelaCadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
 // const [telefone, setTelefone] = useState('');
  const [additionalData, setAdditionalData] = useState({ nome: '', telefone: '' });
//  const phoneFieldRef = React.createRef<TextInputMask>();

  const handleSignUp = async () => {

    if (!verificaFormat()) {
       return;
     }

    if (!verificaSenha()) {
      return;
    }


    try {
      const user = await signUp(email, senha, additionalData);
      Alert.alert('Cadastro realizado com sucesso!', `Bem-vindo, ${user.email}`);
    } catch (error) {
        if (error instanceof Error) {
      Alert.alert('Erro', error.message);
    }
   }
};

const verificaSenha = () => {
    if (!senha) {
      Alert.alert('Erro', 'Informe a senha para prosseguir!')
      return false;
    }else if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'Senhas divergentes, favor verificar!')
      return false;
    }else{
      return true;
    }
  }

 const verificaFormat = () => {
   const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/; // Formato: (99) 99999-9999 ou (99) 9999-9999
   if (phoneRegex.test(additionalData.telefone)) {
     return true;
   }else{
     Alert.alert('Erro', 'Número de telefone inválido!!!')
     return false;
   }
 }

{/* <Text style={styles.label}>Nome</Text>
<Text style={styles.label}>Email</Text>
<Text style={styles.label}>Telefone</Text>
<Text style={styles.label}>Senha</Text>
<Text style={styles.label}>Confirme a Senha</Text> */}

  return (
    <ScrollView>
  <View style={styles.container}>
      
    <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/Logo.png')}
        />
    </View>

      <View style={styles.inputContainer}>

    <View style={styles.orText}>  
      <TextInput style={styles.input} 
      value={additionalData.nome} 
      onChangeText={(text) => setAdditionalData({ ...additionalData, nome: text})} 
      placeholder="Nome Completo:" />
    </View>
      
    <View style={styles.orText}>
      <TextInput style={styles.input}
      value={email} 
      onChangeText={setEmail} 
      placeholder="Email:" 
      />
    </View>

    <View style={styles.orText}>  
      <TextInputMask style={styles.input} 
      type={'cel-phone'} 
      options={{maskType: 'BRL', withDDD: true, dddMask: '(55) '}} // maskType serve para definir o país padrão, no caso Brasil
      value={additionalData.telefone} 
      onChangeText={(text) => setAdditionalData({ ...additionalData, telefone: text })} 
      placeholder="Digite seu telefone:" />
    </View>  
      
    <View style={styles.orText}>  
      <TextInput style={styles.input}
      value={senha} 
      onChangeText={setSenha} 
      placeholder="Crie uma Senha:" 
      secureTextEntry />
    </View>
      
    <View style={styles.orText}>  
      <TextInput style={styles.input} 
      value={confirmarSenha} 
      onChangeText={setConfirmarSenha} 
      placeholder="Confirme a Senha:" 
      secureTextEntry />
    </View>
  </View>
  
  <View style={styles.containerLoginAndCadastro}>
    <View style={themas.buttonStyles.roundedButton}>
      <TouchableOpacity onPress={handleSignUp} style={styles.title}>
        <Text style={themas.buttonStyles.buttonText}>Prossiga</Text>
      </TouchableOpacity>
    </View>
  </View>
    </View>
    </ScrollView>
  );
}
