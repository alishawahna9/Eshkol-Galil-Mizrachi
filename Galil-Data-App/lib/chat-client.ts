// lib/chat-client.ts
import {ChatMessage, ChatApiRequest, ChatApiResponse} from "@/types/chat";

export async function sendChatMessage(message: string, history: ChatMessage[]): Promise<string> {
  try {
    const payload: ChatApiRequest = {message, history};

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload),
    });

    // Handle Non-200 responses (500, 404, etc.)
    if (!response.ok) {
      const rawError = await response.text();
      console.error("Server Raw Error:", rawError);

      try {
        const jsonError = JSON.parse(rawError);
        return jsonError.reply || jsonError.error || "מצטער, השרת נתקל בשגיאה. נסה שוב מאוחר יותר.";
      } catch {
        return "חלה שגיאה בשרת המידע. המערכת תתאושש בקרוב.";
      }
    }

    const data: ChatApiResponse = await response.json();
    return data.reply || "התקבלה תשובה ריקה מהמערכת.";
  } catch (error) {
    // This handles network failures (offline, DNS issues)
    console.error("Network Error:", error);
    return "שגיאת תקשורת. וודא שאתה מחובר לאינטרנט ונסה שנית.";
  }
}
