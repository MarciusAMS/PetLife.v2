import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAD_qh39kHsegvfNH81aaA8OOkAAolsiLs",
  authDomain: "petlife-34f47.firebaseapp.com",
  projectId: "petlife-34f47",
  storageBucket: "petlife-34f47.appspot.com",
  messagingSenderId: "317126187765",
  appId: "1:317126187765:web:cd86f90cd485810b0083bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);

