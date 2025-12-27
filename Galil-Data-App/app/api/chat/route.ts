// app/api/chat/route.ts
import {NextResponse} from "next/server";
import {getAuthorityInfo} from "@/lib/chat-service"; // בדיקה אם הייבוא תקין

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const botReply = await getAuthorityInfo(body.message, body.history || []);

    // Always return 200 so the client doesn't "break"
    return NextResponse.json({reply: botReply});
  } catch (error: any) {
    console.error("Internal Logic Error:", error.message);

    // We still return a valid JSON object.
    // Chatbot.tsx sees this as a normal response.
    return NextResponse.json({
      reply: "מצטער, חלה תקלה טכנית. אנא נסה שוב מאוחר יותר.",
      error: error.message, // For debugging, optional to show to user
    });
  }
}
