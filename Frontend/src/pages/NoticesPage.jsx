import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Calendar, 
  UserCheck, 
  MessageSquare,
  Menu,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  X
} from 'lucide-react';
import { noticesData } from '../data/mockData';

export default function NoticesPage({ onToggleMobileSidebar, onAskAi }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedNoticeId, setExpandedNoticeId] = useState('not-1');
  const navigate = useNavigate();

  const categories = ['All', 'Examinations', 'Academics', 'Administrative'];

  const filteredNotices = noticesData.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(search.toLowerCase()) || 
                          notice.summary.toLowerCase().includes(search.toLowerCase()) ||
                          notice.content.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || notice.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleAskNoticeAi = (noticeTitle) => {
    onAskAi(`Tell me more details and key deadlines regarding the notice: "${noticeTitle}"`);
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
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 tracking-tight">Official College Notices & Circulars</h2>
              <p className="text-[11px] text-slate-500">Real-time Announcements & Examination Bulletins</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="p-4 sm:p-6 max-w-5xl mx-auto w-full space-y-5">
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search circulars, exam notices, hackathons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search notices and circulars"
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
                aria-label={`Filter notices by ${cat}`}
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

        {/* Notice Cards */}
        <div className="space-y-3.5">
          {filteredNotices.length === 0 ? (
            <div className="bg-white p-8 text-center rounded-2xl border border-slate-200 text-slate-500 text-xs">
              No official notice found matching "{search}"
            </div>
          ) : (
            filteredNotices.map((notice) => {
              const isExpanded = expandedNoticeId === notice.id;
              return (
                <div 
                  key={notice.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all overflow-hidden"
                >
                  <div className="p-4 sm:p-5 space-y-2.5">
                    {/* Header Badges & Date */}
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        {notice.isImportant && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wider">
                            <AlertTriangle className="h-3 w-3 text-amber-600" />
                            Important Notice
                          </span>
                        )}

                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                          {notice.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{notice.date}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 tracking-tight">
                        {notice.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">
                        {notice.summary}
                      </p>
                    </div>

                    {/* Read More Accordion Toggle */}
                    <div className="pt-1 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setExpandedNoticeId(isExpanded ? null : notice.id)}
                        aria-expanded={isExpanded}
                        aria-label={`${isExpanded ? 'Hide' : 'Read full'} details for ${notice.title}`}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded"
                      >
                        <span>{isExpanded ? 'Hide Details' : 'Read Full Notice'}</span>
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAskNoticeAi(notice.title)}
                        aria-label={`Ask AI Assistant about ${notice.title}`}
                        className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        Ask AI Assistant
                      </button>
                    </div>
                  </div>

                  {/* Expanded Notice Details */}
                  {isExpanded && (
                    <div className="px-4 pb-5 pt-3 sm:px-5 border-t border-slate-100 bg-slate-50/50 space-y-3">
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-100 pb-2">
                          <span className="flex items-center gap-1">
                            <UserCheck className="h-3.5 w-3.5 text-indigo-600" />
                            Issued By: <strong>{notice.issuedBy}</strong>
                          </span>
                          <span>Audience: <strong>{notice.targetAudience}</strong></span>
                        </div>
                        <p className="pt-1 text-slate-800 leading-relaxed">
                          {notice.content}
                        </p>
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
