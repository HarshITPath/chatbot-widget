import { Box, Typography } from "@mui/material";
import { getFieldIcon, renderFieldValue } from "./info-card-utils";

const InfoCardField = ({ field, typeConfig }) => {
  if (!field.key || !field.value) return null;

  const icon = getFieldIcon(field.key);

  return (
    <Box display="flex" alignItems="flex-start" gap={1}>
      {icon && (
        <Box
          sx={{
            mt: 0.25,
            color: typeConfig.color,
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
      )}
      <Box flex={1}>
        <Typography variant="subtitle1">{field.key}:</Typography>
        {renderFieldValue(field, typeConfig)}
      </Box>
    </Box>
  );
};

export default InfoCardField;
