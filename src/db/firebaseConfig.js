
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAMRve2RZgSF9mhoDFpRVw682BE19_WH7Y",
  authDomain: "projeto-integrador-e81ce.firebaseapp.com",
  projectId: "projeto-integrador-e81ce",
  storageBucket: "projeto-integrador-e81ce.appspot.com",
  messagingSenderId: "114426736578",
  appId: "1:114426736578:web:cf69cef92951fc0d1db05b"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getDatabase(app)

export default app