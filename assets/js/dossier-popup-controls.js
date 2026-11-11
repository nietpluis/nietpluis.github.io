function sendPopupMessage(message) {
  const targetOrigin = window.location.origin === 'null' ? '*' : window.location.origin;
  window.parent.postMessage(message, targetOrigin);
}

document.querySelectorAll('[data-popup-close]').forEach(button => {
  button.addEventListener('click', () => sendPopupMessage({ type: 'nietpluis-popup-close' }));
});

document.querySelectorAll('[data-popup-open]').forEach(button => {
  button.addEventListener('click', () => {
    sendPopupMessage({ type: 'nietpluis-popup-open', id: button.dataset.popupOpen });
  });
});
