import { memo } from "react";
import { Avatar, Box, Typography } from "@mui/material";

const LoadingIndicator = memo(({ botAvatar }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, mb: 2 }}>
    <Avatar
      sx={{
        width: 28,
        height: 28,
        bgcolor: "primary.main",
        fontSize: "0.8rem",
      }}
    >
      {botAvatar}
    </Avatar>
    <Box
      sx={{
        bgcolor: "background.paper",
        px: 2,
        py: 1.5,
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography
        variant="subtitle1"
        color="text.secondary"
      >
        AI is thinking
      </Typography>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: "primary.main",
              animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
              "@keyframes bounce": {
                "0%, 80%, 100%": { transform: "scale(0.8)", opacity: 0.5 },
                "40%": { transform: "scale(1)", opacity: 1 },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  </Box>
));

export default LoadingIndicator