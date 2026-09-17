import React from 'react';

export default function RecentChats({ chats = [], currentChatId, onSelectChat }) {
  if (chats.length === 0) {
    return (
      <div className="py-4 text-center text-xs text-slate-500">
        No recent chats found
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {chats.map((chat) => {
        const isActive = chat.id === currentChatId;
        return (
          <button
            key={chat.id}
            type="button"
            onClick={() => onSelectChat(chat.id)}
            aria-label={`Open conversation: ${chat.title}`}
            className={`
              w-full text-left p-2.5 rounded-xl text-xs transition-all group border focus:outline-none focus:ring-1 focus:ring-indigo-500
              ${isActive 
                ? 'bg-slate-800 text-white border-slate-700/80 shadow-xs' 
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white border-transparent'}
            `}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className={`font-medium truncate flex-1 ${isActive ? 'text-indigo-300' : 'group-hover:text-slate-100'}`}>
                {chat.title}
              </span>
              <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                {chat.timestamp?.split(',')[0] || ''}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1">
              {chat.preview || 'Conversation query...'}
            </p>
          </button>
        );
      })}
    </div>
  );
}
