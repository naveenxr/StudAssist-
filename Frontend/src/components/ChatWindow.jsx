import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import EmptyState from './EmptyState';
import { Bot, Sparkles } from 'lucide-react';

export default function ChatWindow({ messages = [], isLoading = false, onSelectQuestion }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  if (!messages || messages.length === 0) {
    return <EmptyState onSelectQuestion={onSelectQuestion} />;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
      <div className="max-w-4xl mx-auto">
        {messages.map((msg, index) => (
          <MessageBubble key={msg.id || index} message={msg} />
        ))}

        {isLoading && (
          <div className="flex items-start gap-3 my-4 animate-fadeIn">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Bot className="h-5 w-5" />
            </div>
            <div className="rounded-2xl rounded-tl-xs bg-white border border-slate-200 px-4 py-3.5 shadow-xs flex items-center gap-3">
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500 animate-spin" />
                StudAssist AI is researching documents...
              </span>
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 bg-indigo-500 rounded-full typing-dot"></div>
                <div className="h-1.5 w-1.5 bg-indigo-500 rounded-full typing-dot"></div>
                <div className="h-1.5 w-1.5 bg-indigo-500 rounded-full typing-dot"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
