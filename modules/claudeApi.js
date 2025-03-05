"use strict";
import fetch from "node-fetch";
import { getWebsiteSummary } from "./content";

const API_KEY = process.env.CLAUDE_API_KEY;

export async function getClaudeResponse(userMessage) {
    const websiteSummary = getWebsiteSummary();
    // Baue den Prompt so, dass der Bot als professioneller Sekretär agiert
    const prompt = `You are a professional secretary and knowledgeable consultant. Please answer the following question in the same language in which it was asked. Provide a clear, courteous, and detailed answer, and if any details are missing, ask follow-up questions iteratively until the customer's needs are fully clarified. If you are truly unable to provide a complete answer, politely advise the customer to contact support at mail@zrw-berlin.de.

Human: ${userMessage}

Assistant:`;

    const body = {
        model: "claude-2", // Passe den Modellnamen an, wenn nötig
        max_tokens: 150,
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
