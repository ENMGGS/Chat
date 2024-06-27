const socket = io();

socket.on('init', (messages) => {
    const chatBox = document.getElementById('chat-box');
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message other';
        messageElement.innerHTML = `<span>${message.text}</span>`;
        chatBox.appendChild(messageElement);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
});

socket.on('message', (message) => {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = 'message other';
    messageElement.innerHTML = `<span>${message.text}</span>`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    if (messageInput.value.trim() !== '') {
        const messageText = messageInput.value;

        // اضافه کردن پیام به خود کلاینت
        const chatBox = document.getElementById('chat-box');
        const messageElement = document.createElement('div');
        messageElement.className = 'message self';
        messageElement.innerHTML = `<span>${messageText}</span>`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;

        // ارسال پیام به سرور
        socket.emit('message', messageText);
        messageInput.value = '';
    }
}