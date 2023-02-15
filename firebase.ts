import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAPBuzOk_AGGxR3tNWrYgCxJpAWn2NKy6Y",
    authDomain: "chatgpt-clone-c8e2a.firebaseapp.com",
    databaseURL: "https://chatgpt-clone-c8e2a-default-rtdb.firebaseio.com",
    projectId: "chatgpt-clone-c8e2a",
    storageBucket: "chatgpt-clone-c8e2a.appspot.com",
    messagingSenderId: "180230128261",
    appId: "1:180230128261:web:02f8095712df837000dfec",
    measurementId: "G-Z2FGBQC92Y"
  };

// Singleton pattern
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};
