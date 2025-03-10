"use server";
import { NextResponse } from "next/server";
import { getClaudeResponse } from "@/modules/claudeApi";
import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI;
const DB_NAME = "zrw-content";
const COLLECTION_NAME = "faqs";

export async function POST(req) {
    try {
        const { message } = await req.json();

        // Verbindung zur MongoDB
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // MongoDB-Suche nach einer passenden Antwort
        const searchResult = await collection
            .find({ $text: { $search: message } })
            .limit(1)
            .toArray();

        let dbResponse = searchResult.length > 0 ? searchResult[0].answer : null;
        let source = "MongoDB"; // Default-Quelle ist MongoDB

        // Falls keine Antwort in der Datenbank → Claude AI fragen
        if (!dbResponse) {
            console.log("⚡ Keine passende Antwort in der Datenbank gefunden – Frage geht an Claude.");
            dbResponse = await getClaudeResponse(message);
            source = "Claude AI";
        }

        await client.close();

        return NextResponse.json({ response: dbResponse, source });

    } catch (error) {
        console.error("❌ Fehler in /api/webhook:", error);
        return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
    }
}
