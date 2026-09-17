import React from 'react';
import { Bot, Sparkles, ShieldCheck } from 'lucide-react';
import SourceCard from './SourceCard';
import { userProfile } from '../data/mockData';

function renderFormattedText(text) {
  if (!text) return null;

  const paragraphs = text.split('\n');
  return paragraphs.map((para, i) => {
    if (!para.trim()) return <div key={i} className="h-2" />;

    // Bolding syntax support
    const parts = para.split(/(\*\*.*?\*\*)/g);
    const content = parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    if (para.trim().startsWith('- ') || para.trim().startsWith('* ')) {
      return (
        <li key={i} className="ml-4 list-disc text-slate-700 leading-relaxed my-1">
          {content}
        </li>
      );
    }

    return (
      <p key={i} className="leading-relaxed my-1">
        {content}
      </p>
    );
  });
}

export default function MessageBubble({ message }) {
  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <div className="flex items-start justify-end gap-3 my-4">
        <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tr-xs bg-slate-900 text-white p-3.5 sm:p-4 shadow-xs">
          <div className="text-xs sm:text-sm font-normal whitespace-pre-wrap leading-relaxed">
            {message.text}
          </div>
          <div className="mt-1.5 text-[10px] text-slate-400 text-right font-mono">
            {message.timestamp || 'Just now'}
          </div>
        </div>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-semibold text-xs flex items-center justify-center shrink-0 border border-indigo-300/20 shadow-xs">
          {userProfile.avatarInitials}
        </div>
      </div>
    );
  }

  // Assistant Message
  return (
    <div className="flex items-start gap-3 my-5">
      <div className="h-8 w-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
        <Bot className="h-4 w-4" />
      </div>

      <div className="max-w-[90%] sm:max-w-[82%] space-y-3">
        <div className="rounded-2xl rounded-tl-xs bg-white border border-slate-200 p-4 shadow-xs text-slate-800 text-xs sm:text-sm">
          <div className="text-slate-700 space-y-1">
            {renderFormattedText(message.text)}
          </div>

          {/* Sources Section */}
          {message.sources && message.sources.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
                <span>Verified Source Documents ({message.sources.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {message.sources.map((src, index) => (
                  <SourceCard key={src.id || index} source={src} />
                ))}
              </div>
            </div>
          )}

          {/* AI generated tag */}
          <div className="mt-3 pt-2 flex items-center justify-between border-t border-slate-100 text-[10px] text-slate-400">
            <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
              <Sparkles className="h-3 w-3 text-indigo-500" />
              AI generated from verified college resources
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              {message.timestamp || 'Just now'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
