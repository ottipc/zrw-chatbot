"use client";
import React, { useState } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    // Nachricht senden
    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() !== '') {
            console.log('Nachricht gesendet:', message);
            // Hier die Logik zum Senden der Nachricht implementieren
            setMessage('');
        }
    };

    return (
        <div className="chat-widget-container">
            {/* Chat-Icon: Wird KOMPLETT entfernt, wenn der Chat geöffnet ist */}
            {!open && (
                <div
                    className="chat-icon"
                    onClick={() => setOpen(true)}
                >
                    <img src="/chat-icon.png" alt="Chat" />
                </div>
            )}

            {/* Chatfenster mit integriertem Nachrichtenformular statt iframe */}
            {open && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>Ihr Kundenservice</h3>
                        <button className="chat-close" onClick={() => setOpen(false)}>&times;</button>
                    </div>

                    <div className="chat-messages">
                        {/* Hier würden die Chat-Nachrichten angezeigt */}
                        <div className="message system">
                            Wie können wir Ihnen helfen?
                        </div>
                    </div>

                    <form className="chat-input-form" onSubmit={sendMessage}>
                        <input
                            type="text"
                            className="chat-input"
                            placeholder="Ihre Nachricht..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type="submit" className="send-button">
                            Senden
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;