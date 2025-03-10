import mongodb from 'mongodb';
const { MongoClient } = mongodb;
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log("🔍 DEBUG MONGO_URI:", process.env.MONGODB_URI); // DEBUG    b

import fs from "fs";

const MONGO_URI = process.env.MONGODB_URI;
const DB_NAME = 'zrw-content';
const COLLECTION_NAME = 'faqs';
const FILE_PATH = path.join(__dirname, '../content/content.txt');
(async () => {
    const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('✅ Verbunden mit MongoDB');
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // Löscht alte Daten, um eine saubere Neu-Importierung zu ermöglichen
        await collection.deleteMany({});
        console.log('🗑️ Alte Daten gelöscht');

        // Datei einlesen
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        const lines = data.split('\n');

        let docs = [];
        let currentCategory = '';

        for (let line of lines) {
            line = line.trim();
            if (!line) continue; // Leere Zeilen überspringen

            if (line.startsWith('# ')) {
                currentCategory = line.replace('# ', '').trim();
                continue;
            }

            const [question, answer] = line.split('? ');
            if (question && answer) {
                docs.push({
                    question: question.trim() + '?',
                    answer: answer.trim(),
                    category: currentCategory,
                    createdAt: new Date()
                });
            }
        }

        if (docs.length > 0) {
            await collection.insertMany(docs);
            console.log(`✅ ${docs.length} Einträge erfolgreich in MongoDB gespeichert`);
        } else {
            console.log('⚠️ Keine gültigen Inhalte zum Import gefunden');
        }
    } catch (error) {
        console.error('❌ Fehler beim Import:', error);
    } finally {
        await client.close();
        console.log('🔌 Verbindung geschlossen');
    }
})();
