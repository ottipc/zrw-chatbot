"use client";
import React, { useState } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            {/* Chat-Symbol: Immer sichtbar, öffnet den Chat */}
            {!open && (
                <div className="chat-icon" onClick={() => setOpen(true)}>
                    <img src="/chat-icon.png" alt="Chat" />
                </div>
            )}

            {/* Chatfenster: Wird angezeigt, wenn open true ist */}
            {open && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>Ihr Kundenservice</h3>
                        <button className="chat-close" onClick={() => setOpen(false)}>
                            &times;
                        </button>
                    </div>
                    <iframe
                        src="/chat"
                        title="Chat Window"
                        className="chat-iframe"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
