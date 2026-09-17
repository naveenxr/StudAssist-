import React from 'react';
import { 
  FileCheck, 
  BookOpen, 
  Bell, 
  GraduationCap, 
  ArrowRight,
  Sparkles 
} from 'lucide-react';
import { suggestedQuestions } from '../data/mockData';

const iconMap = {
  FileCheck: FileCheck,
  BookOpen: BookOpen,
  Bell: Bell,
  GraduationCap: GraduationCap,
};

export default function SuggestedQuestions({ onSelectQuestion }) {
  return (
    <div className="w-full max-w-3xl mx-auto my-4 px-2 sm:px-4">
      <div className="flex items-center justify-center gap-1.5 mb-3 text-slate-500">
        <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
        <h3 className="text-[11px] font-semibold uppercase tracking-wider">
          Suggested Questions
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {suggestedQuestions.map((item) => {
          const IconComponent = iconMap[item.iconName] || BookOpen;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectQuestion(item.text)}
              aria-label={`Ask suggested question: ${item.text}`}
              className="group p-3.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left transition-all shadow-xs flex items-start gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <div className="h-8 w-8 rounded-lg bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <IconComponent className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider block mb-0.5">
                  {item.category}
                </span>
                <p className="text-xs font-medium text-slate-800 group-hover:text-slate-900 line-clamp-2 leading-snug">
                  {item.text}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-600 self-center transition-transform group-hover:translate-x-0.5 shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
