import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import SyllabusPage from './pages/SyllabusPage';
import RegulationsPage from './pages/RegulationsPage';
import NoticesPage from './pages/NoticesPage';
import FAQPage from './pages/FAQPage';
import LoginPage from './pages/LoginPage';
import VerifyLoginPage from './pages/VerifyLoginPage';
import SignupPage from './pages/SignupPage';
import VerifySignupPage from './pages/VerifySignupPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useChat } from './hooks/useChat';

export default function App() {
  const { 
    messages, 
    recentChats, 
    currentChatId, 
    isLoading, 
    sendMessage, 
    startNewChat, 
    selectChat 
  } = useChat();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Shortcut from sub-pages to query AI in Chat
  const handleAskAiFromPage = (queryText) => {
    startNewChat();
    sendMessage(queryText);
  };

  return (
    <Routes>
      {/* Public Landing & Authentication Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify-login" element={<VerifyLoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/verify-signup" element={<VerifySignupPage />} />

      {/* Authenticated Protected App Shell */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="flex h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
              {/* Sidebar Navigation */}
              <Sidebar 
                recentChats={recentChats}
                currentChatId={currentChatId}
                onSelectChat={selectChat}
                onNewChat={startNewChat}
                mobileOpen={mobileSidebarOpen}
                setMobileOpen={setMobileSidebarOpen}
              />

              {/* Main View Area */}
              <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
                <Routes>
                  <Route 
                    path="/chat" 
                    element={
                      <ChatPage 
                        messages={messages}
                        isLoading={isLoading}
                        onSendMessage={sendMessage}
                        onResetChat={startNewChat}
                        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                      />
                    } 
                  />
                  <Route 
                    path="/syllabus" 
                    element={
                      <SyllabusPage 
                        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                        onAskAi={handleAskAiFromPage}
                      />
                    } 
                  />
                  <Route 
                    path="/regulations" 
                    element={
                      <RegulationsPage 
                        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                        onAskAi={handleAskAiFromPage}
                      />
                    } 
                  />
                  <Route 
                    path="/notices" 
                    element={
                      <NoticesPage 
                        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                        onAskAi={handleAskAiFromPage}
                      />
                    } 
                  />
                  <Route 
                    path="/faqs" 
                    element={
                      <FAQPage 
                        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                        onAskAi={handleAskAiFromPage}
                      />
                    } 
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
