"use strict";
import fetch from "node-fetch";
import { getWebsiteSummary } from "./content";

const API_KEY = process.env.CLAUDE_API_KEY;

export async function getClaudeResponse(userMessage) {
    const websiteSummary = getWebsiteSummary();
    // Baue den Prompt mit klaren Anweisungen, ohne den Ursprung des Contents preiszugeben
    const prompt = `Du bist ein professioneller, höflicher und sachlicher Sekretär einer renommierten Möbelrestaurierungsfirma. Bitte beantworte die folgende Kundenanfrage präzise und zielgerichtet. Antworte in der gleichen Sprache, in der die Frage gestellt wurde, und gib eine fundierte, konkrete Antwort zu unseren Leistungen im Bereich Möbelrestaurierung. Falls noch wichtige Details fehlen, frage bitte gezielt nach, bis alle Informationen erfasst sind. Wenn du trotz Nachfragen nicht zu einer vollständigen Antwort kommst, weise den Kunden höflich darauf hin, sich an unseren Support unter mail@zrw-berlin.de zu wenden.

Human: ${userMessage}

Assistant:`;

    const body = {
        model: "claude-2", // oder "claude-2.1", je nachdem, was freigeschaltet ist
        max_tokens: 600,
        system: "You are a helpful assistant.",
        messages: [
            { role: "user", content: prompt }
        ]
    };

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
    console.log("Anthropic response:", data);

    if (data && Array.isArray(data.content) && data.content.length > 0) {
        return data.content[0].text;
    }
    return data;
}
