import React, { useState } from 'react';
import { View, Text, Button, Image, ScrollView, TextInput, Alert, TouchableOpacity} from 'react-native';
import { styles } from '../../../styles';
import { signIn } from '../../controllers/TELA_LOGIN';
//import { CheckBoxCustom } from '../../global/checkbox';
import { CheckBox } from 'react-native-elements';
import { themas } from '../../global/themes';

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

 const [inputErrors, setInputErrors] = useState({
  email: false,
  senha: false,
});
};

  return (
    <ScrollView>
      <View style={styles.containerHorizontal}>
          <Image
            style={styles.imagemCadastroLogin}
            source={require('../../../assets/Logo.png')}
          />
          <Text style={styles.textoPetlife}>Entre</Text>
        </View>

        {/* Campo Email */}
        <View style={styles.orText}>
            <TextInput
              style={[
                styles.input, 
                inputErrors.email && { borderColor: themas.colors.errorColor }
              ]}
              ref={emailInputRef}
              value={email} 
              onChangeText={handleEmailChange} 
              placeholder="Email:" 
              placeholderTextColor={themas.colors.placeholderColor}
            />
            {inputErrors.email && <Text style={themas.textStyles.errorText}>Email inválido ou vazio.</Text>}
          </View>

      <View style={styles.inputContainer}>
        <View style={styles.orText}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} 
        placeholder="Digite seu e-mail" 
        value={email} 
        onChangeText={setEmail} 
        />
        </View>

        <View style={styles.orText}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        </View>

        <View style={styles.orCheckBox}>
        <CheckBox
          title="Manter-me logado"
          checked={isEmailChecked}
          onPress={() => setIsEmailChecked(!isEmailChecked)}
        />
        </View>
      </View>  

    <View style={styles.containerLoginAndCadastro}>  
      <View style={themas.buttonStyles.roundedButton}>
        <TouchableOpacity onPress={handleSignIn} style={styles.title}>
          <Text style={themas.buttonStyles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );

  // <CheckBox
  //         title="Lembrar senha"
  //         checked={isPasswordChecked}
  //         onPress={() => setIsPasswordChecked(!isPasswordChecked)}
  //       />
}
