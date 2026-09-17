/**
 * Context Builder Service
 * 
 * Formats retrieved knowledge base documents and tool execution results into a structured prompt context
 * suitable for OpenRouter LLM ingestion.
 * 
 * @param {Array} documents - List of retrieved document objects from RAG
 * @param {Object} toolResults - Optional result object returned from tool execution
 * @returns {String} Formatted text context string
 */
const buildRAGContext = (documents = [], toolResults = null) => {
  let contextParts = [];

  // 1. Format RAG Knowledge Base Documents
  if (Array.isArray(documents) && documents.length > 0) {
    const docContext = documents
      .map((doc, index) => {
        const title = doc.title || 'Untitled Document';
        const category = doc.category || 'General';
        const source = doc.source || 'Anna University Knowledge Base';
        const content = doc.content || '';

        return `SOURCE ${index + 1}:
Title: ${title}
Category: ${category}
Source: ${source}
Content:
${content}`;
      })
      .join('\n\n--------------------------------------------------\n\n');

    contextParts.push(`RETRIEVED COLLEGE RESOURCES:\n${docContext}`);
  }

  // 2. Format Tool Execution Results
  if (toolResults && toolResults.success && Array.isArray(toolResults.results) && toolResults.results.length > 0) {
    const toolName = toolResults.tool || 'databaseTool';
    const resultContext = toolResults.results
      .map((item, idx) => {
        const title = item.title || 'Item';
        const category = item.category || '';
        const content = item.content || JSON.stringify(item);
        const sourceType = item.sourceType === 'demo' ? '(Demo Information)' : '(Official Resource)';

        return `${idx + 1}. Title: ${title} ${sourceType}
Category: ${category}
Content: ${content}`;
      })
      .join('\n\n');

    contextParts.push(`TOOL EXECUTION RESULT (${toolName}):\n${resultContext}`);
  }

  if (contextParts.length === 0) {
    return 'No relevant academic context or tool results available.';
  }

  return contextParts.join('\n\n==================================================\n\n');
};

module.exports = {
  buildRAGContext
};
