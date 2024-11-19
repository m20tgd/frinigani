import dotenv from "dotenv";

import { initializeApp } from "firebase/app";

import { collection, getDocs, getFirestore, query } from "firebase/firestore";

dotenv.config();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

exports.handler = async () => {
  try{
    const collectionRef = collection(db, 'game-nights');
    const dbQuery = query(collectionRef);
    const querySnapshot = await getDocs(dbQuery);
    const gameNightArray = querySnapshot.docs
      .map(docSnapshop =>  docSnapshop.data())
      .map(gameNightDoc => ({ ...gameNightDoc, date: gameNightDoc.date.toDate() as Date}))
      .sort((a, b) => {
          if (a.date > b.date) return 1;
          return -1;
      });
        return {
          statusCode: 200,
          body: JSON.stringify({gameNightArray})
      }
  }
  catch(error){
    return new Response('Fail', { status: 400})
  }

}

