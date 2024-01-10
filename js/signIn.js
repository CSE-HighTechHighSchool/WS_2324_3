// This file allows users to signin to the website through Firebase
// ----------------- User Sign-In Page --------------------------------------//

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

const database = getDatabase(app)

// ----------------- Firebase Setup & Initialization ------------------------//
// Import the functions you need from the SDKs you need


// ---------------------- Sign-In User ---------------------------------------//

function isEmptyorSpaces(str){
    return str === null || str.match(/^ *$/) !== null
  }
  
// ---------------------- Validate Registration Data -----------------------//
function validation(email, password){
let emailRegex = /^[a-zA-Z0-9]+@(ctemc|gmail|msn|outlook|hotmail)\.(org|com|edu)$/;

if(isEmptyorSpaces(email) || isEmptyorSpaces(password)){
        alert("Please complete all fields.");
        return false;
    }

if(!emailRegex.test(email)){
    alert("Please enter a valid email.");
    return false;
}
return true;
}

document.getElementById("signIn").onclick = () => {
    const email = document.getElementById("loginEmail").value
    const password = document.getElementById("loginPassword").value

    console.log("email: ", email, ", ", password)

    if(!validation(email, password)) {
        return
    }

    signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
            update(ref(database, 'users/' + user.uid + '/accountInfo'), {
                last_login: new Date()
            }).then(() => {

                get(ref(database, 'users/' + user.uid + '/accountInfo')).then(data => {
                    if(data.exists()) {
                        alert("User signed in successfully")
                        console.log(data.val())
                        login(data.val())
                    } else alert("User does not exist")
                })
            }).catch(() => alert("User fetch failed"))
        })
        .catch(() => {
            alert("The email and password you entered did not match our records. Please double-check and try again.")
        })
}

window.onload = () => {

    const user = localStorage.getItem("user")
    console.log(user)
    if(user) {
        sessionStorage.setItem("user", user)
        window.location = "home.html"   
    }
}

// ---------------- Keep User Logged In ----------------------------------//

function login(user) {
    // session storage for current, local storage permanent
    // convert to object
    const keep = document.getElementById("keepLoggedInSwitch").value

    if(keep) {
        localStorage.setItem("user", JSON.stringify(user))
    }

    sessionStorage.setItem('user', JSON.stringify(user))
    window.location = "home.html"
}

function signOut() {
    sessionStorage.removeItem("user")
    localStorage.removeItem("user")
    window.location = "signin.html"
}
