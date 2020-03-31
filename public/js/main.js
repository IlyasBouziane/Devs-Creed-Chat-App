
const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const socket = io()

// all messages received and displayed in the chat
socket.on('message', messageReceived => {
    console.log(messageReceived)
    displayMessage(messageReceived)
    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
})


// message from the chat - sending
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const messageSent = e.target.elements.msg.value
    socket.emit('chatMessage',messageSent)
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

// output message to DOM
function displayMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `
                        <p class="meta">${message.devname} <span>${message.time}</span></p>
						<p class="text">
							${message.messageText}
						</p>
    `

    document.querySelector('.chat-messages').appendChild(div)


}