import React, { memo, useMemo } from "react";
import { Box, Typography, Alert } from "@mui/material";

import { getAIComponent } from "./ai-components";
import parseAIResponse, {
  CONTENT_TYPES,
  validateComponentData,
} from "../utils/helper/ai-response-parser";
import MarkDownResponse from "./markdown";

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
          <Typography variant="subtitle1">{content}</Typography>
        </Box>
      );

    case CONTENT_TYPES.MARKDOWN:
      return <MarkDownResponse {...{ id, content }} />;

    case CONTENT_TYPES.COMPONENT:
      if (!componentType || !data) {
        return (
          <Alert severity="error" sx={{ mb: 2 }}>
            Invalid component data: Missing component type or data
          </Alert>
        );
      }

      // Validate component data
      const validation = validateComponentData(data);
      if (!validation.isValid) {
        return (
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Invalid data:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2 }}>
              {validation?.errors?.map((error, index) => (
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
          <ComponentToRender {...{ data, componentType, config }} />
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
    <Box>
      {parsedContent?.map((item) => (
        <ContentRenderer key={item.id} {...{ item, config }} />
      ))}
    </Box>
  );
});
