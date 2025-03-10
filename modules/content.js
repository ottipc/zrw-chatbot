import fs from "fs";
import path from "path";
import { summarizeText } from "./summarizer";

let cachedContent = "";
let cachedSummary = "";

try {
    const filePath = path.join(process.cwd(), "content", "content.txt");
    cachedContent = fs.readFileSync(filePath, "utf8");
    console.log("Website content loaded:", cachedContent.substring(0, 100));
    cachedSummary = summarizeText(cachedContent);
    console.log("Website summary created:", cachedSummary.substring(0, 100));
} catch (error) {
    console.error("Fehler beim Lesen der Datei:", error);
}

export function getWebsiteContent() {
    return cachedContent;
}

export function getWebsiteSummary() {
    return cachedSummary;
}
