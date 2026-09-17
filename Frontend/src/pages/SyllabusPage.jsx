import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Layers, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare,
  Menu,
  Download,
  CheckCircle2,
  X
} from 'lucide-react';
import { syllabusData } from '../data/mockData';

export default function SyllabusPage({ onToggleMobileSidebar, onAskAi }) {
  const [search, setSearch] = useState('');
  const [selectedSem, setSelectedSem] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');
  const [expandedCode, setExpandedCode] = useState('CS701');
  const navigate = useNavigate();

  const semesters = ['All', 'Semester 5', 'Semester 6', 'Semester 7'];
  const departments = ['All', 'Computer Science & Engineering', 'Information Technology', 'Electronics & Communication', 'Mechanical Engineering'];

  const filteredCourses = syllabusData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || 
                          course.code.toLowerCase().includes(search.toLowerCase()) ||
                          course.description.toLowerCase().includes(search.toLowerCase());
    const matchesSem = selectedSem === 'All' || course.semester === selectedSem;
    const matchesDept = selectedDept === 'All' || course.department === selectedDept;
    return matchesSearch && matchesSem && matchesDept;
  });

  const handleAskCourseAi = (courseTitle, courseCode) => {
    onAskAi(`What is the syllabus and key evaluation criteria for ${courseCode} (${courseTitle})?`);
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
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 tracking-tight">Academic Syllabus Directory</h2>
              <p className="text-[11px] text-slate-500">Official Course Handbooks & Module Specifications</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="p-4 sm:p-6 max-w-5xl mx-auto w-full space-y-5">
        {/* Filters Container */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by subject code (e.g. CS701) or course name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search syllabus by subject code or course name"
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

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between text-xs pt-1 border-t border-slate-100">
            {/* Semester Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider shrink-0 mr-1">Semester:</span>
              {semesters.map((sem) => (
                <button
                  key={sem}
                  type="button"
                  onClick={() => setSelectedSem(sem)}
                  aria-label={`Filter by ${sem}`}
                  className={`
                    px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0
                    ${selectedSem === sem
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}
                  `}
                >
                  {sem}
                </button>
              ))}
            </div>

            {/* Department Filter */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <label htmlFor="dept-select" className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider shrink-0 mr-1">Dept:</label>
              <select
                id="dept-select"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                aria-label="Select department filter"
                className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500 font-medium w-full sm:w-auto"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Subject Cards List */}
        <div className="space-y-3.5">
          {filteredCourses.length === 0 ? (
            <div className="bg-white p-8 text-center rounded-2xl border border-slate-200 text-slate-500 text-xs">
              No subjects found matching the selected filters.
            </div>
          ) : (
            filteredCourses.map((course) => {
              const isExpanded = expandedCode === course.code;
              return (
                <div 
                  key={course.code}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all"
                >
                  {/* Card Header Summary */}
                  <div 
                    tabIndex={0}
                    role="button"
                    aria-expanded={isExpanded}
                    aria-label={`Subject: ${course.code} - ${course.title}`}
                    onClick={() => setExpandedCode(isExpanded ? null : course.code)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setExpandedCode(isExpanded ? null : course.code);
                      }
                    }}
                    className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Subject Code */}
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {course.code}
                        </span>

                        {/* Credits */}
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium">
                          {course.credits} Credits
                        </span>

                        {/* Category */}
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                          {course.category}
                        </span>

                        {/* Semester */}
                        <span className="text-[11px] text-slate-400 font-mono">
                          {course.semester}
                        </span>
                      </div>

                      {/* Subject Name */}
                      <h3 className="text-base font-semibold text-slate-900 tracking-tight">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 mt-1">
                      <span className="p-1 text-slate-400 rounded-lg">
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Detail View */}
                  {isExpanded && (
                    <div className="px-4 pb-5 pt-2 sm:px-5 border-t border-slate-100 bg-slate-50/40 space-y-4">
                      {course.prerequisites && (
                        <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-2">
                          <Award className="h-4 w-4 text-indigo-600 shrink-0" />
                          <span><strong>Prerequisites:</strong> {course.prerequisites}</span>
                        </div>
                      )}

                      <div>
                        <h4 className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Layers className="h-3.5 w-3.5 text-indigo-600" />
                          Course Modules ({course.modules?.length || 0} Units)
                        </h4>
                        <div className="space-y-1.5">
                          {course.modules?.map((mod, idx) => (
                            <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{mod}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/60">
                        <button
                          type="button"
                          onClick={() => handleAskCourseAi(course.title, course.code)}
                          aria-label={`Ask AI Assistant about ${course.code}`}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          Ask AI Assistant about this subject
                        </button>
                        <button 
                          type="button"
                          onClick={() => alert(`Simulating PDF Download for ${course.code} Syllabus`)}
                          aria-label={`Download syllabus PDF for ${course.code}`}
                          className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <Download className="h-3.5 w-3.5 text-slate-500" />
                          Download Syllabus PDF
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
