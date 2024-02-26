import { initializeApp } from "firebase/app";

import { Firestore, addDoc, collection, getDocs, getFirestore, query } from "firebase/firestore";
import GameNightData from "../types/game-night-data.type";

let db: Firestore;

export const getFirestoreDb = async (): Promise<Firestore | undefined> => {
  try {
      console.log('GETTING FIRESTORE DB')
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
  try{
    console.log('GETTING GAME NIGHTS')
    if (!db) {
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

export const addGameNight = async(gameNightData: GameNightData): Promise<void> => {
  try{
    console.log('ADDING GAME NIGHT')
    console.log(db)
    if (!db) {
      db = (await getFirestoreDb())!
    }
    const collectionRef = collection(db, 'game-nights');
    await addDoc(collectionRef, gameNightData);
    // const dbQuery = query(collectionRef);
    // const querySnapshot = await getDocs(dbQuery);
  }
  catch(error){
    console.error('Could not add game night to database', error);
  }
}

