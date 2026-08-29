// Chat list → chat screen
const chatItems = document.querySelectorAll('.chat-item');
chatItems.forEach(item => {
  item.addEventListener('click', () => {
    window.location.href = 'chat.html';
  });
});

// Back button → chat list
const backBtn = document.querySelector('.back');
if (backBtn) {
  backBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

// Bottom nav
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const label = item.querySelector('span:last-child').textContent;
    if (label === 'Chats') {
      window.location.href = 'index.html';
    } else if (label === 'Settings') {
      window.location.href = 'settings.html';
    }
  });
});

// Fake message data
let messages = [
  { text: "HEY EVERY! IT'S ME, SPAMTON G. SPAMTON!", sender: "received", time: "15:10" },
  { text: "hey you good", sender: "sent", time: "15:12" },
  { text: "pepis", sender: "received", time: "15:13" }
];

const messagesContainer = document.getElementById('messages');

function renderMessages() {
  if (!messagesContainer) return;
  messagesContainer.innerHTML = '';
  messages.forEach(msg => {
    const bubble = document.createElement('div');
    bubble.className = `message ${msg.sender}`;
    bubble.innerHTML = `<p>${msg.text}</p><span class="msg-time">${msg.time}</span>`;
    messagesContainer.appendChild(bubble);
  });
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}
renderMessages();

//wiring up the send button and input box
const messageInput = document.querySelector('.input-bar input');
const sendBtn = document.querySelector('.input-bar .send');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const text = messageInput.value.trim();
    if (text === '') return;
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    messages.push({ text: text, sender: 'sent', time: time });
    renderMessages();
    messageInput.value = '';
  })
}
