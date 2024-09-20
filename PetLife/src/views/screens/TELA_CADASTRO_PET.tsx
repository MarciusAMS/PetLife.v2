import React, { useRef, useState } from 'react';
import { styles } from '../../../styles';
import { View, Text,TextInput, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { themas } from '../../global/themes';


export default function TelaCadastroPet(){

  const [additionalData, setAdditionalData] = useState({ nome: '', raca: '' });
  const [idade, setIdade] = useState<number| null>(null);
  const [peso, setPeso] = useState<number| null>(null);
  const [sexo, setSexo] = useState<string>('');
  const [inputErrors, setInputErrors] = useState({
    nome: false,
    idade: false,
    peso: false,
    sexo: false,
    raca:false
  });
  const nomeInputRef = useRef<TextInput>(null);
  const idadeInputRef = useRef<TextInput>(null);
  const pesoInputRef = useRef<any>(null);
  const sexoInputRef = useRef<TextInput>(null);
  const racaInputRef = useRef<TextInput>(null);

  // Validar os campos antes de cadastrar o pet ao usuario

  // const handleCadastrarPet = async () => {

    // Validação antes de tentar o cadastro

    // const isValid = validarCampos();
    
    // if (!isValid) return;

  //   try {
  //     const user = await signUp(email, senha, additionalData);
  //     Alert.alert('Cadastro realizado com sucesso!', `Bem-vindo, ${user.email}`);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       Alert.alert('Erro', error.message);
  //     }
  //   }
  // };

  // ---------------------------------------------------- //

  // Função de validar os campos

  // const validarCampos = () => {
  //   let isValid = true;

  // const errors = {
  //   nome: !additionalData.nome,
  //   idade: !idade,
  //   peso: !peso,
  //   sexo:!sexo,
  //   raca: !additionalData.raca,
  // };

  // setInputErrors(errors);

  
  //   // Foco no primeiro campo com erro
  //   if (errors.nome && nomeInputRef.current) {
  //     nomeInputRef.current.focus();
  //     isValid = false;
  //   } else if (errors.idade && idadeInputRef.current) {
  //     idadeInputRef.current.focus();
  //     isValid = false;
  //   } else if (errors.peso && pesoInputRef.current) {
  //     pesoInputRef.current.focus();
  //     isValid = false;
  //   } else if (errors.sexo && sexoInputRef.current) {
  //     sexoInputRef.current.focus();
  //     isValid = false;
  //   } else if (errors.raca && racaInputRef.current) {
  //     racaInputRef.current.focus();
  //     isValid = false;
  //   }

  //   return isValid;
  // };

  // ---------------------------------------------------- //

  const handleNomeChange = (text: string) => {
    if (text.trim() === "") {
      setInputErrors({ ...inputErrors, nome: true });
    } else {
      setAdditionalData({ ...additionalData, nome: text });
    }
  };

  const handleIdadeChange = (text: string) => {
    
    if (text.trim() === "") {
      setInputErrors({ ...inputErrors, idade: true });
    } else{
    setIdade(parseFloat(text));
    }
  };

  const handlePesoChange = (text: string) => {
    if (text.trim() === "") {
      setInputErrors({ ...inputErrors, peso: true });
    } else{
    setPeso(parseFloat(text));
    }
  };

  const handleSexoChange = (text: string) => {
    if (text.trim() === "") {
      setInputErrors({ ...inputErrors, sexo: true });
    } else{
    setSexo(text.toLowerCase());
    }
  };

  const handleRacaChange = (text: string) => {
    if (text.trim() === "") {
      setInputErrors({ ...inputErrors, raca: true });
    } else {
      setAdditionalData({ ...additionalData,raca: text.toLowerCase()});
    }
  };


return(
    <ScrollView contentContainerStyle={styles.container}> 
    
    <View style={styles.container}>

<View style={styles.inputContainer}>

<View style={styles.socialIcons}>
  <Image
    style={styles.Bolinhas}
    source={require('../../../assets/imgBolinhas2.png')}
  />
</View>
  <View style={styles.inputContainer}>
    <Image 
      style={styles.imagemCadastroLogin}
      source={require('../../../assets/cadastro_de_pet-legenda.png')}
    />
  </View>
  </View>
  </View>


      {/* Campo de Nome */}
      <View style={styles.orText}>  
            <TextInput
              style={[
                styles.input, 
                inputErrors.nome && { borderColor: themas.colors.errorColor }
              ]}
              ref={nomeInputRef}
              value={additionalData.nome} 
              onChangeText={handleNomeChange} 
              placeholder="Nome:"  
              placeholderTextColor={themas.colors.placeholderColor}
            />
         </View>

          {/* Campo Idade  */}
          <View style={styles.orText}>  
            <TextInput
              style={[
                styles.input, 
                inputErrors.idade && { borderColor: themas.colors.errorColor }
              ]}
              ref={idadeInputRef}
              value={idade !== null ? String(idade) : ''}
              onChangeText={handleIdadeChange} 
              placeholder="Idade (Ex. 1.2):" 
              keyboardType="decimal-pad"
              placeholderTextColor={themas.colors.placeholderColor}
            />
         </View>

          {/* Campo Peso */}
          <View style={styles.orText}>  
            <TextInput
              style={[
                styles.input, 
                inputErrors.peso && { borderColor: themas.colors.errorColor }
              ]}
              ref={pesoInputRef}
              value={peso !== null ? String(peso) : ''} 
              onChangeText={handlePesoChange} 
              placeholder="Peso:" 
              keyboardType="decimal-pad"
              placeholderTextColor={themas.colors.placeholderColor}
            />
         </View> 

          {/* Campo Sexo */}
          <View style={styles.orText}>  
            <TextInput
              style={[
                styles.input, 
                inputErrors.sexo && { borderColor: themas.colors.errorColor }
              ]}
              ref={sexoInputRef}
              value={sexo} 
              onChangeText={handleSexoChange} 
              placeholder="Sexo:" 
              placeholderTextColor={themas.colors.placeholderColor}
            />
         </View>

         <View style={styles.orText}>  
            <TextInput
              style={[
                styles.input, 
                inputErrors.raca && { borderColor: themas.colors.errorColor }
              ]}
              ref={racaInputRef}
              value={additionalData.raca} 
              onChangeText={handleRacaChange} 
              placeholder="Raça:"
              placeholderTextColor={themas.colors.placeholderColor}
            />
         </View>

</ScrollView>
)
}