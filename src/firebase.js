import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB8VrbM_zkTNiiawqxxCTM4yBjUuzxyoSQ",
    authDomain: "todolist-4ea2a.firebaseapp.com",
    projectId: "todolist-4ea2a",
    storageBucket: "todolist-4ea2a.firebasestorage.app",
    messagingSenderId: "722437922649",
    appId: "1:722437922649:android:d2824fbe33815ff086f648"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 