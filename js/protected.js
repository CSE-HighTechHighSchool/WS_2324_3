import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getDatabase, ref, set, update, child, get }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCio01gRUm2UOIw5-x7QgqZxrf84ZLJqxg",
  authDomain: "vt-fb-rtd-demo.firebaseapp.com",
  databaseURL: "https://vt-fb-rtd-demo-default-rtdb.firebaseio.com",
  projectId: "vt-fb-rtd-demo",
  storageBucket: "vt-fb-rtd-demo.appspot.com",
  messagingSenderId: "937459270093",
  appId: "1:937459270093:web:3a7e6577c066ce77c20484"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)

const user = JSON.parse(sessionStorage.getItem("user"))


window.onload = () => {
    if (user === null) {
        window.location.href = "/"
    }
}