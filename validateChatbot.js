// Datei: validateChatbot.js
// Speicherort: /tests/validateChatbot.js

import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;
const DB_NAME = "zrw-content";
const COLLECTION_TEST = "testcases";
const COLLECTION_ANSWERS = "contents";

async function getExpectedTestCases() {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const testCollection = db.collection(COLLECTION_TEST);
    const testCases = await testCollection.find({}).toArray();
    await client.close();
    return testCases;
}

async function getBotResponse(question) {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const contentCollection = db.collection(COLLECTION_ANSWERS);
    
    const result = await contentCollection.findOne({ question });
    await client.close();
    return result ? result.answer : "Keine passende Antwort gefunden.";
}

describe("Chatbot Antwort-Validierung", () => {
    let testCases = [];

    beforeAll(async () => {
        testCases = await getExpectedTestCases();
    });

    testCases.forEach(({ question, expected_answer }) => {
        test(`Validierung: "${question}"`, async () => {
            const response = await getBotResponse(question);
            expect(response).toBe(expected_answer);
        });
    });
});

