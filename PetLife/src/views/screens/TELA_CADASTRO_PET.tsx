import React, { useRef, useState, useEffect } from 'react';
import { auth, firestore } from '../../../firebaseService';
import { styles } from '../../../styles';
import { cadastrarPet } from '../../controllers/TELA_CADASTRO_PET';
import { View, Text,TextInput, Alert, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { themas } from '../../global/themes';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { User } from 'firebase/auth';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';




export type AppRootParamList = {
  TelaCadastro:undefined;
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParamList {}
  }
}


export default function TelaCadastroPet(){
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null>(null);
  const [navigatedAway, setNavigatedAway] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const abrirGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à galeria para continuar.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // Verificando se o usuário não cancelou
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri); // Definindo a URI da imagem
    } else {
      Alert.alert('Operação cancelada', 'Nenhuma imagem foi selecionada.');
    }
  };  
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Se o usuário está logado, define o estado com o usuário
        setUser(user);
        console.log(user.uid);
        setNavigatedAway(false);
      } else if (!navigatedAway){
        // Se o usuário não está logado, redireciona para a tela de login
        navigation.navigate('TelaCadastro');
        setNavigatedAway(true);
      }
    });

    // Limpa o listener ao desmontar o componente
    return () => unsubscribe();
  }, [navigatedAway]);



  const [additionalData, setAdditionalData] = useState({ nome: '', raca: '' });
  const [idade, setIdade] = useState<string>('');
  const [peso, setPeso] = useState<string>('');
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
  const pesoInputRef = useRef<TextInput>(null);
  const sexoInputRef = useRef<TextInput>(null);
  const racaInputRef = useRef<TextInput>(null);

  // Validar os campos antes de cadastrar o pet ao usuario

   const handleCadastrarPet = async () => {

    // Validação antes de tentar o cadastro
    const isValid = validarCampos();


     if (!isValid) return;

     try {
      const user = await cadastrarPet(additionalData.nome, additionalData.raca, idade, sexo, peso);
      console.log('cadastro de pet funcionou');
      Alert.alert('Cadastro de pet realizado com sucesso!');

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro', error.message);
      }
    }

   };

   

  // ---------------------------------------------------- //

  // Função de validar os campos

  const validarCampos = () => {
    let isValid = true;

  const errors = {
    nome: !additionalData.nome,
    idade: !idade,
    peso: !peso,
    sexo:!sexo,
    raca: !additionalData.raca,
  };

  setInputErrors(errors);

  
    // Foco no primeiro campo com erro
    if (errors.nome && nomeInputRef.current) {
      nomeInputRef.current.focus();
      isValid = false;
    } else if (errors.idade && idadeInputRef.current) {
      idadeInputRef.current.focus();
      isValid = false;
    } else if (errors.peso && pesoInputRef.current) {
      pesoInputRef.current.focus();
      isValid = false;
    } else if (errors.sexo && sexoInputRef.current) {
      sexoInputRef.current.focus();
      isValid = false;
    } else if (errors.raca && racaInputRef.current) {
      racaInputRef.current.focus();
      isValid = false;
    }

    return isValid;
  };

  // ---------------------------------------------------- //

  const handleNomeChange = (text: string) => {
    setAdditionalData({ ...additionalData, nome: text.charAt(0).toUpperCase() + text.slice(1) });

    if (text.trim() === "") {
      setInputErrors({ ...inputErrors, nome: true });
    }
  };

  const handleIdadeChange = (text: string) => {
    setIdade(text);

    if (text.trim() === "") {
      setInputErrors({ ...inputErrors, idade: true });
    }
  };

  const handlePesoChange = (text: string) => {
    setPeso(text);

    if (text.trim() === "") {
      setInputErrors({ ...inputErrors, peso: true });
    }
  };

  const handleSexoChange = (text: string) => {
    setSexo(text.toLowerCase());

    if (text.trim() === "") {
      setInputErrors({ ...inputErrors, sexo: true });
    }
  };

  const handleRacaChange = (text: string) => {
    setAdditionalData({ ...additionalData, raca: text.toLowerCase()});

    if (text.trim() === "") {
      setInputErrors({ ...inputErrors, raca: true });
    }
  };


return(
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
    source={require('../../../assets/imgBolinhas2.png')}
  />
</View>
  <View style={styles.inputContainer}>
    <Image 
      style={styles.imagemCadastroLogin}
      source={require('../../../assets/cadastro_de_pet-legenda.png')}
    />
  </View>

  <View style={styles.inputContainerFoto}>
  <TouchableOpacity onPress={abrirGaleria}>
        {imageUri ? (
          <Image style={styles.imagemAdicionarFotoPet} source={{ uri: imageUri }} />
        ) : (
          <Image
            style={styles.imagemAdicionarFotoPet}
            source={require('../../../assets/cadastro_de_pet-fotoPET.png')}
          />
        )}
      </TouchableOpacity>
          
  </View>



      {/* Campo de Nome */}
      <View style={styles.orText}>  
            <TextInput
              style={[
                styles.input, 
                inputErrors.nome && { borderColor: themas.colors.errorColor }
              ]}
              ref={nomeInputRef}
              value={additionalData.nome || ''}
              onChangeText={handleNomeChange} 
              placeholder="Nome:"  
              placeholderTextColor={themas.colors.placeholderColor}
            />
           {inputErrors.nome && <Text style={themas.textStyles.errorText}>Nome é obrigatorio.</Text>}
         </View>

          {/* Campo Idade  */}
          <View style={styles.orText}>  
            <TextInput
              style={[
                styles.input, 
                inputErrors.idade && { borderColor: themas.colors.errorColor }
              ]}
              ref={idadeInputRef}
              value={idade || ''}
              onChangeText={handleIdadeChange} 
              placeholder="Idade (Ex. 1.2):" 
              keyboardType="decimal-pad"
              placeholderTextColor={themas.colors.placeholderColor}
            />
             {inputErrors.idade && <Text style={themas.textStyles.errorText}>Idade é obrigatorio.</Text>}
         </View>

          {/* Campo Peso */}
          <View style={styles.orText}>  
            <TextInput
              style={[
                styles.input, 
                inputErrors.peso && { borderColor: themas.colors.errorColor }
              ]}
              ref={pesoInputRef}
              value={peso || ''} 
              onChangeText={handlePesoChange} 
              placeholder="Peso:" 
              keyboardType="decimal-pad"
              placeholderTextColor={themas.colors.placeholderColor}
            />
             {inputErrors.peso && <Text style={themas.textStyles.errorText}>Peso é obrigatorio.</Text>}
         </View> 

          {/* Campo Sexo */}
          <View style={styles.orText}>  
            <TextInput
              style={[
                styles.input, 
                inputErrors.sexo && { borderColor: themas.colors.errorColor }
              ]}
              ref={sexoInputRef}
              value={sexo || ''} 
              onChangeText={handleSexoChange} 
              placeholder="Sexo:" 
              placeholderTextColor={themas.colors.placeholderColor}
            />
             {inputErrors.sexo && <Text style={themas.textStyles.errorText}>O sexo do animal é obrigatorio.</Text>}
         </View>

         <View style={styles.orText}>  
            <TextInput
              style={[
                styles.input, 
                inputErrors.raca && { borderColor: themas.colors.errorColor }
              ]}
              ref={racaInputRef}
              value={additionalData.raca || ''} 
              onChangeText={handleRacaChange} 
              placeholder="Raça:"
              placeholderTextColor={themas.colors.placeholderColor}
            />
             {inputErrors.raca && <Text style={themas.textStyles.errorText}>Raça é obrigatorio.</Text>}
         </View>
         </View>

         <View style={styles.containerLoginAndCadastro}>
          <TouchableOpacity onPress={handleCadastrarPet} style={themas.buttonStyles.roundedButton}>
            <Text style={themas.buttonStyles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
        
        </View>


{/* Fazer Logout 
    <View>
      <Button title="Logout" onPress={() => auth.signOut()} />
    </View>
*/}
</ScrollView>
)}