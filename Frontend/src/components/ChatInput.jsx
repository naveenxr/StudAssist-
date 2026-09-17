import React, { useState, useRef } from 'react';
import { Send, Paperclip, Mic, Sparkles } from 'lucide-react';

export default function ChatInput({ onSendMessage, isLoading }) {
  const [text, setText] = useState('');
  const [tooltip, setTooltip] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!text.trim() || isLoading) return;
    onSendMessage(text.trim());
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleDisabledFeature = (featureName) => {
    setTooltip(`${featureName} integration is disabled in prototype mode.`);
    setTimeout(() => setTooltip(''), 3000);
  };

  const handleInput = (e) => {
    setText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0 sticky bottom-0 z-10 shadow-sm">
      <div className="max-w-4xl mx-auto relative">
        {/* Prototype Feature Notice Tooltip */}
        {tooltip && (
          <div role="status" className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 z-20">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
            <span>{tooltip}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative flex items-end bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100/60 focus-within:bg-white transition-all p-2">
          {/* Attachment Placeholder */}
          <button
            type="button"
            onClick={() => handleDisabledFeature('Attachment Upload')}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60 transition-colors mb-0.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            title="Attach file (Disabled in prototype)"
            aria-label="Attach file (Disabled in prototype)"
          >
            <Paperclip className="h-4 w-4" />
          </button>

          {/* Voice Mic Placeholder */}
          <button
            type="button"
            onClick={() => handleDisabledFeature('Voice Input')}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60 transition-colors mb-0.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            title="Voice input (Disabled in prototype)"
            aria-label="Voice input (Disabled in prototype)"
          >
            <Mic className="h-4 w-4" />
          </button>

          {/* Text Area Input */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            aria-label="Ask a question about syllabus, regulations, or notices"
            placeholder="Ask anything about syllabus, regulations, or notices..."
            disabled={isLoading}
            className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none resize-none max-h-32 min-h-[38px] leading-relaxed"
          />

          {/* Send Action Button */}
          <button
            type="submit"
            disabled={!text.trim() || isLoading}
            className={`
              p-2.5 rounded-xl text-white flex items-center justify-center transition-all shrink-0 ml-1 mb-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500
              ${text.trim() && !isLoading 
                ? 'bg-indigo-600 hover:bg-indigo-500 shadow-xs active:scale-95' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
            `}
            title="Send Message"
            aria-label="Send Message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-2 text-center text-[10px] text-slate-400 font-mono">
          <span>StudAssist AI • Academic Regulations 2021 & Syllabus 2024</span>
        </div>
      </div>
    </div>
  );
}
