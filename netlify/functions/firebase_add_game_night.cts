import dotenv from "dotenv";

import { initializeApp } from "firebase/app";

import { Timestamp, addDoc, collection, getDocs, getFirestore, query } from "firebase/firestore";

import GameNightData from "../../src/types/game-night-data.type";

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

exports.handler = async (event) => {
    try{
        const gameNightData = JSON.parse(event.body) as GameNightData
        const collectionRef = collection(db, 'game-nights');
        const timeStamp = Timestamp.fromDate(new Date(gameNightData.date));
        console.log(timeStamp)
        await addDoc(collectionRef, {
            ...gameNightData,
            date: Timestamp.fromDate(new Date(gameNightData.date))
        });
        return {
            statusCode: 200
        }
    }
    catch(error){
        return new Response('Fail', { status: 400});
    }

}