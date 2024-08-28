import { auth, firestore } from '../../firebaseService';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const signUp = async (email: string, password: string, additionalData: any) => {
    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Salva os dados adicionais no Firestore
      await setDoc(doc(firestore, 'usuarios', user.uid), {
        email: user.email,
        senha: password,
        uid: user.uid, 
        ...additionalData
      });
  
      console.log('Usuário cadastrado com sucesso:', user);
      return user; // Retorna o usuário criado
    } catch (error: any) {
      console.error('Erro ao cadastrar usuário:', error.message);
      throw error; // Rejeita a promessa com o erro para tratamento posterior
    }
  };
  