import { firestore } from '../../firebaseService';
import { collection, addDoc } from 'firebase/firestore';
import { auth }  from '../../firebaseService';

export const cadastrarPet = async (nome: string, raca: string, idade: string, sexo: string, peso: string, ) => {
  try {
    // Obtém o UID do usuário logado
    const userUID = auth.currentUser?.uid;

    if (!userUID) {
      throw new Error('Usuário não está autenticado');
    }

    // Referência à coleção 'pets' no Firestore
    const petsCollection = collection(firestore, 'pets');

    // Dados do pet a serem adicionados
    const petData = {
      nome,
      raca,
      idade,
      sexo,
      peso,
      userUID,  // Vinculando o pet ao UID do usuário
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