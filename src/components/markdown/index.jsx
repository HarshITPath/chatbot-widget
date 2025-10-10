import React from "react";
import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import arrowIcon from "../../assets/arrow.png";

const MarkDownResponse = ({ id, content }) => {
  return (
    <Box key={id} sx={{ mb: 1 }}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          p: ({ children }) => (
            <Typography
              variant="subtitle1"
              sx={{
                wordWrap: "break-word",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              {children}
            </Typography>
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
                color: "primary.main",
              }}
            >
              {children}
            </Typography>
          ),
          ul: ({ children }) => (
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                pl: 0,
                m: 0,
                mb: 1,
                mt: 0.5,
                lineHeight: 1.4,
                "& li": {
                  mb: 0.75,
                  pl: 5,
                  position: "relative",
                  paddingLeft: "36px",
                  textIndent: 0,
                },
                "& li::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: "6px",
                  width: "24px",
                  height: "24px",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundImage: `url(${arrowIcon})`,
                },
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
                // ensure wrapping inside list item
                wordWrap: "break-word",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
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
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "14px",
    color: "primary.main",
    textDecoration: "none",
    wordBreak: "break-word",
    transition: "transform 0.3s ease, color 0.3s ease",

    "&:hover": {
      transform: "scale(1.08)", // ✅ zoom/scale effect
      // color: "primary.main",
      textDecoration: "underline", 
    },
  }}
>
  {children}
</Box>

          ),
          button: ({ children, ...props }) => (
            <Box
              component="button"
              {...props}
              sx={{
                color: "white",
                padding: "8px 8px",
                boxShadow: " 4px 4px 0 0  #9c814f",
                transition: "all 0.3s ease-in-out",
                fontSize: "12px",
                fontFamily: '"Rubik", sans-serif',
                fontWeight: 500,
                border: 0,
                cursor: "pointer",
                backgroundColor: "oklch(35.29% .0876 256.87)",
                "&:hover": {
                  boxShadow: "0px 0px 0 0 #9c814f",
                  translate: "3px",
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
