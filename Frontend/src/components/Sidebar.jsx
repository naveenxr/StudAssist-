import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Plus, 
  Search, 
  MessageSquare, 
  BookOpen, 
  ShieldCheck, 
  Bell, 
  HelpCircle, 
  X,
  LogOut
} from 'lucide-react';
import RecentChats from './RecentChats';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ 
  recentChats = [], 
  currentChatId, 
  onSelectChat, 
  onNewChat,
  mobileOpen = false,
  setMobileOpen = () => {} 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Chat Assistant', path: '/chat', icon: MessageSquare },
    { label: 'Syllabus', path: '/syllabus', icon: BookOpen },
    { label: 'Regulations', path: '/regulations', icon: ShieldCheck },
    { label: 'Notices', path: '/notices', icon: Bell },
    { label: 'FAQs', path: '/faqs', icon: HelpCircle },
  ];

  const handleStartNewChat = () => {
    onNewChat();
    navigate('/chat');
    if (mobileOpen) setMobileOpen(false);
  };

  const handleSelectRecent = (id) => {
    onSelectChat(id);
    navigate('/chat');
    if (mobileOpen) setMobileOpen(false);
  };

  const filteredChats = recentChats.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (chat.preview && chat.preview.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getInitials = (nameStr) => {
    if (!nameStr) return 'ST';
    return nameStr
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Panel */}
      <aside 
        aria-label="Sidebar Navigation"
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto shrink-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header / Brand */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white tracking-tight text-sm">StudAssist</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Student Support SaaS</p>
            </div>
          </NavLink>
          
          <button 
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg lg:hidden hover:bg-slate-800 transition-colors"
            aria-label="Close sidebar navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            type="button"
            onClick={handleStartNewChat}
            className="w-full py-2.5 px-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99]"
            aria-label="Start new conversation"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>New Conversation</span>
          </button>
        </div>

        {/* Search Conversations Input */}
        <div className="px-3 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search conversations"
              className="w-full pl-8 pr-3 py-1.5 bg-slate-800/70 text-xs text-slate-200 placeholder-slate-500 rounded-lg border border-slate-700/60 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Main Navigation Links */}
        <nav aria-label="Main Menu" className="px-3 py-2 border-b border-slate-800/80 space-y-0.5">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-2 py-1">
            Menu
          </div>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all
                  ${isActive 
                    ? 'bg-slate-800 text-indigo-400 border-l-2 border-indigo-500 pl-2.5 font-semibold' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}
                `}
              >
                <IconComponent className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Recent Activity List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-2 py-1 mb-1">
            Recent Activity
          </div>
          <RecentChats
            chats={filteredChats}
            currentChatId={currentChatId}
            onSelectChat={handleSelectRecent}
          />
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          <div 
            className="flex items-center justify-between p-2 rounded-xl bg-slate-800/50 border border-slate-800"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-semibold text-xs flex items-center justify-center border border-indigo-300/20">
                  {getInitials(user?.name || user?.email)}
                </div>
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-100 truncate">{user?.name || 'Student'}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email || 'Authenticated'}</p>
              </div>
            </div>
            
            <button
              type="button"
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4 shrink-0" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
