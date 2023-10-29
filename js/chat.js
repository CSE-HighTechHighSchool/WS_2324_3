
const HF_API_TOKEN = "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"

const messageContainer = $(".message-container")

const createMessage = message => $(`<div>${message}</div>`).attr("class", "message")

const createUserMessage = (message) => $("<div></div>").attr("class", "user-message-container").append(createMessage(message))
const createBotMessage = (message) => $("<div></div>").attr("class", "bot-message-container").append(createMessage(message))

class MessageManager {
    messages = []

    addUserMessage(message) {
        this.messages.push({ who: "user", message })
        const node = createUserMessage(message)
        messageContainer.append(node)
    }

    addBotMessage(message) {
        this.messages.push({ who: "assistant", message })
        const node = createBotMessage(message)
        messageContainer.append(node)
    }
}

const prompts = {
    gwash: "You are George Washington. Answer the following query accordingly: ",
    alinc: "You are Abraham Lincoln. Answer the following query accordingly: ",
    troose: "You are Theodore Roosevelt. Answer the following query accordingly: ",
    sjobs: "You are Steve Jobs. Answer the following query accordingly: "
}

const param = new URLSearchParams(window.location.search).get("person")

const prompt = prompts[param]

const manager = new MessageManager()

const sendReq = async message => {

    const res = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${HF_API_TOKEN}`
        },
        body: JSON.stringify({
            inputs: `[INST]${(prompt ? prompt : "") + message}[/INST]`,
            parameters: {
                max_new_tokens: 100
            }
        })
    })

    const data = await res.json()

    console.log("data: ", data[0].generated_text)

    return data[0].generated_text.split("] ")[1]
}

console.log("testinggg")

const input = document.getElementById("chatbox")
console.log("input: ", input)

window.onkeydown = async function(e) {
    console.log("test")
    if(e.key === "Enter") {
        console.log("entering")
        const input = document.getElementById("chatbox")
        const message = input.value
        console.log("getting value: ", message)
        manager.addUserMessage(message)
        const output = await sendReq(message)
        manager.addBotMessage(output)
        document.getElementById("chatbox").value = ""
    }
}
