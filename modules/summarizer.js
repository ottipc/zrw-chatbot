    // modules/summarizer.js
    export function summarizeText(text) {
        const maxLength = 2000; // Anzahl der Zeichen, die als Summary genutzt werden – anpassbar!
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + "...";
    }
