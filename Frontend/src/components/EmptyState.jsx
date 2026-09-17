import React from 'react';
import { GraduationCap, Sparkles, BookOpen, ShieldCheck, HelpCircle } from 'lucide-react';
import SuggestedQuestions from './SuggestedQuestions';
import { userProfile } from '../data/mockData';

export default function EmptyState({ onSelectQuestion }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 text-center overflow-y-auto">
      <div className="max-w-xl mx-auto space-y-4 my-auto py-6">
        {/* Brand Icon */}
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-indigo-600 text-white shadow-xs mb-1">
          <GraduationCap className="h-8 w-8 stroke-[1.75]" />
        </div>

        {/* Header Text */}
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-2">
            <Sparkles className="h-3 w-3 text-indigo-600" />
            Welcome back, {userProfile.name}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            How can I assist your studies today?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1.5 leading-relaxed">
            Search live college regulations, look up course credits, check end-sem notices, or review academic policies.
          </p>
        </div>

        {/* Suggested Questions Grid */}
        <SuggestedQuestions onSelectQuestion={onSelectQuestion} />

        {/* Feature Pills */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 text-indigo-500" /> Syllabus 2024
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" /> Academic Regulations
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <HelpCircle className="h-3.5 w-3.5 text-indigo-500" /> Verified Sources
          </span>
        </div>
      </div>
    </div>
  );
}
