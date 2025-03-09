(function() {
  // Chat-Icon erstellen
  const chatIcon = document.createElement('img');
  chatIcon.src = 'https://zrw-chatbot-zeta.vercel.app/chat-icon.png'; // Pfad zu deinem Icon
  chatIcon.alt = 'Chat';
  chatIcon.style.position = 'fixed';
  chatIcon.style.bottom = '20px';
  chatIcon.style.right = '20px';
  chatIcon.style.zIndex = '9999';
  chatIcon.style.width = '60px';
  chatIcon.style.height = '60px';
  chatIcon.style.borderRadius = '50%';
  chatIcon.style.cursor = 'pointer';
  chatIcon.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
  document.body.appendChild(chatIcon);

  let isChatOpen = false;
  let chatWindow = null;

  chatIcon.addEventListener('click', function() {
    if (isChatOpen) return;
    isChatOpen = true;

    // Chat-Fenster
    chatWindow = document.createElement('div');
    chatWindow.style.position = 'fixed';
    chatWindow.style.bottom = '20px';
    chatWindow.style.right = '20px';
    chatWindow.style.width = '360px';
    chatWindow.style.height = '480px';
    chatWindow.style.background = '#fff';
    chatWindow.style.border = '1px solid #ddd';
    chatWindow.style.borderRadius = '10px';
    chatWindow.style.boxShadow = '0 6px 16px rgba(0,0,0,0.4)';
    chatWindow.style.zIndex = '9999';

    // Header
    const header = document.createElement('div');
    header.style.background = '#0073e6';
    header.style.color = '#fff';
    header.style.padding = '12px 16px';
    header.style.borderTopLeftRadius = '10px';
    header.style.borderTopRightRadius = '10px';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';

    const title = document.createElement('h3');
    title.textContent = 'Kundenservice';
    title.style.margin = '0';
    title.style.fontSize = '16px';
    header.appendChild(title);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.background = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.color = '#fff';
    closeBtn.style.fontSize = '20px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.addEventListener('click', function() {
      document.body.removeChild(chatWindow);
      isChatOpen = false;
    });
    header.appendChild(closeBtn);

    chatWindow.appendChild(header);

    // IFrame, um dein Chat-Interface zu laden
    const iframe = document.createElement('iframe');
    iframe.src = 'https://zrw-chatbot-zeta.vercel.app/chat';
    iframe.style.width = '100%';
    iframe.style.height = 'calc(100% - 48px)';
    iframe.style.border = 'none';
    chatWindow.appendChild(iframe);

    document.body.appendChild(chatWindow);
  });
})();

