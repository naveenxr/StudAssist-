import React from 'react';
import { Menu, Bot, RotateCcw, Info } from 'lucide-react';

export default function ChatHeader({ onToggleMobileSidebar, onResetChat, title = "Student Support Assistant" }) {
  return (
    <header className="h-16 px-4 lg:px-6 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Hamburger Toggle */}
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="p-2 -ml-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl lg:hidden transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
          aria-label="Open sidebar drawer"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold text-slate-900 tracking-tight">{title}</h1>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                AI Assistant
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Verified Academic Regulations & Syllabus Desk</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onResetChat}
          title="Clear thread & start new chat"
          aria-label="Reset current conversation"
          className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl flex items-center gap-1.5 transition-colors border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Reset Chat</span>
        </button>

        <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200 font-mono">
          <Info className="h-3.5 w-3.5 text-indigo-500" />
          <span>AY 2024–25</span>
        </div>
      </div>
    </header>
  );
}
