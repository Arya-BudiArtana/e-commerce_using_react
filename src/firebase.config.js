import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAYTe9cL--lw1_dhUqs83wNR5ITW0UgLE8",
    authDomain: "ecomerceapp-5b16d.firebaseapp.com",
    databaseURL: "https://ecomerceapp-5b16d-default-rtdb.firebaseio.com",
    projectId: "ecomerceapp-5b16d",
    storageBucket: "ecomerceapp-5b16d.appspot.com",
    messagingSenderId: "1072793834091",
    appId: "1:1072793834091:web:80305eae173311f6bb572e"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };