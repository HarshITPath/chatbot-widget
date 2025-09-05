import { Alert, Box, Typography } from "@mui/material";
import { CONTENT_TYPES, validateComponentData } from "../../utils/helper/ai-response-parser";
import MarkDownResponse from "../markdown";
import { getAIComponent } from "../ai-components";
import { memo } from "react";
import { UnknownComponent } from "./unknown-component";

// Renders a single parsed content item
export const ContentRenderer = memo(({ item, config = {} }) => {
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