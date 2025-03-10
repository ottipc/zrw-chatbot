"use strict";
import fetch from "node-fetch";

const API_KEY = process.env.CLAUDE_API_KEY;

export async function getClaudeResponse(userMessage) {
    const prompt = `Du bist ein professioneller, höflicher und sachlicher Sekretär einer renommierten Möbelrestaurierungsfirma. Bitte beantworte die folgende Kundenanfrage präzise und zielgerichtet. Antworte in der gleichen Sprache, in der die Frage gestellt wurde.

Human: ${userMessage}

Assistant:`;

    const body = {
        model: "claude-3", // Upgrade auf Claude 3
        max_tokens: 600,
        system: "You are a helpful assistant.",
        messages: [{ role: "user", content: prompt }]
    };

    try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log("🔍 Claude API Antwort:", data);

        if (data && data.content?.length > 0) {
            return data.content[0].text;
        }
        return "❌ Claude konnte keine Antwort generieren.";
    } catch (error) {
        console.error("❌ Fehler bei Claude API:", error);
        return "❌ Fehler bei Claude API-Anfrage.";
    }
}
