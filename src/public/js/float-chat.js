document.addEventListener('DOMContentLoaded', function () {
    const chatButton = document.getElementById('chat-button');
    const chatWindow = document.getElementById('chat-window');
    const closeButton = document.getElementById('close-button');


    // Event listener for close button
    closeButton.addEventListener('click', function () {

        chatWindow.style.display = 'none';
    });
});

async function getMessageRoom() {

    var url = '/api/get-room';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // console.log(response)
    var data = await response.json();
    var room = data.room;
    // console.log(room)
    return room
}

async function loadMessage() {
    // console.log('hello')
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow.style.display == 'none') {
        // console.log('Loading message: ', room);
        // var url1 = '/api/get-room/';
        var room = await getMessageRoom();

        var url = '/api/get-message/' + room
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        // //console.log(data.length)
        if (data.data.length > 0) {
            for (let i = 0; i < data.data.length; i++) {
                const message = data.data[i];
                const chatMessages = document.getElementById('chat-messages');
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message'
                const messageElement = document.createElement('li');
                messageElement.className = message.fromAdmin ? 'other-message' : 'self-message';
                messageDiv.appendChild(messageElement);
                messageElement.innerHTML = message.Content;
                chatMessages.appendChild(messageDiv);
            }
        }
        var chatMessages = document.getElementById('chat-messages');
        chatWindow.style.display = 'block';
        chatMessages.scrollTop = chatMessages.scrollHeight;

    }
    else {

        const chatMessages = document.getElementById('chat-messages');
        while (chatMessages.firstChild) {
            chatMessages.removeChild(chatMessages.firstChild);
        }
        chatWindow.style.display = 'none';
    }
    // chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
}
