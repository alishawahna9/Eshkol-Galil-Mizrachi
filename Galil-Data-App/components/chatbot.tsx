"use client";

import {useState} from "react";
import {Bot, X} from "lucide-react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end">
      {/* Bubble Button */}
      {!open && (
        <button
          aria-label="Open chatbot"
          onClick={() => setOpen(true)}
          className="bg-primary text-primary-foreground rounded-full shadow-lg w-14 h-14 flex items-center justify-center hover:scale-105 transition-all border-2 border-primary/70 cursor-pointer">
          <Bot className="w-7 h-7" />
        </button>
      )}

      {/* Chatbot Window */}
      {open && (
        <div className="w-80 max-w-[90vw] h-96 bg-background text-foreground rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up border border-border">
          <div className="flex items-center justify-between px-4 py-2 bg-primary text-primary-foreground">
            <span className="font-bold flex items-center gap-2">
              <Bot className="w-5 h-5" />
              צ'אטבוט
            </span>
            <button
              aria-label="Close chatbot"
              onClick={() => setOpen(false)}
              className="hover:bg-primary/20 rounded-full p-1 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">
            {/* Placeholder for chat messages */}
            <div className="text-muted-foreground text-center mt-10">התחל שיחה עם הבוט...</div>
          </div>
          <form className="flex items-center gap-2 p-3 border-t border-border bg-muted">
            <input
              type="text"
              placeholder="כתוב הודעה..."
              className="flex-1 rounded-lg px-3 py-2 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground rounded-lg px-4 py-2 font-medium">
              שלח
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
