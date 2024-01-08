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
    console.log("running createChart")
    createChart()
}

// getting data for chartjs
async function getChartData(){
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

    /* console.log("printing messages list")
    messagesList.forEach((m) => {
        console.log("logging new val & key:")
        console.log(m.val, m.key)
    }) */

    return messagesList
    /* // Dynamically add table rows to HTML using string interpolation
    tBodyEl.innerHTML = ''    // Clear any existing table
    for(let i = 0; i < days.length; i++) {
      addItemToTable(days[i], temps[i], tBodyEl)
    } */
  }

// making the chartjs
async function createChart(){
    console.log("createChart: printing messages list")

    // Organize the data into lists for the chartjs
    let mKeys = []
    let mVals = []
    // Variable to store # of messages sent to each person
    let totalMessages = {
        "gwash":0,
        "alinc":0,
        "ccolum":0
    }

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
                        text: `Messages Sent`, // x-axis title
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