"use server";
import { NextResponse } from "next/server";
import { getClaudeResponse } from "@/modules/claudeApi";
import { sendEmail } from "@/modules/emailHandler";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request) {  // umbenannt zu _request
    try {
        const { message } = await _request.json();
        const responseMessage = await getClaudeResponse(message);
        return NextResponse.json({ response: responseMessage });
    } catch (error) {
        console.error("Error in API route:", error);
        await sendEmail("ZRW-Chatbot Fehlerbericht", `Fehlerdetails: ${error}`);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request) {
    return NextResponse.json({ response: "GET method works" });
}
