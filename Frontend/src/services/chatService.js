import { getAuthHeaders, logoutUser } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Sends student query to backend RAG + Tool + OpenRouter AI endpoint
 * @param {string} message 
 * @param {string|null} conversationId 
 * @param {Array} conversationHistory 
 */
export async function sendMessage(message, conversationId = null, conversationHistory = []) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        message,
        conversationId,
        conversationHistory
      })
    });

    if (response.status === 401) {
      logoutUser();
      window.location.href = '/login';
      throw new Error('Session expired. Please log in again.');
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to generate response.');
    }

    return {
      answer: data.data.answer,
      sources: data.data.sources || [],
      toolUsed: data.data.toolUsed || null,
      conversationId: data.data.conversationId || conversationId,
      model: data.data.model || 'AI Assistant'
    };
  } catch (error) {
    console.error('[Chat Service Error]:', error);
    throw error;
  }
}

/**
 * Fetch student's past conversations
 */
export async function getConversations() {
  try {
    const response = await fetch(`${API_BASE_URL}/conversations`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (response.status === 401) {
      logoutUser();
      window.location.href = '/login';
      return [];
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('[Fetch Conversations Error]:', error);
    return [];
  }
}

/**
 * Fetch messages for a specific conversation
 */
export async function getConversationMessages(conversationId) {
  try {
    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (response.status === 401) {
      logoutUser();
      window.location.href = '/login';
      return [];
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('[Fetch Conversation Messages Error]:', error);
    return [];
  }
}
