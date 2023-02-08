import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBH4hDUipGmCLD0JVTCn0jbal0AaqxNWYY",
  authDomain: "cocktails-df04f.firebaseapp.com",
  projectId: "cocktails-df04f",
  storageBucket: "cocktails-df04f.appspot.com",
  messagingSenderId: "998737451116",
  appId: "1:998737451116:web:53031089f7c2d786f06049"
};

export const app = initializeApp(firebaseConfig);