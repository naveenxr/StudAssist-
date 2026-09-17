import { useState } from 'react';
import { mockConversations } from '../data/mockData';
import { sendMessage as sendApiMessage } from '../services/chatService';

export function useChat() {
  const [recentChats, setRecentChats] = useState(mockConversations);
  const [currentChatId, setCurrentChatId] = useState('conv-1');
  const [messages, setMessages] = useState(mockConversations[0]?.messages || []);
  const [isLoading, setIsLoading] = useState(false);

  // Start a brand new chat session
  const startNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
  };

  // Select a conversation from recent chats list
  const selectChat = (id) => {
    const selected = recentChats.find((c) => c.id === id);
    if (selected) {
      setCurrentChatId(id);
      setMessages(selected.messages || []);
    }
  };

  // Send message using chatService.sendMessage(message, conversationId)
  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMsg = {
      id: `m-usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // 1. Immediately append user message to chat state
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    // Track active conversation ID
    let activeId = currentChatId;
    if (!activeId) {
      activeId = `conv-${Date.now()}`;
      setCurrentChatId(activeId);
      const newChatEntry = {
        id: activeId,
        title: text.length > 28 ? `${text.substring(0, 28)}...` : text,
        timestamp: 'Just now',
        preview: text,
        messages: updatedMessages
      };
      setRecentChats([newChatEntry, ...recentChats]);
    } else {
      setRecentChats(prev => prev.map(chat => {
        if (chat.id === activeId) {
          return {
            ...chat,
            preview: text,
            messages: updatedMessages
          };
        }
        return chat;
      }));
    }

    try {
      // 2. Fetch response from chatService (RAG format: { answer, sources })
      const ragResponse = await sendApiMessage(text, activeId);

      const assistantMsg = {
        id: `m-ai-${Date.now()}`,
        sender: 'assistant',
        text: ragResponse.answer,
        sources: ragResponse.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const finalMessages = [...updatedMessages, assistantMsg];
      setMessages(finalMessages);

      // Update recent chats with assistant response
      setRecentChats(prev => prev.map(chat => {
        if (chat.id === activeId) {
          return { ...chat, messages: finalMessages };
        }
        return chat;
      }));
    } catch (err) {
      console.error('Failed to receive assistant response:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    recentChats,
    currentChatId,
    isLoading,
    sendMessage,
    startNewChat,
    selectChat
  };
}
