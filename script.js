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
