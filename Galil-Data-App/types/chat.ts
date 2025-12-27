// types/chat.ts

export type MessageRole = "user" | "bot" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
}

export interface ChatApiRequest {
  message: string;
  history: ChatMessage[];
}

export interface ChatApiResponse {
  reply: string;
  error?: string;
}
