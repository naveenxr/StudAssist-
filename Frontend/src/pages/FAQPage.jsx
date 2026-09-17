import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Tag, 
  MessageSquare,
  Menu,
  X
} from 'lucide-react';
import { faqData } from '../data/mockData';

export default function FAQPage({ onToggleMobileSidebar, onAskAi }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState('faq-1');
  const navigate = useNavigate();

  const categories = ['All', 'Examinations', 'Academics', 'Administrative', 'Library & Facilities', 'Placements'];

  const filteredFaqs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(search.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(search.toLowerCase()) ||
                          faq.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleAskFaqAi = (question) => {
    onAskAi(question);
    navigate('/');
  };

  return (
    <div className="flex-1 flex flex-col h-full min-w-0 bg-slate-50 overflow-y-auto">
      {/* Page Header */}
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
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 tracking-tight">Student Knowledge Base & FAQs</h2>
              <p className="text-[11px] text-slate-500">Searchable Answers & Frequently Asked Questions</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="p-4 sm:p-6 max-w-5xl mx-auto w-full space-y-5">
        {/* Search & Category Tabs */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search FAQs by topic (e.g. medical leave, NPTEL, bona fide)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search FAQs by topic or keyword"
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
                aria-label={`Filter FAQs by ${cat}`}
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

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white p-8 text-center rounded-2xl border border-slate-200 text-slate-500 text-xs">
              No FAQ found matching "{search}"
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all"
                >
                  <div 
                    tabIndex={0}
                    role="button"
                    aria-expanded={isExpanded}
                    aria-label={`FAQ Question: ${faq.question}`}
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setExpandedId(isExpanded ? null : faq.id);
                      }
                    }}
                    className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 tracking-tight">
                        {faq.question}
                      </h3>
                    </div>

                    <span className="p-1 text-slate-400 shrink-0 mt-1">
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-5 pt-2 sm:px-5 border-t border-slate-100 bg-slate-50/40 space-y-4">
                      <p className="text-xs text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                        {faq.answer}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Tag className="h-3 w-3 text-slate-400" />
                          {faq.tags.map((tag) => (
                            <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAskFaqAi(faq.question)}
                          aria-label={`Ask AI Assistant follow-up question regarding ${faq.question}`}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          Ask AI follow-up question
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
