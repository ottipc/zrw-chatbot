"use client";
import { useState } from "react";

export default function ChatPage() {
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState([]);

    async function handleSend() {
        try {
            const response = await fetch("/api/webhook", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: userInput })
            });
            const data = await response.json();
            setMessages(prev => [
                ...prev,
                { role: "user", content: userInput },
                { role: "assistant", content: data.response }
            ]);
            setUserInput("");
        } catch (error) {
            console.error("Fehler beim Senden der Nachricht:", error);
        }
    }

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Chat Interface</h1>
            <div style={{
                border: "1px solid #ccc",
                height: "220px",
                overflowY: "auto",
                marginBottom: "1rem",
                padding: "0.5rem"
            }}>
                {messages.map((msg, idx) => (
                    <div key={idx}>
                        <strong>{msg.role}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                placeholder="Tippe deine Nachricht hier..."
                style={{ width: "70%", marginRight: "0.5rem" }}
            />
            <button onClick={handleSend}>Senden</button>
        </div>
    );
}
