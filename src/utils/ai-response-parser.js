/**
 * AI Response Parser
 * Parses AI responses containing structured components and markdown syntax
 */

export const COMPONENT_TYPES = {
  CARDS: 'cards'
};

export const CARD_TYPES = {
  BLOG: 'blog',
  JOB: 'job',
  CASE_STUDY: 'case_study',
  TESTIMONIAL: 'testimonial',
  SOLUTION: 'solution',
  PORTFOLIO: 'portfolio'
};

export const CONTENT_TYPES = {
  TEXT: 'text',
  COMPONENT: 'component',
  MARKDOWN: 'markdown'
};

/**
 * Parses a single component block
 * @param {string} componentBlock - The component block string
 * @returns {object} Parsed component object
 */
function parseComponent(componentBlock) {
  const lines = componentBlock.trim().split('\n');
  const firstLine = lines[0];
  
  // Extract component type from first line: <<component:cards>>
  const componentTypeMatch = firstLine.match(/<<component:(\w+)>>/);
  if (!componentTypeMatch) {
    return null;
  }

  const componentType = componentTypeMatch[1];
  const data = {};
  
  // Parse key-value pairs from subsequent lines
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '<<end>>') break;
    
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Handle multi-line values (continue reading until next key or end)
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j].trim();
        if (nextLine === '<<end>>') break;
        
        // Check if this line starts a new key (contains a colon not at the beginning)
        const nextColonIndex = nextLine.indexOf(':');
        if (nextColonIndex > 0) {
          // This is a new key, stop collecting for current value
          break;
        } else if (nextLine) {
          // This line is part of the current value
          value += ' ' + nextLine;
          i = j; // Skip this line in the outer loop
        }
        j++;
      }
      
      data[key] = value;
    }
  }

  // Only support cards format with type property
  let finalComponentType = componentType;
  if (componentType === COMPONENT_TYPES.CARDS && data.type) {
    // Map the type to appropriate component type for rendering
    const typeMapping = {
      [CARD_TYPES.BLOG]: 'blog_card',
      [CARD_TYPES.JOB]: 'job_card',
      [CARD_TYPES.CASE_STUDY]: 'case_study_card',
      [CARD_TYPES.TESTIMONIAL]: 'testimonial_card',
      [CARD_TYPES.SOLUTION]: 'service_card',
      [CARD_TYPES.PORTFOLIO]: 'portfolio_item'
    };
    
    finalComponentType = typeMapping[data.type] || componentType;
  } else {
    // If it's not the cards format, return null (unsupported)
    return null;
  }

  return {
    type: CONTENT_TYPES.COMPONENT,
    componentType: finalComponentType,
    data,
    id: generateComponentId(finalComponentType, data)
  };
}

/**
 * Generates a unique ID for a component
 * @param {string} type - Component type
 * @param {object} data - Component data
 * @returns {string} Unique component ID
 */
function generateComponentId(type, data) {
  const timestamp = Date.now();
  const hash = Math.random().toString(36).substr(2, 9);
  const title = data.title || data.name || data.id || '';
  const sanitizedTitle = title.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().substr(0, 10);
  return `${type}_${sanitizedTitle}_${hash}_${timestamp}`;
}

/**
 * Detects if text contains markdown-like patterns
 * @param {string} text - Text to analyze
 * @returns {boolean} Whether text contains markdown
 */
function containsMarkdown(text) {
  const markdownPatterns = [
    /^[\s]*[-*+]\s+/m,        // Bullet lists (- * +)
    /^\s*\d+\.\s+/m,          // Numbered lists (1. 2. 3.)
    /\[([^\]]+)\]\(([^)]+)\)/,// Links [text](url)
    /`[^`]+`/,                // Inline code
    /```[\s\S]*?```/,         // Code blocks
    /^#{1,6}\s+/m,            // Headers # ## ###
    /\*\*[^*]+\*\*/,          // Bold **text**
    /\*[^*]+\*/,              // Italic *text*
    /^>\s+/m,                 // Blockquotes > text
    /^\s*\|.*\|/m,            // Tables | col | col |
    /---+/,                   // Horizontal rules ---
  ];
  
  return markdownPatterns.some(pattern => pattern.test(text));
}

/**
 * Enhances plain text by detecting and converting markdown-like patterns
 * @param {string} text - Plain text to enhance
 * @returns {string} Enhanced text with markdown syntax
 */
function enhanceTextWithMarkdown(text) {
  let enhanced = text;
  
  // Convert bullet points to markdown
  enhanced = enhanced.replace(/^[\s]*[-*+]\s+(.+)$/gm, '- $1');
  
  // Convert numbered lists
  enhanced = enhanced.replace(/^\s*(\d+)\.\s+(.+)$/gm, '$1. $2');
  
  // Detect and preserve existing markdown links
  // [text](url) format is already markdown-compatible
  
  return enhanced;
}

/**
 * Splits text around component blocks
 * @param {string} text - Text containing component blocks
 * @returns {Array} Array of text chunks and component blocks
 */
function splitTextAroundComponents(text) {
  // Only match cards format
  const componentRegex = /<<component:cards>>[\s\S]*?<<end>>/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = componentRegex.exec(text)) !== null) {
    // Add text before component
    if (match.index > lastIndex) {
      const textBefore = text.substring(lastIndex, match.index).trim();
      if (textBefore) {
        parts.push({
          type: 'text',
          content: textBefore
        });
      }
    }
    
    // Add component
    parts.push({
      type: 'component',
      content: match[0]
    });
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex).trim();
    if (remainingText) {
      parts.push({
        type: 'text',
        content: remainingText
      });
    }
  }
  
  return parts;
}

/**
 * Main parser function that processes AI response text
 * @param {string} responseText - The raw AI response text
 * @returns {Array} Array of parsed content blocks
 */
export function parseAIResponse(responseText) {
  if (!responseText || typeof responseText !== 'string') {
    return [];
  }

  const parts = splitTextAroundComponents(responseText);
  const parsedContent = [];

  for (const part of parts) {
    if (part.type === 'component') {
      const component = parseComponent(part.content);
      if (component) {
        parsedContent.push(component);
      }
    } else if (part.type === 'text') {
      const text = part.content.trim();
      if (text) {
        // Check if text contains markdown patterns
        if (containsMarkdown(text)) {
          parsedContent.push({
            type: CONTENT_TYPES.MARKDOWN,
            content: enhanceTextWithMarkdown(text),
            id: `markdown_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          });
        } else {
          // Enhance plain text with basic markdown detection
          const enhancedText = enhanceTextWithMarkdown(text);
          parsedContent.push({
            type: CONTENT_TYPES.TEXT,
            content: enhancedText,
            id: `text_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          });
        }
      }
    }
  }

  return parsedContent;
}

/**
 * Validates component data based on component type
 * @param {string} componentType - The type of component
 * @param {object} data - The component data
 * @returns {object} Validation result with isValid and errors
 */
export function validateComponentData(componentType, data) {
  const validationRules = {
    // Cards format validation rules
    [COMPONENT_TYPES.CARDS]: {
      required: ['type'],
      optional: ['title', 'description', 'link', 'image', 'author', 'date', 'tags', 'readTime', 
                'company', 'location', 'salary', 'requirements', 'experience', 'skills', 'apply_link', 'posted',
                'client', 'industry', 'duration', 'technologies', 'subtitle',
                'content', 'position', 'rating',
                'name', 'features', 'price', 'currency', 'period', 'popular',
                'icon', 'category', 'bio', 'email', 'social']
    },
    
    // Component type mappings
    'blog_card': {
      required: ['title'],
      optional: ['description', 'author', 'date', 'link', 'image', 'tags', 'readTime']
    },
    'job_card': {
      required: ['title'],
      optional: ['company', 'location', 'type', 'salary', 'description', 'requirements', 'link', 'experience', 'skills', 'apply_link', 'posted']
    },
    'case_study_card': {
      required: ['title', 'description'],
      optional: ['client', 'industry', 'duration', 'technologies', 'link', 'image', 'subtitle']
    },
    'testimonial_card': {
      required: ['content', 'author'],
      optional: ['company', 'position', 'rating', 'image']
    },
    'portfolio_item': {
      required: ['title', 'description'],
      optional: ['image', 'technologies', 'link', 'category', 'date']
    },
    'service_card': {
      required: ['title', 'description'],
      optional: ['icon', 'features', 'link', 'price']
    }
  };

  const rules = validationRules[componentType];
  if (!rules) {
    return { isValid: false, errors: [`Unknown component type: ${componentType}`] };
  }

  const errors = [];
  const dataKeys = Object.keys(data);

  // Special validation for cards format
  if (componentType === COMPONENT_TYPES.CARDS) {
    // Validate that type is provided and is valid
    if (!data.type) {
      errors.push('Missing required field: type');
    } else if (!Object.values(CARD_TYPES).includes(data.type)) {
      errors.push(`Invalid card type: ${data.type}. Supported types: ${Object.values(CARD_TYPES).join(', ')}`);
    }
    
    // Additional validation based on card type
    if (data.type === CARD_TYPES.BLOG && !data.title) {
      errors.push('Blog cards require title');
    }
    if (data.type === CARD_TYPES.JOB && !data.title) {
      errors.push('Job cards require title');
    }
    if (data.type === CARD_TYPES.CASE_STUDY && (!data.title || !data.description)) {
      errors.push('Case study cards require title and description');
    }
    if (data.type === CARD_TYPES.TESTIMONIAL && (!data.content || !data.author)) {
      errors.push('Testimonial cards require content and author');
    }
    if (data.type === CARD_TYPES.PORTFOLIO && (!data.title || !data.description)) {
      errors.push('Portfolio cards require title and description');
    }
    if (data.type === CARD_TYPES.SOLUTION && (!data.title || !data.description)) {
      errors.push('Solution cards require title and description');
    }
  } else {
    // Standard validation for mapped component types
    // Check required fields
    for (const field of rules.required) {
      if (!data[field] || data[field].trim() === '') {
        errors.push(`Missing required field: ${field}`);
      }
    }
  }

  // Check for unknown fields (optional validation)
  const allowedFields = [...rules.required, ...rules.optional];
  for (const key of dataKeys) {
    if (!allowedFields.includes(key)) {
      console.warn(`Unknown field for ${componentType}: ${key}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Helper function to get component type display name
 * @param {string} componentType - Component type
 * @returns {string} Display name
 */
export function getComponentDisplayName(componentType) {
  const displayNames = {
    // Cards format
    [COMPONENT_TYPES.CARDS]: 'Card',
    
    // Component type mappings
    'blog_card': 'Blog Post',
    'job_card': 'Job Posting',
    'case_study_card': 'Case Study',
    'testimonial_card': 'Testimonial',
    'portfolio_item': 'Portfolio Item',
    'service_card': 'Solution'
  };

  return displayNames[componentType] || componentType;
}

export default parseAIResponse;
