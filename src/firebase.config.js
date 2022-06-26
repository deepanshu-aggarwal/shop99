import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDnNC2dPpSb0Xs7NDC1W9OXmuWs7bllWoY",
  authDomain: "shop99-b5626.firebaseapp.com",
  databaseURL: "https://shop99-b5626-default-rtdb.firebaseio.com",
  projectId: "shop99-b5626",
  storageBucket: "shop99-b5626.appspot.com",
  messagingSenderId: "849760044007",
  appId: "1:849760044007:web:03e5660d22084272e13342",
  measurementId: "G-5ZNHWKZ85G"
};

const app = getApps.length>0 ? getApp() : initializeApp(firebaseConfig)

const firestore = getFirestore(app)
const storage = getStorage(app)

export {app, firestore, storage}