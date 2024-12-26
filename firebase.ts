import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATq0YzG5ibpxxM_2DxyxKrYBH62OkPfAQ",
  authDomain: "notion-clone-73e07.firebaseapp.com",
  projectId: "notion-clone-73e07",
  storageBucket: "notion-clone-73e07.firebasestorage.app",
  messagingSenderId: "566168842154",
  appId: "1:566168842154:web:deac15733c976b01fa85d3",
};

const app = getApp.length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db  };
