const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const socket = io()




// Retrive the devname and room using qs cdn library
const { devname , room } = Qs.parse(location.search,{
    ignoreQueryPrefix : true
})
socket.emit('Join room',{devname,room})


// All messages received and displayed in the chat
socket.on('message', messageReceived => {
    console.log(messageReceived)
    displayMessage(messageReceived)
    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
})


// Message from the chat - sending
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const messageSent = e.target.elements.msg.value
    socket.emit('chatMessage',messageSent)
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})


socket.on('roomDevs',({devs,room}) => {
    displayRoom(room)
    displayDevs(devs)
})

// Output message to DOM
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

// Output room to DOM 
function displayRoom(room){
    const roomName = document.getElementById('room-name')
    roomName.innerText = room
}

// Output devs to DOM 
function displayDevs(devs){
    const devsNames = document.getElementById('devs')
    devsNames.innerHTML = `
    ${devs.map(dev => `<li>${dev.devname}</li>`).join('')}
    `
}