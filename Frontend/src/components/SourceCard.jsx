import React from 'react';
import { FileText, Bookmark, ExternalLink } from 'lucide-react';

export default function SourceCard({ source }) {
  if (!source) return null;

  const relevancePercent = source.relevance !== undefined && source.relevance !== null
    ? Math.round(source.relevance * 100)
    : null;

  const handleSourceClick = () => {
    alert(`Source Reference Citation:\n\nTitle: ${source.title}\nCategory: ${source.category}\nRelevance: ${source.relevance !== undefined ? `${source.relevance} (${relevancePercent}% Match)` : 'N/A'}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSourceClick();
    }
  };

  return (
    <div 
      role="button"
      tabIndex={0}
      onClick={handleSourceClick}
      onKeyDown={handleKeyDown}
      aria-label={`Source Citation: ${source.title}, Category: ${source.category}`}
      className="group cursor-pointer bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl p-3 text-left transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
          <Bookmark className="h-2.5 w-2.5 text-indigo-600" />
          {source.category || 'Reference'}
        </span>

        {relevancePercent !== null && (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
            {relevancePercent}% Match
          </span>
        )}
      </div>

      <h4 className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 line-clamp-2 transition-colors leading-snug">
        {source.title}
      </h4>

      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
        <span className="truncate flex items-center gap-1">
          <FileText className="h-3 w-3 text-slate-400 shrink-0" />
          {source.category ? `${source.category} Document` : 'RAG Source'}
        </span>
        <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
      </div>
    </div>
  );
}
