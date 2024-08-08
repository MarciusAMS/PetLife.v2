import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const signIn = async (email: string, password: string): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password);
};

export default {
  signIn,
};