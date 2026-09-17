/**
 * Tool Router Service
 * Evaluates user questions and determines if a specialized backend database tool should be executed.
 */

// Helper to normalize common student spelling typos
const normalizeTypos = (text) => {
  return text
    .toLowerCase()
    .replace(/\b(sylabbus|sylabus|syllabos|silabus|syllubus)\b/g, 'syllabus')
    .replace(/\b(attandance|atendance|attandence|attendence)\b/g, 'attendance')
    .replace(/\b(exm|exms|examm|examation|examinaton)\b/g, 'exam')
    .replace(/\b(notic|notis|notces|circuler)\b/g, 'notice')
    .replace(/\b(regulaton|regulatons|regulations2021)\b/g, 'regulations');
};

/**
 * Analyzes question text and selects the appropriate backend tool (or null if general RAG is sufficient)
 * 
 * @param {String} question - Student input question
 * @returns {String|null} Name of tool to execute or null
 */
const selectTool = (question = '') => {
  if (!question || typeof question !== 'string') return null;

  const q = normalizeTypos(question.trim());

  // Rule 1: Notice / Announcement / Exam Schedule Intent
  const noticeKeywords = [
    'notice', 'notices', 'announcement', 'announcements', 'circular',
    'exam date', 'exam schedule', 'cycle test', 'timetable', 'hall ticket release',
    'condonation application', 'holiday announcement', 'symposium'
  ];

  if (noticeKeywords.some((kw) => q.includes(kw))) {
    return 'searchNotices';
  }

  // Rule 2: Syllabus / Curriculum / Department Course Offering Intent
  const syllabusKeywords = [
    'syllabus', 'curriculum', 'subjects available', 'course structure', 'subject', 'subjects',
    'semester 1', 'semester 2', 'semester 3', 'semester 4',
    'semester 5', 'semester 6', 'semester 7', 'semester 8',
    'it syllabus', 'cse syllabus', 'ece syllabus'
  ];

  if (syllabusKeywords.some((kw) => q.includes(kw))) {
    return 'searchSyllabus';
  }

  // Rule 3: Comprehensive Academic Regulations & Rules Intent
  const academicDocKeywords = [
    'academic regulations', 'regulations 2021', 'academic rules',
    'honors degree requirements', 'minor degree requirements',
    'fast track option', 'break of study policy', 'revaluation rules'
  ];

  if (academicDocKeywords.some((kw) => q.includes(kw))) {
    return 'searchAcademicDocuments';
  }

  // Default: General RAG retrieval
  return null;
};

module.exports = {
  selectTool
};
