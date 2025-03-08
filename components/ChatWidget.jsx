"use client";
import React, { useState } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
    // Der Chat wird nur geöffnet, wenn der Nutzer auf das Symbol klickt – er schließt sich nicht automatisch wieder.
    const [open, setOpen] = useState(false);

    return (
        <div>
            {/* Chat-Symbol: Nur sichtbar, wenn das Chatfenster noch nicht offen is */}
            {!open && (
                <div className="chat-icon" onClick={() => setOpen(true)}>
                    <img src="/chat-icon.png" alt="Chat" />
                </div>
            )}
            {/* Chatfenster: Wird angezeigt, wenn open true is */}
            {open && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>Ihr Kundenservice</h3>
                        <button className="chat-close" onClick={() => setOpen(false)}>&times;</button>
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
