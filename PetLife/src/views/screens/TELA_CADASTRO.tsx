import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { signUp } from '../../controllers/TELA_CADASTRO';
import { TextInputMask } from 'react-native-masked-text';
import { styles } from '../../../styles';
import { themas } from '../../global/themes';
//import { useFormValidation } from '../../global/validarCampos';
//import { CheckBoxCustom } from '../global/checkbox';

export default function TelaCadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [additionalData, setAdditionalData] = useState({ nome: '', telefone: '' });
  const [inputErrors, setInputErrors] = useState({
    nome: false,
    email: false,
    telefone: false,
    senha: false,
    confirmarSenha: false,
  });

  const nomeInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const telefoneInputRef = useRef<any>(null);
  const senhaInputRef = useRef<TextInput>(null);
  const confirmarSenhaInputRef = useRef<TextInput>(null);

  // // Função de validação
  // const { 
  //   inputErrors, 
  //   nomeInputRef, 
  //   emailInputRef, 
  //   telefoneInputRef, 
  //   senhaInputRef, 
  //   confirmarSenhaInputRef, 
  //   validarCampos 
  // } = useFormValidation();

  const handleSignUp = async () => {
    // Validação antes de tentar o cadastro
    const isValid = validarCampos();
    
    if (!isValid) return;

    try {
      const user = await signUp(email, senha, additionalData);
      Alert.alert('Cadastro realizado com sucesso!', `Bem-vindo, ${user.email}`);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro', error.message);
      }
    }
  };

  const validarCampos = () => {
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    let isValid = true;

    const errors = {
      nome: !additionalData.nome,
      email: !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      telefone: !phoneRegex.test(additionalData.telefone),
      senha: !senha,
      confirmarSenha: senha !== confirmarSenha,
    };

    setInputErrors(errors);

    // Foco no primeiro campo com erro
    if (errors.nome && nomeInputRef.current) {
      nomeInputRef.current.focus();
      isValid = false;
    } else if (errors.email && emailInputRef.current) {
      emailInputRef.current.focus();
      isValid = false;
    } else if (errors.telefone && telefoneInputRef.current) {
      telefoneInputRef.current.focus();
      isValid = false;
    } else if (errors.senha && senhaInputRef.current) {
      senhaInputRef.current.focus();
      isValid = false;
    } else if (errors.confirmarSenha && confirmarSenhaInputRef.current) {
      confirmarSenhaInputRef.current.focus();
      isValid = false;
    }

    return isValid;
  };

  const handleNomeChange = (text: string) => {
    setAdditionalData({ ...additionalData, nome: text });
    if (text) {
      setInputErrors({ ...inputErrors, nome: false });
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
      setInputErrors({ ...inputErrors, email: false });
    }
  };

  const handleTelefoneChange = (text: string) => {
    setAdditionalData({ ...additionalData, telefone: text });
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (phoneRegex.test(text)) {
      setInputErrors({ ...inputErrors, telefone: false });
    }
  };

  const handleSenhaChange = (text: string) => {
    setSenha(text);
    if (text) {
      setInputErrors({ ...inputErrors, senha: false });
    }
  };

  const handleConfirmarSenhaChange = (text: string) => {
    setConfirmarSenha(text);
    if (text === senha) {
      setInputErrors({ ...inputErrors, confirmarSenha: false });
    }
  };

  // const verificaFormat = () => {
  //   const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  //   
  //   if (!additionalData.nome) {
  //     setInputErrors({ ...inputErrors, nome: true });
  //     nomeInputRef.current.focus();
  //     return false;
  //   } else if (!email) {
  //     setInputErrors({ ...inputErrors, email: true });
  //     emailInputRef.current.focus();
  //     return false;
  //   } else if (!phoneRegex.test(additionalData.telefone)) {
  //     setInputErrors({ ...inputErrors, telefone: true });
  //     telefoneInputRef.current.focus();
  //     return false;
  //   }
  //   
  //   return true;
  // };

  // const verificaSenha = () => {
  //    if (!senha) {
  //      setInputErrors({ ...inputErrors, senha: true });
  //      senhaInputRef.current.focus();
  //      return false;
  //    } else if (senha !== confirmarSenha) {
  //      setInputErrors({ ...inputErrors, confirmarSenha: true });
  //      confirmarSenhaInputRef.current.focus();
  //      return false;
  //    } else {
  //      return true;
  //    }
  // };

  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.containerHorizontal}>
          <Image
            style={styles.imagemCadastroLogin}
            source={require('../../../assets/Logo.png')}
          />
          <Text style={styles.textoPetlife}>PetLife</Text>
        </View>

        <View style={styles.inputContainer}>
        
        <View style={styles.socialIcons}>
          <Image
            style={styles.Bolinhas}
            source={require('../../../assets/imgBolinhas.png')}
          />
        </View>
          <View style={styles.inputContainer}>
            <Image 
              style={styles.imagemCadastroLogin}
              source={require('../../../assets/logoCadastro.png')}
            />
          </View>

          <View style={styles.orText}>  
            <TextInput
              style={[
                styles.input, 
                inputErrors.nome && { borderColor: themas.colors.errorColor }
              ]}
              ref={nomeInputRef}
              value={additionalData.nome} 
              onChangeText={handleNomeChange} 
              placeholder="Nome Completo:" 
              placeholderTextColor={themas.colors.placeholderColor}
            />
            {inputErrors.nome && <Text style={themas.textStyles.errorText}>Nome é obrigatório.</Text>}
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

          {/* Campo Telefone */}
          <View style={styles.orText}>  
            <TextInputMask
              style={[
                styles.input, 
                inputErrors.telefone && { borderColor: themas.colors.errorColor }
              ]}
              ref={telefoneInputRef}
              type={'cel-phone'} 
              options={{ maskType: 'BRL', withDDD: true, dddMask: '(19) ' }} 
              value={additionalData.telefone} 
              onChangeText={handleTelefoneChange} 
              placeholder="Digite seu telefone:" 
              placeholderTextColor={themas.colors.placeholderColor}
            />
            {inputErrors.telefone && <Text style={themas.textStyles.errorText}>Telefone inválido.</Text>}
          </View>  

          {/* Campo Senha */}
          <View style={styles.orText}>  
            <TextInput
              style={[
                styles.input, 
                inputErrors.senha && { borderColor: themas.colors.errorColor }
              ]}
              ref={senhaInputRef}
              value={senha} 
              onChangeText={handleSenhaChange} 
              placeholder="Crie uma Senha:" 
              secureTextEntry 
              placeholderTextColor={themas.colors.placeholderColor}
            />
            {inputErrors.senha && <Text style={themas.textStyles.errorText}>Senha é obrigatória.</Text>}
          </View>

          {/* Campo Confirmar Senha */}
          <View style={styles.orText}>  
            <TextInput
              style={[
                styles.input, 
                inputErrors.confirmarSenha && { borderColor: themas.colors.errorColor }
              ]}
              ref={confirmarSenhaInputRef}
              value={confirmarSenha} 
              onChangeText={handleConfirmarSenhaChange} 
              placeholder="Confirme a Senha:" 
              secureTextEntry 
              placeholderTextColor={themas.colors.placeholderColor}
            />
            {inputErrors.confirmarSenha && <Text style={themas.textStyles.errorText}>Senhas não coincidem.</Text>}
          </View>

        </View>

        <View style={styles.containerLoginAndCadastro}>
          <TouchableOpacity onPress={handleSignUp} style={themas.buttonStyles.roundedButton}>
            <Text style={themas.buttonStyles.buttonText}>Prossiga</Text>
            <Image
              source={require('../../../assets/setas-direitas.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
        
      </View>
    </ScrollView>
  );
}
