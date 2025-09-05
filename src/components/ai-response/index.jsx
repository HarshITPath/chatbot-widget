import React, { memo, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import parseAIResponse from "../../utils/helper/ai-response-parser";
import { ContentRenderer } from "./content-render";

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
    <Box sx={{ "& > *:first-of-type": { mt: 0 }, "& > *:last-child": { mb: 0 } }}>
      {parsedContent?.map((item) => (
        <ContentRenderer key={item.id} {...{ item, config }} />
      ))}
    </Box>
  );
});
