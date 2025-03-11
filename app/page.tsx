"use client";
import React, { useState, useEffect } from 'react';
import './../components/ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animation, setAnimation] = useState('');

  // Animation beim Öffnen und Schließen
  const handleToggleChat = (open: boolean) => {
    if (open) {
      setAnimation('open-animation');
      setIsOpen(true);
    } else {
      setAnimation('close-animation');
      // Warte bis die Animation abgeschlossen ist, bevor der Chat geschlossen wird
      setTimeout(() => {
        setIsOpen(false);
        setAnimation('');
      }, 300);
    }
  };

  // Tastatur-Shortcut zum Schließen (ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleToggleChat(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
      <div className="chat-widget-container">
        {/* Chat-Icon mit pulsierender Animation */}
        {!isOpen && (
            <div
                className="chat-icon-container"
                onClick={() => handleToggleChat(true)}
                aria-label="Chat öffnen"
                role="button"
                tabIndex={0}
            >
              <div className="chat-icon">
                <img src="/chat-icon.png" alt="Chat" />
                <div className="pulse-effect"></div>
              </div>
              <div className="chat-bubble">Haben Sie Fragen?</div>
            </div>
        )}

        {/* Chatfenster mit verbesserten Animationen */}
        {(isOpen || animation === 'close-animation') && (
            <div className={`chat-window ${animation}`}>
              <div className="chat-header">
                <div className="header-content">
                  <div className="online-indicator"></div>
                  <h3>Ihr Kundenservice</h3>
                </div>
                <div className="header-controls">
                  <button
                      className="chat-minimize"
                      onClick={() => handleToggleChat(false)}
                      aria-label="Chat minimieren"
                  >
                    <span>−</span>
                  </button>
                  <button
                      className="chat-close"
                      onClick={() => handleToggleChat(false)}
                      aria-label="Chat schließen"
                  >
                    <span>&times;</span>
                  </button>
                </div>
              </div>
              <div className="chat-body">
                <iframe
                    src="/chat"
                    title="Chat Window"
                    className="chat-iframe"
                    loading="lazy"
                ></iframe>
              </div>
            </div>
        )}
      </div>
  );
};

export default ChatWidget;