"use client";
// components/ChatWidget.jsx
import React, { useState } from 'react';

const ChatWidget = () => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            {/* Chat-Symbol unten rechts */}
            <div
                style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }}
                onClick={() => setOpen(!open)}
            >
                <img src="/chat-icon.png" alt="Chat" style={{ width: '50px', height: '50px' }} />
            </div>
            {/* Chatfenster */}
            {open && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '80px',
                        right: '20px',
                        width: '300px',
                        height: '400px',
                        border: '1px solid #ccc',
                        background: '#fff',
                    }}
                >
                    <iframe
                        src="/chat"
                        title="Chat Window"
                        style={{ width: '100%', height: '100%', border: 'none' }}
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
