import { Alert } from 'react-native';
import { auth } from '../../firebaseService';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, inMemoryPersistence  } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para autenticação
export const signIn = async (email: string, password: string, manterLogado: boolean) => {
  try {

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (manterLogado) {
      await AsyncStorage.setItem('userToken', user.uid);
    } else {
      await AsyncStorage.removeItem('userToken');
    }
    
    console.log('Usuário autenticado com sucesso:', user);
    Alert.alert('Autenticado com sucesso!');
    return user; // Retorna o usuário autenticado
  } catch (error: any) {
    console.error('Erro ao autenticar usuário:', error.message);
    Alert.alert('Erro', error.message);
    throw error; // Rejeita a promessa com o erro para tratamento posterior
  }
};

export const signOut = async () => {
  await auth.signOut();
  await AsyncStorage.removeItem('userToken'); // Limpa o AsyncStorage ao sair
};
