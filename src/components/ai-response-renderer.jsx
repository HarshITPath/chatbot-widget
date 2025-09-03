import React, { memo, useMemo } from "react";
import { Box, Typography, Alert } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  parseAIResponse,
  CONTENT_TYPES,
  validateComponentData,
  getComponentDisplayName,
} from "../utils/ai-response-parser";
import {
  getAIComponent,
} from "./ai-components";

//  Unknown Component - Fallback for unsupported component types
const UnknownComponent = memo(({ data, componentType }) => {
  // All components now use InfoCard, so this should rarely be needed
  const InfoCardComponent = getAIComponent("info_card");

  if (InfoCardComponent && data) {
    console.warn(`Unknown component type "${componentType}", using InfoCard`);
    return <InfoCardComponent data={data} componentType="info_card" />;
  }

  return (
    <Alert severity="info" sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Component: {componentType}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Using universal InfoCard component for rendering.
      </Typography>
    </Alert>
  );
});

// Renders a single parsed content item
const ContentRenderer = memo(({ item, config = {} }) => {
  const { type, content, componentType, data, id } = item;

  // Handle different content types
  switch (type) {
    case CONTENT_TYPES.TEXT:
      return (
        <Box key={id} sx={{ mb: 1 }}>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.5,
              fontSize: "0.875rem",
              whiteSpace: "pre-wrap",
              color: "text.primary",
            }}
          >
            {content}
          </Typography>
        </Box>
      );

    case CONTENT_TYPES.MARKDOWN:
      return (
        <Box key={id} sx={{ mb: 1 }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <Typography
                  variant="body2"
                  sx={{
                    m: 0,
                    mb: 1,
                    lineHeight: 1.5,
                    fontSize: "0.875rem",
                    whiteSpace: "pre-wrap",
                    "&:last-child": { mb: 0 },
                  }}
                >
                  {children}
                </Typography>
              ),
              h1: ({ children }) => (
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    m: 0,
                    mb: 1.5,
                    mt: 1.5,
                    lineHeight: 1.3,
                    fontSize: "1.1rem",
                    color: "primary.main",
                    "&:first-of-type": { mt: 0 },
                  }}
                >
                  {children}
                </Typography>
              ),
              h2: ({ children }) => (
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 650,
                    m: 0,
                    mb: 1,
                    mt: 1.5,
                    lineHeight: 1.3,
                    fontSize: "1rem",
                    color: "primary.dark",
                    "&:first-of-type": { mt: 0 },
                  }}
                >
                  {children}
                </Typography>
              ),
              h3: ({ children }) => (
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    m: 0,
                    mb: 0.8,
                    mt: 1,
                    lineHeight: 1.3,
                    fontSize: "0.95rem",
                    "&:first-of-type": { mt: 0 },
                  }}
                >
                  {children}
                </Typography>
              ),
              ul: ({ children }) => (
                <Box
                  component="ul"
                  sx={{
                    pl: 2.5,
                    m: 0,
                    mb: 1,
                    mt: 0.5,
                    lineHeight: 1.4,
                    "& li": { mb: 0.4, pl: 0.5 },
                    "& li::marker": { color: "primary.main" },
                  }}
                >
                  {children}
                </Box>
              ),
              ol: ({ children }) => (
                <Box
                  component="ol"
                  sx={{
                    pl: 2.5,
                    m: 0,
                    mb: 1,
                    mt: 0.5,
                    lineHeight: 1.4,
                    "& li": { mb: 0.4, pl: 0.5 },
                    "& li::marker": { color: "primary.main", fontWeight: 600 },
                  }}
                >
                  {children}
                </Box>
              ),
              li: ({ children }) => (
                <Typography
                  component="li"
                  variant="body2"
                  sx={{
                    fontSize: "0.875rem",
                    lineHeight: 1.4,
                    color: "text.primary",
                  }}
                >
                  {children}
                </Typography>
              ),
              a: ({ href, children }) => (
                <Box
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    fontSize: "inherit",
                    fontWeight: 500,
                    borderBottom: "1px solid transparent",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderBottomColor: "primary.main",
                      color: "primary.dark",
                    },
                  }}
                >
                  {children}
                </Box>
              ),
              blockquote: ({ children }) => (
                <Box
                  component="blockquote"
                  sx={{
                    borderLeft: "4px solid",
                    borderColor: "primary.light",
                    bgcolor: "grey.50",
                    pl: 2,
                    py: 1,
                    my: 1.5,
                    mx: 0,
                    fontStyle: "italic",
                    "& p": { m: 0 },
                  }}
                >
                  {children}
                </Box>
              ),
              code: ({ inline, children }) =>
                inline ? (
                  <Box
                    component="code"
                    sx={{
                      bgcolor: "grey.100",
                      color: "error.dark",
                      px: 0.6,
                      py: 0.2,
                      borderRadius: 1,
                      fontSize: "0.85rem",
                      fontFamily: '"Fira Code", "Consolas", monospace',
                      border: "1px solid",
                      borderColor: "grey.300",
                    }}
                  >
                    {children}
                  </Box>
                ) : (
                  <Box
                    component="pre"
                    sx={{
                      bgcolor: "grey.900",
                      color: "grey.100",
                      p: 2,
                      borderRadius: 2,
                      fontSize: "0.8rem",
                      overflowX: "auto",
                      m: 0,
                      my: 1.5,
                      fontFamily: '"Fira Code", "Consolas", monospace',
                      border: "1px solid",
                      borderColor: "grey.700",
                      "& code": {
                        bgcolor: "transparent",
                        p: 0,
                        fontSize: "inherit",
                        fontFamily: "inherit",
                      },
                    }}
                  >
                    <code>{children}</code>
                  </Box>
                ),
              table: ({ children }) => (
                <Box sx={{ overflowX: "auto", my: 1.5 }}>
                  <Box
                    component="table"
                    sx={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "1px solid",
                      borderColor: "grey.300",
                      fontSize: "0.85rem",
                    }}
                  >
                    {children}
                  </Box>
                </Box>
              ),
              thead: ({ children }) => (
                <Box
                  component="thead"
                  sx={{
                    bgcolor: "grey.100",
                    "& th": {
                      border: "1px solid",
                      borderColor: "grey.300",
                      p: 1,
                      fontWeight: 600,
                      textAlign: "left",
                    },
                  }}
                >
                  {children}
                </Box>
              ),
              tbody: ({ children }) => (
                <Box
                  component="tbody"
                  sx={{
                    "& td": {
                      border: "1px solid",
                      borderColor: "grey.300",
                      p: 1,
                    },
                    "& tr:nth-of-type(even)": { bgcolor: "grey.50" },
                  }}
                >
                  {children}
                </Box>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </Box>
      );

    case CONTENT_TYPES.COMPONENT:
      if (!componentType || !data) {
        return (
          <Alert severity="error" sx={{ mb: 2 }}>
            Invalid component data: Missing component type or data
          </Alert>
        );
      }

      // Validate component data
      const validation = validateComponentData(componentType, data);
      if (!validation.isValid) {
        return (
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Invalid {getComponentDisplayName(componentType)} data:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2 }}>
              {validation.errors.map((error, index) => (
                <li key={index}>
                  <Typography variant="body2">{error}</Typography>
                </li>
              ))}
            </Box>
          </Alert>
        );
      }

      // Get the InfoCard component (since all components now use InfoCard)
      const ComponentToRender =
        getAIComponent(componentType) || UnknownComponent;

      return (
        <Box key={id} sx={{ mb: 2 }}>
          <ComponentToRender
            data={data}
            componentType={componentType}
            config={config}
          />
        </Box>
      );

    default:
      return (
        <Alert severity="info" sx={{ mb: 2 }}>
          Unknown content type: {type}
        </Alert>
      );
  }
});

//  Main AI Response Renderer Component Parses and renders AI responses with mixed content and components
export const AIResponseRenderer = memo(({ message, config = {} }) => {
  const parsedContent = useMemo(() => parseAIResponse(message), [message]);

  // If parsing returns empty array, fall back to simple text
  if (!parsedContent || parsedContent.length === 0) {
    return (
      <Typography
        variant="body2"
        sx={{
          lineHeight: 1.5,
          fontSize: "0.875rem",
          whiteSpace: "pre-wrap",
          color: "text.primary",
        }}
      >
        {message || "No content to display"}
      </Typography>
    );
  }

  // Render all parsed content items
  return (
    <Box
      sx={{ "& > *:first-of-type": { mt: 0 }, "& > *:last-child": { mb: 0 } }}
    >
      {parsedContent.map((item) => (
        <ContentRenderer key={item.id} item={item} config={config} />
      ))}
    </Box>
  );
});

//  Hook for parsing AI responses (useful for getting parsed data without rendering)
export const useAIResponseParser = (message) => {
  return React.useMemo(() => {
    if (!message) return [];
    return parseAIResponse(message);
  }, [message]);
};

export default AIResponseRenderer;
