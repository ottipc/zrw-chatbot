"use client";
import React, { useState } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() === "") return;

        setMessages([...messages, { text: input, sender: "user" }]);
        const userMessage = input;
        setInput("");

        try {
            const response = await fetch("/api/webhook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await response.json();
            if (data.response) {
                setMessages(prevMessages => [...prevMessages, { text: data.response, sender: "bot" }]);
            } else {
                setMessages(prevMessages => [...prevMessages, { text: "Keine passende Antwort aus Supabase/N8N/Claude.", sender: "bot" }]);
            }
        } catch (error) {
            console.error("Fehler bei der Anfrage an die API:", error);
            setMessages(prevMessages => [...prevMessages, { text: "Server-Fehler. Bitte später versuchen.", sender: "bot" }]);
        }
    };

    return (
        <div>
            <div
                className={`chat-icon ${open ? "hidden" : ""}`}
                onClick={() => setOpen(true)}
            >
                <img src="/chat-icon.png" alt="Chat" />
            </div>

            {open && (
                <div className="chat-window upgraded">
                    <div className="chat-header">
                        <h3>💬 Ihr Kundenservice</h3>
                        <button className="chat-close" onClick={() => setOpen(false)}>&times;</button>
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                <span className="message-sender">{msg.sender === "user" ? "👤 Sie" : "🤖 Bot"}</span>
                                <p className="message-text">{msg.text}</p>
                            </div>
                        ))}
                    </div>
                    <form className="chat-input-form" onSubmit={sendMessage}>
                        <input
                            type="text"
                            className="chat-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Nachricht eingeben..."
                        />
                        <button type="submit" className="send-button">Senden</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
