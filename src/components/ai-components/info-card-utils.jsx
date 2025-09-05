import { Box, Chip, Rating, Typography, Link as MuiLink } from "@mui/material";
import { ICONS } from "../../assets/icons";

// Map icons by field key
export const getFieldIcon = (key) => {
  const lowerKey = key.toLowerCase();
  if (lowerKey.includes("author") || lowerKey.includes("client"))
    return <ICONS.PERSON fontSize="small" />;
  if (lowerKey.includes("company") || lowerKey.includes("organization"))
    return <ICONS.BUSINESS fontSize="small" />;
  if (lowerKey.includes("location") || lowerKey.includes("address"))
    return <ICONS.LOCATIONS fontSize="small" />;
  if (lowerKey.includes("date") || lowerKey.includes("posted"))
    return <ICONS.CALENDAR fontSize="small" />;
  if (lowerKey.includes("experience") || lowerKey.includes("years"))
    return <ICONS.WORK fontSize="small" />;
  if (lowerKey.includes("time") || lowerKey.includes("duration"))
    return <ICONS.SCHEDULE fontSize="small" />;
  if (lowerKey.includes("rating") || lowerKey.includes("score"))
    return <ICONS.STAR fontSize="small" />;
  if (lowerKey.includes("email")) return <ICONS.EMAIL fontSize="small" />;
  if (lowerKey.includes("phone")) return <ICONS.PHONE fontSize="small" />;
  if (lowerKey.includes("website") || lowerKey.includes("link"))
    return <ICONS.WEBSITE fontSize="small" />;
  return null;
};

// Render field values
export const renderFieldValue = (field, typeConfig) => {
  const { key, value } = field;
  const lowerKey = key.toLowerCase();

  console.log("lowerKey", lowerKey);
  console.log("value", value);

  if (lowerKey.includes("rating") && !isNaN(parseFloat(value))) {
    return (
      <Box display="flex" alignItems="center" gap={1}>
        <Rating value={parseFloat(value)} readOnly size="small" />
        <Typography variant="body2" color="text.secondary">
          ({value})
        </Typography>
      </Box>
    );
  }

  if (lowerKey.includes("email") && value.includes("@")) {
    return (
      <MuiLink href={`mailto:${value}`} color="primary" underline="hover">
        {value}
      </MuiLink>
    );
  }

  if (lowerKey.includes("phone") && /[\d\s\-\(\)+]/.test(value)) {
    return (
      <MuiLink href={`tel:${value}`} color="primary" underline="hover">
        {value}
      </MuiLink>
    );
  }

  if (
    (lowerKey.includes("website") || lowerKey.includes("link")) &&
    (value.startsWith("http") || value.startsWith("www"))
  ) {
    return (
      <MuiLink
        href={value.startsWith("http") ? value : `https://${value}`}
        target="_blank"
        rel="noopener noreferrer"
        color="primary"
        underline="hover"
      >
        {value}
      </MuiLink>
    );
  }

  if (
    lowerKey.includes("technologies") ||
    lowerKey.includes("skills") ||
    lowerKey.includes("tags")
  ) {
    const items = value
      .split(/[,;|]/)
      .map((item) => item.trim())
      .filter(Boolean);
    if (items.length > 1) {
      return (
        <Box display="flex" flexWrap="wrap" gap={0.5}>
          {items.map((item, index) => (
            <Chip
              key={index}
              label={item}
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.7rem",
                height: 22,
                borderColor: typeConfig.color,
                color: typeConfig.color,
                "&:hover": {
                  backgroundColor: typeConfig.bgColor,
                },
              }}
            />
          ))}
        </Box>
      );
    }
  }

  if (
    lowerKey.includes("responsibilities") ||
    lowerKey.includes("description")
  ) {
    const lines = value
      .split(/\||\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    return (
      <Box component="ul" sx={{ m: 0, pl: 2 }}>
        {lines.map((line, index) => (
          <Typography key={index} component="li" variant="subtitle1">
            {line.replace(/^[-•]\s*/, "")}
          </Typography>
        ))}
      </Box>
    );
  }

  if (value.length > 100) {
    return (
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{
          fontStyle:
            lowerKey.includes("quote") || lowerKey.includes("testimonial")
              ? "italic"
              : "normal",
          whiteSpace: "pre-wrap",
        }}
      >
        {lowerKey.includes("quote") || lowerKey.includes("testimonial")
          ? `"${value}"`
          : value}
      </Typography>
    );
  }

  return (
    <Typography variant="subtitle1" color="text.secondary">
      {value}
    </Typography>
  );
};
