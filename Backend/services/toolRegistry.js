const searchNotices = require('../tools/searchNotices');
const searchSyllabus = require('../tools/searchSyllabus');
const searchAcademicDocuments = require('../tools/searchAcademicDocuments');

/**
 * Central Tool Registry for Agent Tool Calling System
 */
const toolRegistry = {
  searchNotices: {
    name: 'searchNotices',
    description: 'Search college notices, examination schedules, cycle tests, and administrative announcements stored in the database',
    parameters: {
      query: 'string - Search terms or keywords (e.g. "exam", "timetable", "condonation")',
      category: 'string - Optional notice category ("exam", "academic", "event", "general")',
      limit: 'number - Max number of results (1-10, default 5)'
    },
    execute: searchNotices
  },
  searchSyllabus: {
    name: 'searchSyllabus',
    description: 'Search official syllabus, curriculum structure, and course offerings for specific departments or semesters',
    parameters: {
      query: 'string - Search keywords (e.g. "semester 7", "electives", "IT syllabus")',
      semester: 'string or number - Optional semester number',
      department: 'string - Optional department name or code',
      limit: 'number - Max number of results (1-10, default 5)'
    },
    execute: searchSyllabus
  },
  searchAcademicDocuments: {
    name: 'searchAcademicDocuments',
    description: 'Search official Anna University academic regulations, credit requirements, grading policies, and guidelines',
    parameters: {
      query: 'string - Search query (e.g. "academic regulations", "honors degree", "credit limits")',
      category: 'string - Optional category ("regulations", "academic", "faq", "syllabus")',
      limit: 'number - Max number of results (1-10, default 5)'
    },
    execute: searchAcademicDocuments
  }
};

/**
 * Returns available tool definitions metadata
 */
const getAvailableTools = () => {
  return Object.values(toolRegistry).map(({ name, description, parameters }) => ({
    name,
    description,
    parameters
  }));
};

/**
 * Executes a tool by name with arguments
 */
const executeTool = async (toolName, args = {}) => {
  const tool = toolRegistry[toolName];
  if (!tool) {
    throw new Error(`Tool "${toolName}" is not registered in Tool Registry.`);
  }

  return await tool.execute(args);
};

module.exports = {
  toolRegistry,
  getAvailableTools,
  executeTool
};
