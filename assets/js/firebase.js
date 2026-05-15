import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "ضع_apiKey",
  authDomain: "ضع_authDomain",
  projectId: "ضع_projectId",
  storageBucket: "ضع_storageBucket",
  messagingSenderId: "ضع_senderId",
  appId: "ضع_appId"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export async function saveReport(report){

  try{

    await addDoc(collection(db,"reports"),{
      ...report,
      createdAt:serverTimestamp()
    });

    return true;

  }catch(error){

    console.error(error);
    return false;
  }

}

export async function getReports(){

  const snapshot = await getDocs(collection(db,"reports"));

  return snapshot.docs.map(doc => ({
    id:doc.id,
    ...doc.data()
  }));

}
