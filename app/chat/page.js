"use client";
import { useState } from "react";
import { SendHorizontal, Bot, User } from "lucide-react"; // Icons

export default function ChatPage() {
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState([]);

    async function handleSend() {
        if (!userInput.trim()) return;

        try {
            const response = await fetch("/api/webhook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userInput })
            });

            const data = await response.json();
            setMessages(prev => [
                ...prev,
                { role: "user", content: userInput, avatar: "/user.png" },
                { role: "assistant", content: data.response, avatar: "/bot.png", source: data.source }
            ]);
            setUserInput("");
        } catch (error) {
            console.error("❌ Fehler beim Senden der Nachricht:", error);
        }
    }

    return (    
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 shadow-lg">
                <Bot className="h-8 w-8 mr-2" />
                <h1 className="text-xl font-semibold">ZRW Chatbot</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex items-start mb-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        {msg.role !== "user" && (
                            <img src={msg.avatar} alt="Bot" className="w-10 h-10 rounded-full mr-3 border shadow-md" />
                        )}
                        <div className={`max-w-lg px-4 py-2 rounded-lg shadow-md ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-white text-gray-800 border"}`}>
                            <p className="text-sm">{msg.content}</p>
                            {msg.source && <p className="text-xs text-gray-500 mt-1">Quelle: {msg.source}</p>}
                        </div>
                        {msg.role === "user" && (
                            <img src={msg.avatar} alt="User" className="w-10 h-10 rounded-full ml-3 border shadow-md" />
                        )}
                    </div>
                ))}
            </div>

            <div className="p-4 bg-white shadow-md flex">
                <input
                    type="text"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    placeholder="Schreibe eine Nachricht..."
                    className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSend}
                    className="ml-3 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-transform transform hover:scale-105"
                >
                    <SendHorizontal className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
