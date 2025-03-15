// Datei: /app/api/chatbot-entries/route.ts
// Zweck: API-Route zum Speichern und Abrufen von Chatbot-Fragen & Antworten

import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;
const DB_NAME = "zrw-content";
const COLLECTION_NAME = "chatbot_entries";

let client;
let db;

async function connectDB() {
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
        db = client.db(DB_NAME);
    }
    return db.collection(COLLECTION_NAME);
}

// GET: Alle Chatbot-Einträge abrufen
export async function GET() {
    try {
        const collection = await connectDB();
        const entries = await collection.find({}).toArray();
        return NextResponse.json(entries);
    } catch (error) {
        return NextResponse.json({ error: "Fehler beim Abrufen der Daten" }, { status: 500 });
    }
}

// POST: Einen neuen Eintrag hinzufügen
export async function POST(req) {
    try {
        const collection = await connectDB();
        const { question, answer } = await req.json();
        if (!question || !answer) {
            return NextResponse.json({ error: "Frage und Antwort sind erforderlich" }, { status: 400 });
        }
        await collection.insertOne({ question, answer });
        return NextResponse.json({ message: "Eintrag gespeichert" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Fehler beim Speichern der Daten" }, { status: 500 });
    }
}

