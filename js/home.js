import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  update,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCio01gRUm2UOIw5-x7QgqZxrf84ZLJqxg",
  authDomain: "vt-fb-rtd-demo.firebaseapp.com",
  databaseURL: "https://vt-fb-rtd-demo-default-rtdb.firebaseio.com",
  projectId: "vt-fb-rtd-demo",
  storageBucket: "vt-fb-rtd-demo.appspot.com",
  messagingSenderId: "937459270093",
  appId: "1:937459270093:web:3a7e6577c066ce77c20484",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

import "./protected.js";


const user = JSON.parse(sessionStorage.getItem("user"))

async function getMessages() {
    const messagesList = []

    console.log("bruh", user.uid)

    const snapshot = await get(ref(db, `users/${user.uid}/message`))
    console.log("snapshot: ", snapshot.val())

    if(snapshot.exists()) {
        console.log(snapshot.val())
        snapshot.forEach(child => {
            messagesList.push({ key: child.key, val: child.val() })
        })
    }

    messagesList.forEach(m => renderMessage(m.val, m.key))
}

function renderMessage(message, key) {
    const elem = document.createElement("div")
    elem.className = "message-container"

    const name = message.person === "alinc" ? "Abraham Lincoln" : message.person === "gwash" ? "George Washington" : "Christopher Columbus"
    elem.innerHTML = `
        <img src="img/${message.person}.png" height="100" width="100">
        <div class="message-container-inner">
            <h1>${name}</h1>
            <p>${new Date(message.lastUpdated).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</p>
        </div>
    `
    elem.onclick = () => {
        window.location.href = `/chat.html?person=${message.person}&msgid=${key}`
    }
    

    const container = document.getElementById("messagesContainer")
    container.appendChild(elem)
}

window.onload = () => {
    getMessages()
}

