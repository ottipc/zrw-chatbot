"use server";
import { NextResponse } from "next/server";
import { getClaudeResponse } from "@/modules/claudeApi";
import { sendEmail } from "@/modules/emailHandler";

export async function POST(request) {
    try {
        const { message } = await request.json();
        const responseMessage = await getClaudeResponse(message);
        return NextResponse.json({ response: responseMessage });
    } catch (error) {
        await sendEmail("ZRW-Chatbot Fehlerbericht", `Fehlerdetails: ${error}`);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
