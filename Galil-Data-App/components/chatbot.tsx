"use client";

import {useState, useRef, useEffect} from "react";
import {Bot, X, Send, Loader2} from "lucide-react";
import {ChatMessage} from "@/types/chat";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {sendChatMessage} from "@/lib/chat-client";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize empty to prevent Hydration Mismatch
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Load welcome message only on client mount
  useEffect(() => {
    setMessages([
      {
        id: "initial-welcome",
        role: "bot",
        content: "שלום! אני הצ'אטבוט של מרכז המידע גליל מזרחי. איך אני יכול לעזור?",
        createdAt: new Date(),
      },
    ]);
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Inside Chatbot.tsx
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Create and add user message
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      createdAt: new Date(),
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);

    const userQuery = input;
    setInput("");
    setIsLoading(true);

    // Await the reply - no try/catch needed!
    // The client now guarantees a string is returned.
    const reply = await sendChatMessage(userQuery, updatedHistory);

    const botMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "bot",
      content: reply,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-25 left-25 z-50 flex flex-col items-start" dir="rtl">
      {/* Floating Toggle Button - Hidden when chat is open */}
      <Button
        onClick={() => setOpen(true)}
        className={`h-16 px-4 rounded-full shadow-xl hover:scale-105 transition-all duration-200 bg-primary text-primary-foreground border-2 border-primary/20 flex items-center gap-2 ${
          open ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}>
        <Bot className="size-10" />
        <span className="text-sm font-semibold">Eshkol Galil Mizrachi Ai</span>
      </Button>

      {/* Chat Window Wrapper */}
      {/* Header - Negative margin and p-0 on parent fixed the 'lip' */}
      <Card
        className={`
          absolute bottom-0 left-0 w-[90vw] sm:w-[70vw] lg:w-150 h-[80vh] flex flex-col shadow-2xl border-none bg-background p-0 overflow-hidden
          transition-all duration-200 ease-in-out origin-bottom-left
          ${
            open
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 translate-y-10 scale-95 pointer-events-none"
          }
        `}>
        <CardHeader className="p-4 bg-primary text-primary-foreground flex flex-row items-center justify-between space-y-0 rounded-t-xl border-none">
          <div className="flex items-center gap-2">
            <Bot className="size-5" />
            <span className="font-bold text-sm">מרכז מידע גליל מזרחי</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="h-8 w-8 hover:bg-secondary text-primary-foreground transition-colors">
            <X className="size-5" />
          </Button>
        </CardHeader>

        {/* Messages Content */}
        <CardContent className="flex-1 p-3 overflow-hidden bg-background">
          <ScrollArea className="h-full pr-0" ref={scrollRef}>
            <div className="flex flex-col gap-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground self-end rounded-bl-none shadow-sm"
                      : "bg-muted text-foreground self-start rounded-br-none border border-border"
                  }`}>
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-muted p-3 rounded-2xl self-start flex items-center gap-2 border border-border">
                  <Loader2 className="size-4 animate-spin text-primary" />
                  <span className="text-xs text-muted-foreground">מעבד נתונים...</span>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>

        {/* Input Footer */}
        <CardFooter className="p-3 border-t bg-muted/30 rounded-b-xl">
          <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
            <Input
              placeholder="איך אוכל לעזור?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-background focus-visible:ring-primary h-9 text-sm"
            />
            <Button
              type="submit"
              size="icon"
              className="h-9 w-9 shrink-0 transition-opacity"
              disabled={isLoading || !input.trim()}>
              <Send className="size-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
