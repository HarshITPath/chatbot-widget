import React from "react";
import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkDownResponse = ({ id, content }) => {
  return (
    <Box key={id} sx={{ mb: 1 }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <Typography variant="subtitle1">{children}</Typography>
          ),
          h1: ({ children }) => (
            <Typography
              variant="body1"
              sx={{
                fontWeight: 700,
              }}
            >
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
              }}
            >
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
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
              variant="subtitle1"
              sx={{
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
                  color: "primary.main",
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
};

export default MarkDownResponse;
