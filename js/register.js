// This JS file is for registering a new app user ---------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//
// Import the functions you need from the SDKs you need
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


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth();

// Returns instance of your app's FRD
const db = getDatabase(app)


// ---------------- Register New User --------------------------------//

document.getElementById('submitData').onclick = function(){
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('userEmail').value;

  // Firebase requires a password of at least 6 characters
  const password = document.getElementById('userPass').value;

  // Validate the user inputs
  if(!validation(firstName, lastName, email, password)){
    return;
  };

  // Create new app user using email/password auth
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Create user credential
    const user = userCredential.user;
    
    console.log(user)

    // Add user account info to the FRD
    // set function will create a new ref. or completely replace existing one
    // Each new user will be placed under the 'users' node
    set(ref(db, 'users/' + user.uid + '/accountInfo'), {
      uid: user.uid, // save userID for home.js reference
      email: email,
      password: encryptPass(password),
      firstname: firstName,
      lastname: lastName
    })
    .then(() =>{
      // Data saved successfully
      alert('User created successfully!')
      window.location.href = "login.html"
    })
    // .catch((error) => {
    //   // The write failed...
    //   alert(error)
    // });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });
}


// --------------- Check for null, empty ("") or all spaces only ------------//
function isEmptyorSpaces(str){
  return str === null || str.match(/^ *$/) !== null
}

// ---------------------- Validate Registration Data -----------------------//
function validation(firstName, lastName, email, password){
  let fNameRegex = /^[a-zA-Z]+$/;
  let lNameRegex = /^[a-zA-Z]+$/;
  let emailRegex = /^[a-zA-Z0-9]+@(ctemc|gmail|msn|outlook|hotmail)\.(org|com|edu)$/;

  if(isEmptyorSpaces(firstName) || isEmptyorSpaces(lastName)  ||
      isEmptyorSpaces(email) || isEmptyorSpaces(password)){
        alert("Please complete all fields.");
        return false;
      }

  if(!fNameRegex.test(firstName)){
    alert("The first name should only contain lettes.");
    return false;
  }

  if(!lNameRegex.test(lastName)){
    alert("The last name should only contain lettes.");
    return false;
  }

  if(!emailRegex.test(email)){
    alert("Please enter a valid email.");
    return false;
  }
  return true;
}

// --------------- Password Encryption -------------------------------------//
function encryptPass(password){
  let encrypted = CryptoJS.AES.encrypt(password, password);
  return encrypted.toString();
}

window.onload = () => {
  const user = localStorage.getItem("user")
  console.log(user)
  if(user) {
      sessionStorage.setItem("user", user)
      window.location = "home.html"   
  }
}