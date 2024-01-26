import { initializeApp } from "firebase/app";

import { Firestore, collection, getDocs, getFirestore, query } from "firebase/firestore";
import GameNightData from "../types/game-night-data.type";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID
// };

// // Initialize Firebase
// initializeApp(firebaseConfig);

let db: Firestore;

export const getFirestoreDb = async (): Promise<Firestore | undefined> => {
  try {
     const response = await fetch('./.netlify/functions/get_firebase_config');
     const data = await response.json();
     const config = data.firebaseConfig;
     initializeApp(config);
     const db = getFirestore;
     if (!db) throw Error();
     return getFirestore();
  }
  catch(error) {
    throw new Error('Could not get Firestore database')
  }
}

export const getGameNights = async (): Promise<Array<GameNightData>> => {
  console.log(db);
  try{
    if (!db) {
      console.log('No DB!')
      db = (await getFirestoreDb())!
    }
    const collectionRef = collection(db, 'game-nights');
    const dbQuery = query(collectionRef);
    const querySnapshot = await getDocs(dbQuery);
    const gameNightArray = querySnapshot.docs
      .map(docSnapshop =>  docSnapshop.data())
      .map(gameNightDoc => ({ ...gameNightDoc, date: gameNightDoc.date.toDate() as Date } as GameNightData))
      .sort((a, b) => {
          if (a.date > b.date) return 1;
          return -1;
      });
    return gameNightArray as Array<GameNightData>;
  }
  catch(error){
    console.error('Could not get data from database', error);
    return [];
  }
}

