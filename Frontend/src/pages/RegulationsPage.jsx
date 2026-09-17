import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare,
  Menu,
  Scale,
  X
} from 'lucide-react';
import { regulationsData } from '../data/mockData';

export default function RegulationsPage({ onToggleMobileSidebar, onAskAi }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState('reg-1');
  const navigate = useNavigate();

  const categories = ['All', 'Attendance', 'Examination', 'Eligibility', 'Academic Rules'];

  const filteredRegs = regulationsData.filter(reg => {
    const matchesSearch = reg.title.toLowerCase().includes(search.toLowerCase()) || 
                          reg.clause.toLowerCase().includes(search.toLowerCase()) ||
                          reg.content.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || reg.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleAskRegAi = (regTitle, clause) => {
    onAskAi(`Explain ${clause} (${regTitle}) in detail and how it applies to my semester.`);
    navigate('/');
  };

  return (
    <div className="flex-1 flex flex-col h-full min-w-0 bg-slate-50 overflow-y-auto">
      {/* Header */}
      <header className="h-16 px-4 lg:px-6 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="p-2 -ml-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl lg:hidden transition-colors"
            aria-label="Open navigation drawer"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 tracking-tight">Academic Regulations & Policies</h2>
              <p className="text-[11px] text-slate-500">Official University Regulations & Student Governance Rules</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="p-4 sm:p-6 max-w-5xl mx-auto w-full space-y-5">
        {/* Search & Categories Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by clause number (e.g. Clause 4.2), attendance, grading..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search regulations by clause or keyword"
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
            />
            {search && (
              <button 
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear search input"
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider shrink-0 mr-1">Categories:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                aria-label={`Filter regulations by ${cat}`}
                className={`
                  px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0
                  ${selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Regulations Cards */}
        <div className="space-y-3.5">
          {filteredRegs.length === 0 ? (
            <div className="bg-white p-8 text-center rounded-2xl border border-slate-200 text-slate-500 text-xs">
              No regulation clause found matching "{search}"
            </div>
          ) : (
            filteredRegs.map((reg) => {
              const isExpanded = expandedId === reg.id;
              return (
                <div 
                  key={reg.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all"
                >
                  <div 
                    tabIndex={0}
                    role="button"
                    aria-expanded={isExpanded}
                    aria-label={`Regulation ${reg.clause}: ${reg.title}`}
                    onClick={() => setExpandedId(isExpanded ? null : reg.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setExpandedId(isExpanded ? null : reg.id);
                      }
                    }}
                    className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {reg.clause}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                          {reg.category}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          Effective: {reg.effectiveYear}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 tracking-tight">
                        {reg.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {reg.summary}
                      </p>
                    </div>

                    <span className="p-1 text-slate-400 shrink-0 mt-1">
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-5 pt-2 sm:px-5 border-t border-slate-100 bg-slate-50/40 space-y-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
                        <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-1">
                          <Scale className="h-4 w-4" />
                          <span>Full Clause Specification</span>
                        </div>
                        <p className="whitespace-pre-line text-slate-800">
                          {reg.content}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => handleAskRegAi(reg.title, reg.clause)}
                          aria-label={`Ask AI Assistant about ${reg.clause}`}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          Ask AI Assistant about this regulation
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
