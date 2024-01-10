// creates dashboard for the home page after login. includes chartjs and message loading
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
  remove
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

// function deleteMessage(id) {

// }

// Renders boxes on home page/dashboard for their recent chats
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
        <div style="flex-grow: 1"></div>
    `

    // Deletes chats upon click
    const deleteElem = document.createElement("button")
    deleteElem.innerText = "Delete"
    deleteElem.className = "delete-message"
    deleteElem.onclick = (e) => {
        e.stopPropagation()
        console.log(`users/${user.uid}/message/${key}`)
        remove(ref(db, `users/${user.uid}/message/${key}`))
            .then(() => {
                alert("Chat deleted successfully!")
                window.location.reload()
            })
            .catch(e => console.log(e))
    }

    elem.appendChild(deleteElem)

    elem.onclick = () => {
        window.location.href = `/chat.html?person=${message.person}&msgid=${key}`
    }

    const container = document.getElementById("messagesContainer")
    container.appendChild(elem)
}


window.onload = () => {
    // Not signed in alert
    console.log("onload")
    if (user === null) {
        window.location = "/index.html"
        alert("You're not signed in!")
        console.log("window url changed")
    }
    // Load messages from database
    getMessages()
    console.log("running createChart")
    // Create chartjs bar graph
    createChart()
}

// getting data for chartjs
async function getChartData(){
    const messagesList = []

    console.log("bruh", user.uid)
    // Gets data from database
    const snapshot = await get(ref(db, `users/${user.uid}/message`))
    console.log("snapshot: ", snapshot.val())

    if(snapshot.exists()) {
        console.log(snapshot.val())
        snapshot.forEach(child => {
            // Saves key,val pairs from the database nodes
            messagesList.push({ key: child.key, val: child.val() })
        })
    }

    return messagesList
  }

// making the chartjs
async function createChart(){
    console.log("createChart running")

    // Organize the data into lists for the chartjs
    let mKeys = []
    let mVals = []
    // Variable to store # of messages sent to each person
    let totalMessages = {
        "gwash":0,
        "alinc":0,
        "ccolum":0
    }

    // sort through and save the key value pairs from the messages list
    let messagesList = await getChartData()
    messagesList.forEach((m) => {
        mKeys.push(m.key)
        mVals.push(m.val)
    })

    // Go through each chat (gw, linc, etc.) and count up how many messages in each chat
    mVals.forEach((mval) => {
        totalMessages[mval.person] += mval.messages.length
    })
    console.log(`gwash: ${totalMessages["gwash"]}`)

    //create the actual chart
    const ctx = document.getElementById("myChart")
    const myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["George Washington", "Abraham Lincoln", "Christopher Columbus"],
            datasets:[
                {
                    label: `Messages:`,
                    data: [totalMessages["gwash"], totalMessages["alinc"], totalMessages["ccolum"]],
                    fill: false,
                    backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(0, 102, 255, 0.2)", "rgba(0, 153, 51, 0.2)"],
                    borderColor: ["rgba(255, 99, 132, 0.2)", "rgba(0, 102, 255, 0.2)", "rgba(0, 153, 51, 0.2)"],
                    borderWidth: 1,
                },
            ]
        },
        options: {
            responsive: true, // resize based on screen size
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "People", // x-axis title
                        font: {
                            size: 20,
                        },
                    },
                    ticks: {
                        font: {
                            size: 16
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: `Messages Sent`, // y-axis title
                        font: {
                            size: 20,
                        },
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: { // Display options
                title: {
                    display: true,
                    text: "Messages Sent",
                    font: {
                        size: 24
                    },
                    padding: {
                        top: 30,
                        bottom: 30,
                    }
                },
                legend: {
                    display:false,
                }
            }
        },
    })
}