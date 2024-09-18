import { Alert } from 'react-native';
import { auth } from '../../firebaseService';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Função para autenticação
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Usuário autenticado com sucesso:', user);
    Alert.alert('Autenticado com sucesso!!!');
    return user; // Retorna o usuário autenticado
  } catch (error: any) {
    console.error('Erro ao autenticar usuário:', error.message);
    Alert.alert('Erro', error.message);
    throw error; // Rejeita a promessa com o erro para tratamento posterior
  }
};

