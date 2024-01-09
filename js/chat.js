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
const db = getDatabase(app)

const HF_API_TOKEN = "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" // this is MY (Vishrut's) API token, and for the sake of convenience I'm using it here. Please don't steal it because it will make me very sad :_(

// utils to add message to DOM
const messageContainer = $(".message-container")


const createMessage = message => $(`<div>${message}</div>`).attr("class", "message") // create inner message

// align user message and bot message on different sides for each function
const createUserMessage = (message) => $("<div></div>").attr("class", "user-message-container").append(createMessage(message)) 
const createBotMessage = (message) => $("<div></div>").attr("class", "bot-message-container").append(createMessage(message))


const user = JSON.parse(sessionStorage.getItem("user"))

function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    console.log(charactersLength)
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

let messagesId = new URLSearchParams(window.location.search).get("msgid")


async function setMessage(messages) {
    console.log(manager.messages)
    if(manager.messages.length < 2) {
        messagesId = makeId(32)
        await set(ref(db, `users/${user.uid}/message/${messagesId}`), {
            person: param,
            messages: messages,
            lastUpdated: new Date()
        })
    } else {
        await update(ref(db, `users/${user.uid}/message/${messagesId}`), {
            messages: messages,
            lastUpdated: new Date()
        })
    }
}

async function getMessages(messagesId) {
    if(messagesId) {
        const snapshot = await get(ref(db, `users/${user.uid}/message/${messagesId}`))
        console.log(snapshot.val())
        if(snapshot.exists()) {
            return {
                initMessages: snapshot.val()["messages"],
                param: snapshot.val()["person"]
            }
        }
    }
    return {
        initMessages: [],
        param: new URLSearchParams(window.location.search).get("person")
    }
}


// class to manage adding messages and storing a list of messages for later use (chat history)
class MessageManager {
    messages = []

    constructor(initMessages) {
        this.messages = initMessages
        console.log(this.messages)
        this.messages.forEach(m => {
            if(m.who === "user") {
                const node = createUserMessage(m.message)
                messageContainer.append(node)
            } else {
                const node = createBotMessage(m.message)
                messageContainer.append(node)
            }
        })
    }

    // appends user message node
    async addUserMessage(message) {
        this.messages.push({ who: "user", message, date: new Date() })
        const node = createUserMessage(message)
        messageContainer.append(node)
        await setMessage(this.messages)
    }

    // appends bot message node
    async addBotMessage(message) {
        this.messages.push({ who: "assistant", message, date: new Date() })
        const node = createBotMessage(message)
        messageContainer.append(node)
        await setMessage(this.messages)
    }
}

const { initMessages, param } = await getMessages(messagesId)
console.log(initMessages)

// pre-appended prompts to each message per person to make the chatbot sound like the person in question
const prompts = {
    gwash: "You are George Washington. Speak like an American man from the 18th century and refer to historical events that George Washington participated in. Answer the following query accordingly using this information: ",
    alinc: "You are Abraham Lincoln. Speak like an American man from the 18th century and refer to historical events that Abraham Lincoln participated in. Answer the following query accordingly using this information: ",
    ccolum: "You are Christopher Columbus. Speak like a European man from the 17th century and refer to historical events that Christopher Columbus participated in. Answer the following query accordingly using this information: "
}

// use query params to get the current person

// if no param provided, alert user redirect to choose a person
if(!param) {
    alert("Person not specified, please choose a person first")
    window.location.pathname = window.location.pathname.split("/").slice(0, -1).join("/") + "/choose.html"
}

const prompt = prompts[param]

// create the profile image and text for the person
document.getElementById("profile").setAttribute("src", `img/${param}.png`)
document.getElementById("profileText").innerText = param === "gwash" ? "George Washington" : param === "alinc" ? "Abraham Lincoln" : "Christopher Columbus"

const manager = new MessageManager(initMessages)

// handler that runs when message is posted
const sendReq = async message => {

    // fetch call to Huggingface inference API, using Mistral-7B-instruct model (chatgpt but smaller and free to use)
    const res = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${HF_API_TOKEN}` // provide API token
        },
        body: JSON.stringify({
            inputs: `[INST]${(prompt ? prompt : "") + message}[/INST]`, // stringified body, uses [INST] to denote an instruction in the prompt
            parameters: {
                max_new_tokens: 100 // tokens generated per message (NOTE: this might cut off, but this is the max reliable token count, otherwise the model may not respond properly)
            }
        })
    })

    // parse data as json and return the text
    const data = await res.json() 

    if(!data) {
        manager.addBotMessage("The API is overloaded right now, please try again later")
        return
    }

    console.log("data: ", data[0].generated_text)

    return data[0].generated_text.split("] ")[1] // split removes [INST] token at start
}


// append a user message, fetch and setup bot message when enter is clicked on the chat box
window.onkeydown = async function(e) {
    if(e.key === "Enter") {
        const input = document.getElementById("chatbox")
        const message = input.value
        manager.addUserMessage(message)
        const output = await sendReq(message)
        manager.addBotMessage(output)
        document.getElementById("chatbox").value = ""
    }
}
window.onload = () => {
    console.log("onload")
    if (user === null) {
        window.location = "/index.html"
        alert("You're not signed in!")
        console.log("window url changed")
    }
}