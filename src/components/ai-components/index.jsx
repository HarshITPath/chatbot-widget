import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  Chip,
  Stack,
  useTheme,
} from "@mui/material";
import InfoCardField from "./info-card-field";
import { getTypeConfig } from "./info-card-config";
import { ICONS } from "../../assets/icons";

const InfoCard = ({ data }) => {
  const theme = useTheme();
  if (!data) return null;

  const { title, link, fields = [], type, ...otherProps } = data;
  const typeConfig = getTypeConfig(type, theme);

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 1.5,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent sx={{ p: 2 }}>
        {title && (
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
            {title}
          </Typography>
        )}

        {fields.length > 0 && (
            <Stack spacing={1}>
              {fields.map((field, idx) => (
                <InfoCardField key={idx} {...{ field, typeConfig }} />
              ))}
            </Stack>
        )}

        {link && (
          <Button
            variant="contained"
            fullWidth
            endIcon={<ICONS.OPEN_IN_NEW fontSize="small" />}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              backgroundColor: typeConfig.buttonColor,
              color: "white",
              fontWeight: 600,
              py: 1,
              fontSize: "0.875rem",
              textTransform: "none",
              borderRadius: 1,
              "&:hover": {
                backgroundColor: typeConfig.buttonColor,
                filter: "brightness(0.9)",
              },
            }}
          >
            {typeConfig.buttonText}
          </Button>
        )}

        {Object.keys(otherProps).length > 0 && (
          <Box mt={2}>
            <Divider sx={{ mb: 1.5 }} />
            <Box display="flex" flexWrap="wrap" gap={1}>
              {Object.entries(otherProps).map(([key, value]) =>
                value && typeof value !== "object" ? (
                  <Chip
                    key={key}
                    label={`${key}: ${value}`}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: "0.7rem",
                      height: 20,
                      borderColor: typeConfig.color,
                      color: typeConfig.color,
                    }}
                  />
                ) : null
              )}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default InfoCard;
