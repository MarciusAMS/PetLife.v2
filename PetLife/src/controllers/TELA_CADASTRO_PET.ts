import { firestore, storage } from '../../firebaseService'; // Certifique-se de que está exportando firestore
import { collection, addDoc } from 'firebase/firestore';
import { auth } from '../../firebaseService'; // Certifique-se de que está exportando auth
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";// Importando Firebase Storage

export const cadastrarPet = async (nome: string, raca: string, idade: string, sexo: string, peso: string, imageUri: string) => {
  try {
    // Obtém o UID do usuário logado
    const userUID = auth.currentUser?.uid;

    if (!userUID) {
      throw new Error('Usuário não está autenticado');
    }

    // Extraindo o nome do arquivo da URI da imagem
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);

    const storageRef = ref(storage, `pets/${userUID}/${filename}`);
    const img = await fetch(imageUri);
    const bytes = await img.blob();
    await uploadBytes(storageRef, bytes);
    const url = await getDownloadURL(storageRef);
    console.log(`Image uploaded at URL: ${url}`);
    
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
    console.error('Erro ao cadastrar o pet:', error instanceof Error ? error.message : error);
  }
};
