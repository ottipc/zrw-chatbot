"use client";

import { useState, useEffect } from "react";

export default function ChatbotAdmin() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetch("/api/chatbot-entries")
            .then(res => res.json())
            .then(data => setEntries(data));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("/api/chatbot-entries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question, answer })
        });
        if (response.ok) {
            setEntries([...entries, { question, answer }]);
            setQuestion("");
            setAnswer("");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">🔧 Chatbot Fragen & Antworten</h1>
            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="text"
                    placeholder="Frage eingeben"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="border p-2 w-full mb-2"
                    required
                />
                <input
                    type="text"
                    placeholder="Antwort eingeben"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="border p-2 w-full mb-2"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    Speichern 💾
                </button>
            </form>
            <h2 className="text-xl font-bold mt-4 mb-2">📜 Gespeicherte Fragen & Antworten:</h2>
            <ul>
                {entries.map((entry, index) => (
                    <li key={index} className="border-b p-2">
                        <strong>❓ Frage:</strong> {entry.question} <br />
                        <strong>💬 Antwort:</strong> {entry.answer}
                    </li>
                ))}
            </ul>
        </div>
    );
}

