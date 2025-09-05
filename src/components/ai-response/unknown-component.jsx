import { memo } from "react";
import { getAIComponent } from "../ai-components";
import { Alert, Typography } from "@mui/material";

//  Unknown Component - Fallback for unsupported component types
export const UnknownComponent = memo(({ data, componentType }) => {
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