// AI Response Parser Parses AI responses containing structured components and markdown syntax
export const CONTENT_TYPES = {
  TEXT: "text",
  COMPONENT: "component",
  MARKDOWN: "markdown",
};

function parseComponent(componentBlock) {
  const lines = componentBlock.trim().split("\n");
  const firstLine = lines[0];

  // Handle both component formats: <component:info_card> and <<component:info_card>>
  let componentTypeMatch =
    firstLine.match(/<component:([^>]+)>/) ||
    firstLine.match(/<<component:([^>]+)>>/);

  if (!componentTypeMatch) {
    return null;
  }

  const componentType = componentTypeMatch[1];
  const data = { fields: [] };
  let currentField = null;
  let inFieldsSection = false;

  // Parse key-value pairs from subsequent lines
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "<<end>>") break;

    // Handle fields section
    if (line === "fields:") {
      inFieldsSection = true;
      continue;
    }

    // Handle field entries: - key: value or   - key: value (with spaces)
    if (line.match(/^\s*-\s*key:\s*/)) {
      // Save previous field if exists
      if (currentField && currentField.key && currentField.value) {
        data.fields.push(currentField);
      }
      const keyValue = line.replace(/^\s*-\s*key:\s*/, "").trim();
      currentField = { key: keyValue, value: "" };
      continue;
    }

    // Handle value entries: value: ... or   value: ... (with spaces)
    if (line.match(/^\s*value:\s*/) && currentField) {
      currentField.value = line.replace(/^\s*value:\s*/, "").trim();
      continue;
    }

    // Handle direct key-value pairs (backwards compatibility)
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0 && !line.startsWith("-") && !inFieldsSection) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Handle multi-line values (continue reading until next key or end)
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j].trim();
        if (nextLine === "<<end>>") break;

        // Check if this line starts a new key or field
        const nextColonIndex = nextLine.indexOf(":");
        if (
          (nextColonIndex > 0 && !nextLine.startsWith("-")) ||
          nextLine.startsWith("- key:") ||
          nextLine === "fields:"
        ) {
          break;
        } else if (nextLine) {
          value += " " + nextLine;
          i = j;
        }
        j++;
      }

      data[key] = value;
    }
  }

  // Add the last field if it exists
  if (currentField && currentField.key && currentField.value) {
    data.fields.push(currentField);
  }

  // Handle type specification in component tag: <component:info_card:blog>
  const typeSpecificMatch = componentType.match(/info_card:(\w+)/);
  if (typeSpecificMatch) {
    data.type = typeSpecificMatch[1];
  }

  // All components now use info_card
  const finalComponentType = "info_card";

  return {
    type: CONTENT_TYPES.COMPONENT,
    componentType: finalComponentType,
    data,
    id: generateComponentId(finalComponentType, data),
  };
}

function generateComponentId(type, data) {
  const timestamp = Date.now();
  const hash = Math.random().toString(36).substr(2, 9);
  const title = data.title || data.name || data.id || "";
  const sanitizedTitle = title
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase()
    .substr(0, 10);
  return `${type}_${sanitizedTitle}_${hash}_${timestamp}`;
}

function containsMarkdown(text) {
  const markdownPatterns = [
    /^[\s]*[-*+]\s+/m, // Bullet lists (- * +)
    /^\s*\d+\.\s+/m, // Numbered lists (1. 2. 3.)
    /\[([^\]]+)\]\(([^)]+)\)/, // Links [text](url)
    /`[^`]+`/, // Inline code
    /```[\s\S]*?```/, // Code blocks
    /^#{1,6}\s+/m, // Headers # ## ###
    /\*\*[^*]+\*\*/, // Bold **text**
    /\*[^*]+\*/, // Italic *text*
    /^>\s+/m, // Blockquotes > text
    /^\s*\|.*\|/m, // Tables | col | col |
    /---+/, // Horizontal rules ---
  ];

  return markdownPatterns.some((pattern) => pattern.test(text));
}

// Enhances plain text by detecting and converting markdown-like patterns
function enhanceTextWithMarkdown(text) {
  let enhanced = text;

  // Convert bullet points to markdown
  enhanced = enhanced.replace(/^[\s]*[-*+]\s+(.+)$/gm, "- $1");

  // Convert numbered lists
  enhanced = enhanced.replace(/^\s*(\d+)\.\s+(.+)$/gm, "$1. $2");

  return enhanced;
}

function splitTextAroundComponents(text) {
  // Match both old and new component formats
  // Handles: <component:info_card>, <<component:info_card>>, and any other component types
  const componentRegex =
    /(?:<<component:[^>]+>>[\s\S]*?<<end>>)|(?:<component:[^>]+>[\s\S]*?<<end>>)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = componentRegex.exec(text)) !== null) {
    // Add text before component
    if (match.index > lastIndex) {
      const textBefore = text.substring(lastIndex, match.index).trim();
      if (textBefore) {
        parts.push({
          type: "text",
          content: textBefore,
        });
      }
    }

    // Add component
    parts.push({
      type: "component",
      content: match[0],
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex).trim();
    if (remainingText) {
      parts.push({
        type: "text",
        content: remainingText,
      });
    }
  }

  return parts;
}

// Main parser function that processes AI response text
export default function parseAIResponse(responseText) {
  if (!responseText || typeof responseText !== "string") {
    return [];
  }

  const parts = splitTextAroundComponents(responseText);
  const parsedContent = [];

  for (const part of parts) {
    if (part.type === "component") {
      const component = parseComponent(part.content);
      if (component) {
        parsedContent.push(component);
      }
    } else if (part.type === "text") {
      const text = part.content.trim();
      if (text) {
        // Check if text contains markdown patterns
        if (containsMarkdown(text)) {
          parsedContent.push({
            type: CONTENT_TYPES.MARKDOWN,
            content: enhanceTextWithMarkdown(text),
            id: `markdown_${Date.now()}_${Math.random()
              .toString(36)
              .substr(2, 9)}`,
          });
        } else {
          // Enhance plain text with basic markdown detection
          const enhancedText = enhanceTextWithMarkdown(text);
          parsedContent.push({
            type: CONTENT_TYPES.TEXT,
            content: enhancedText,
            id: `text_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          });
        }
      }
    }
  }

  return parsedContent;
}

// Validates component data based on component type
export function validateComponentData(data) {
  // Simplified validation since we only use info_card now
  const errors = [];

  // Validate fields structure if present
  if (data.fields) {
    if (!Array.isArray(data.fields)) {
      errors.push("fields must be an array");
    } else {
      data.fields.forEach((field, index) => {
        if (!field.key) {
          errors.push(`Field at index ${index} is missing 'key' property`);
        }
        if (!field.value) {
          errors.push(`Field at index ${index} is missing 'value' property`);
        }
      });
    }
  }

  // Basic validation - at least some content should be present
  if (
    !data.title &&
    (!data.fields || data.fields.length === 0) &&
    !data.content &&
    !data.description
  ) {
    errors.push(
      "Component must have at least a title, fields, content, or description"
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
