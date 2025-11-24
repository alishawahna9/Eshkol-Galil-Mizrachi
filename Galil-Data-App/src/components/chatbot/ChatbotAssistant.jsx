import React, { useState, useEffect, useRef } from 'react';
import { BotMessageSquare, X, Minimize2, Send } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const styles = {
  // Bubble (closed state)
  bubble: "fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-br from-[#22A7D6] to-[#1B4C8C] rounded-full shadow-2xl cursor-pointer hover:scale-110 transition-transform flex items-center justify-center z-[10000]",
  bubbleIcon: "w-7 h-7 text-white",

  // Overlay (backdrop)
  overlay: "fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]",

  // Chat window
  window: "fixed bottom-6 left-6 w-96 h-[600px] bg-white dark:bg-[#1B4C8C] rounded-2xl shadow-2xl flex-col overflow-hidden z-[9999]",

  // Header
  header: "bg-gradient-to-r from-[#22A7D6] to-[#1B4C8C] text-white p-4 flex items-center justify-between",
  headerTitle: "font-bold text-lg",
  headerButtons: "flex gap-2",
  headerButton: "w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors",
  headerIcon: "w-4 h-4",

  // Messages container
  messagesContainer: "flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#0F1F38]",
  messageWrapper: "flex",
  messageWrapperUser: "justify-end",
  messageWrapperBot: "justify-start",
  messageBubble: "max-w-[75%] rounded-2xl px-4 py-2 shadow-sm",
  messageBubbleUser: "bg-[#22A7D6] text-white rounded-br-none",
  messageBubbleBot: "bg-white dark:bg-[#1B4C8C] text-gray-800 dark:text-white rounded-bl-none",
  messageText: "text-sm leading-relaxed",

  // Loading dots
  loadingDots: "flex gap-1 py-2",
  loadingDot: "w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce",

  // Input area
  inputContainer: "p-4 bg-white dark:bg-[#1B4C8C] border-t border-gray-200 dark:border-gray-700",
  inputWrapper: "flex gap-2",
  input: "flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-[#0F1F38] text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#22A7D6] text-sm",
  sendButton: "w-10 h-10 bg-[#22A7D6] hover:bg-[#1B4C8C] disabled:bg-gray-300 dark:disabled:bg-gray-600 rounded-full flex items-center justify-center transition-colors",
  sendIcon: "w-5 h-5 text-white"
};

export default function ChatbotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random()}`);
  const [config, setConfig] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadConfig();
  }, []);

  useEffect(() => {
    if (config && isOpen && messages.length === 0) {
      setMessages([{
        message: config.welcome_message || 'שלום! איך אוכל לעזור לך היום?',
        sender: 'bot',
        timestamp: new Date().toISOString()
      }]);
    }
  }, [config, isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConfig = async () => {
    try {
      const configs = await base44.entities.BotConfig.list();
      if (configs.length > 0) {
        setConfig(configs[0]);
      }
    } catch (error) {
      console.error('Failed to load bot config:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      message: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Save user message
      const user = await base44.auth.me();
      await base44.entities.ChatMessage.create({
        message: inputValue,
        sender: 'user',
        session_id: sessionId,
        user_email: user?.email || 'anonymous'
      });

      // Get bot response
      const response = await base44.functions.invoke('chatbotApi', {
        message: inputValue,
        session_id: sessionId
      });

      const botMessage = {
        message: response.data.reply,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);

      // Save bot message
      await base44.entities.ChatMessage.create({
        message: response.data.reply,
        sender: 'bot',
        session_id: sessionId,
        user_email: user?.email || 'anonymous'
      });
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        message: 'מצטער, נתקלתי בבעיה. אנא נסה שוב.',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!config || !config.is_active) {
    return null;
  }

  if (!isOpen) {
    return (
      <div className={styles.bubble} onClick={() => setIsOpen(true)}>
        <BotMessageSquare className={styles.bubbleIcon} />
      </div>
    );
  }

  return (
    <>
      <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      <div className={styles.window} style={{ display: isMinimized ? 'none' : 'flex' }}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>{config.bot_name}</div>
          <div className={styles.headerButtons}>
            <div className={styles.headerButton} onClick={() => setIsMinimized(true)}>
              <Minimize2 className={styles.headerIcon} />
            </div>
            <div className={styles.headerButton} onClick={() => setIsOpen(false)}>
              <X className={styles.headerIcon} />
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messagesContainer}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`${styles.messageWrapper} ${
                msg.sender === 'user' ? styles.messageWrapperUser : styles.messageWrapperBot
              }`}
            >
              <div
                className={`${styles.messageBubble} ${
                  msg.sender === 'user' ? styles.messageBubbleUser : styles.messageBubbleBot
                }`}
              >
                <div className={styles.messageText}>{msg.message}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className={styles.messageWrapper}>
              <div className={`${styles.messageBubble} ${styles.messageBubbleBot}`}>
                <div className={styles.loadingDots}>
                  <div className={styles.loadingDot} style={{ animationDelay: '0ms' }} />
                  <div className={styles.loadingDot} style={{ animationDelay: '150ms' }} />
                  <div className={styles.loadingDot} style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="הקלד הודעה..."
              className={styles.input}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className={styles.sendButton}
            >
              <Send className={styles.sendIcon} />
            </button>
          </div>
        </div>
      </div>

      {isMinimized && (
        <div className={styles.bubble} onClick={() => setIsMinimized(false)}>
          <BotMessageSquare className={styles.bubbleIcon} />
        </div>
      )}
    </>
  );
}