if (window.parent !== window) {
  document.addEventListener('click', () => {
    window.parent.postMessage({ type: 'nietpluis-card-flip' }, '*');
  });
}
