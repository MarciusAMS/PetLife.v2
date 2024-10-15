import { firestore } from '../../firebaseService';
import { collection, addDoc } from 'firebase/firestore';
import { auth }  from '../../firebaseService';
import storage from '@react-native-firebase/storage'; // Importando Firebase Storage
import { Alert } from 'react-native';

export const cadastrarPet = async (nome: string, raca: string, idade: string, sexo: string, peso: string, imageUri: string ) => {
  try {
    // Obtém o UID do usuário logado
    const userUID = auth.currentUser?.uid;

    if (!userUID) {
      throw new Error('Usuário não está autenticado');
    }
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const reference = storage().ref(`pets/${filename}`);

    // Fazendo o upload da imagem
    await reference.putFile(imageUri);
    const url = await reference.getDownloadURL();


    // Referência à coleção 'pets' no Firestore
    const petsCollection = collection(firestore, 'pets');

    // Dados do pet a serem adicionados
    const petData = {
      nome,
      raca,
      idade,
      sexo,
      peso,
      userUID,
      imagemUrl: url,  // Vinculando o pet ao UID do usuário
      criadoEm: new Date(),  // Timestamp da criação
    };

    // Adiciona o novo pet ao Firestore
    const docRef = await addDoc(petsCollection, petData);

    console.log('Pet cadastrado com sucesso, ID do documento:', docRef.id);
  } catch (error) {
    if (error instanceof Error) {
        console.error('Erro ao cadastrar o pet:', error.message);
      } else {
        console.error('Erro ao cadastrar o pet:', error);
      }
    }
}