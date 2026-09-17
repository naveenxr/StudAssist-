import React from 'react';
import ChatHeader from '../components/ChatHeader';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';

export default function ChatPage({ 
  messages, 
  isLoading, 
  onSendMessage, 
  onResetChat, 
  onToggleMobileSidebar 
}) {
  return (
    <div className="flex-1 flex flex-col h-full min-w-0 bg-slate-50 relative overflow-hidden">
      <ChatHeader 
        onToggleMobileSidebar={onToggleMobileSidebar} 
        onResetChat={onResetChat} 
      />

      <ChatWindow 
        messages={messages} 
        isLoading={isLoading} 
        onSelectQuestion={onSendMessage} 
      />

      <ChatInput 
        onSendMessage={onSendMessage} 
        isLoading={isLoading} 
      />
    </div>
  );
}
