// import { useState, useRef, useEffect } from "react";
// import {
//   Box,
//   Paper,
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Divider,
//   Avatar,
//   TextareaAutosize,
// } from "@mui/material";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { ICONS } from "../assets/icons";
// import { BASE_URL } from "../utils/constant";

// const BotMessage = ({ message }) => {
//   return (
//         <Box
//           sx={{
//             "& > *:first-of-type": { mt: 0 },
//             "& > *:last-child": { mb: 0 },
//           }}
//         >
//           <ReactMarkdown
//             remarkPlugins={[remarkGfm]}
//             components={{
//               p: ({ children }) => (
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     m: 0,
//                     mb: 1,
//                     lineHeight: 1.5,
//                     fontSize: "0.875rem",
//                     whiteSpace: "pre-wrap",
//                     "&:last-child": { mb: 0 },
//                   }}
//                 >
//                   {children}
//                 </Typography>
//               ),
//               h1: ({ children }) => (
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: 700,
//                     m: 0,
//                     mb: 1.5,
//                     mt: 1.5,
//                     lineHeight: 1.3,
//                     fontSize: "1.1rem",
//                     color: "primary.main",
//                     "&:first-of-type": { mt: 0 },
//                   }}
//                 >
//                   {children}
//                 </Typography>
//               ),
//               h2: ({ children }) => (
//                 <Typography
//                   variant="subtitle1"
//                   sx={{
//                     fontWeight: 650,
//                     m: 0,
//                     mb: 1,
//                     mt: 1.5,
//                     lineHeight: 1.3,
//                     fontSize: "1rem",
//                     color: "primary.dark",
//                     "&:first-of-type": { mt: 0 },
//                   }}
//                 >
//                   {children}
//                 </Typography>
//               ),
//               h3: ({ children }) => (
//                 <Typography
//                   variant="body1"
//                   sx={{
//                     fontWeight: 600,
//                     m: 0,
//                     mb: 0.8,
//                     mt: 1,
//                     lineHeight: 1.3,
//                     fontSize: "0.95rem",
//                     "&:first-of-type": { mt: 0 },
//                   }}
//                 >
//                   {children}
//                 </Typography>
//               ),
//               ul: ({ children }) => (
//                 <Box
//                   component="ul"
//                   sx={{
//                     pl: 2.5,
//                     m: 0,
//                     mb: 1,
//                     mt: 0.5,
//                     lineHeight: 1.4,
//                     "& li": { mb: 0.4, pl: 0.5 },
//                     "& li::marker": { color: "primary.main" },
//                   }}
//                 >
//                   {children}
//                 </Box>
//               ),
//               ol: ({ children }) => (
//                 <Box
//                   component="ol"
//                   sx={{
//                     pl: 2.5,
//                     m: 0,
//                     mb: 1,
//                     mt: 0.5,
//                     lineHeight: 1.4,
//                     "& li": { mb: 0.4, pl: 0.5 },
//                     "& li::marker": { color: "primary.main", fontWeight: 600 },
//                   }}
//                 >
//                   {children}
//                 </Box>
//               ),
//               li: ({ children }) => (
//                 <Typography
//                   component="li"
//                   variant="body2"
//                   sx={{
//                     fontSize: "0.875rem",
//                     lineHeight: 1.4,
//                     color: "text.primary",
//                   }}
//                 >
//                   {children}
//                 </Typography>
//               ),
//               a: ({ href, children }) => (
//                 <Box
//                   component="a"
//                   href={href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   sx={{
//                     color: "primary.main",
//                     textDecoration: "none",
//                     fontSize: "inherit",
//                     fontWeight: 500,
//                     borderBottom: "1px solid transparent",
//                     transition: "all 0.2s ease",
//                     "&:hover": {
//                       borderBottomColor: "primary.main",
//                       color: "primary.dark",
//                     },
//                   }}
//                 >
//                   {children}
//                 </Box>
//               ),
//               blockquote: ({ children }) => (
//                 <Box
//                   component="blockquote"
//                   sx={{
//                     borderLeft: "4px solid",
//                     borderColor: "primary.light",
//                     bgcolor: "grey.50",
//                     pl: 2,
//                     py: 1,
//                     my: 1.5,
//                     mx: 0,
//                     fontStyle: "italic",
//                     "& p": { m: 0 },
//                   }}
//                 >
//                   {children}
//                 </Box>
//               ),
//               code: ({ inline, children }) =>
//                 inline ? (
//                   <Box
//                     component="code"
//                     sx={{
//                       bgcolor: "grey.100",
//                       color: "error.dark",
//                       px: 0.6,
//                       py: 0.2,
//                       borderRadius: 1,
//                       fontSize: "0.85rem",
//                       fontFamily: '"Fira Code", "Consolas", monospace',
//                       border: "1px solid",
//                       borderColor: "grey.300",
//                     }}
//                   >
//                     {children}
//                   </Box>
//                 ) : (
//                   <Box
//                     component="pre"
//                     sx={{
//                       bgcolor: "grey.900",
//                       color: "grey.100",
//                       p: 2,
//                       borderRadius: 2,
//                       fontSize: "0.8rem",
//                       overflowX: "auto",
//                       m: 0,
//                       my: 1.5,
//                       fontFamily: '"Fira Code", "Consolas", monospace',
//                       border: "1px solid",
//                       borderColor: "grey.700",
//                       "& code": {
//                         bgcolor: "transparent",
//                         p: 0,
//                         fontSize: "inherit",
//                         fontFamily: "inherit",
//                       },
//                     }}
//                   >
//                     <code>{children}</code>
//                   </Box>
//                 ),
//               table: ({ children }) => (
//                 <Box sx={{ overflowX: "auto", my: 1.5 }}>
//                   <Box
//                     component="table"
//                     sx={{
//                       width: "100%",
//                       borderCollapse: "collapse",
//                       border: "1px solid",
//                       borderColor: "grey.300",
//                       fontSize: "0.85rem",
//                     }}
//                   >
//                     {children}
//                   </Box>
//                 </Box>
//               ),
//               thead: ({ children }) => (
//                 <Box
//                   component="thead"
//                   sx={{
//                     bgcolor: "grey.100",
//                     "& th": {
//                       border: "1px solid",
//                       borderColor: "grey.300",
//                       p: 1,
//                       fontWeight: 600,
//                       textAlign: "left",
//                     },
//                   }}
//                 >
//                   {children}
//                 </Box>
//               ),
//               tbody: ({ children }) => (
//                 <Box
//                   component="tbody"
//                   sx={{
//                     "& td": {
//                       border: "1px solid",
//                       borderColor: "grey.300",
//                       p: 1,
//                     },
//                     "& tr:nth-of-type(even)": { bgcolor: "grey.50" },
//                   }}
//                 >
//                   {children}
//                 </Box>
//               ),
//               hr: () => <Divider sx={{ my: 2, borderColor: "grey.400" }} />,
//             }}
//           >
//             {message}
//           </ReactMarkdown>
//         </Box>
//   );
// };

// export default function ChatWindow({ onClose, messages, setMessages }) {
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [hasFirstChunk, setHasFirstChunk] = useState(false); // track first chunk
//   const messagesEndRef = useRef(null);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);

//     const question = input;
//     setInput("");
//     setLoading(true);
//     setHasFirstChunk(false);

//     try {
//       const res = await fetch(`${BASE_URL}/ask`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question, useStreaming: true }),
//       });

//       if (!res.body) throw new Error("No response body");

//       const reader = res.body.getReader();
//       const decoder = new TextDecoder();

//       let botMessageAdded = false;

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;

//         const chunk = decoder.decode(value, { stream: true });
//         const lines = chunk
//           .split("\n")
//           .filter((line) => line.trim().startsWith("data:"));

//         for (const line of lines) {
//           try {
//             const json = JSON.parse(line.replace(/^data:\s*/, ""));

//             if (json.chunk) {
//               // First chunk arrived
//               if (!botMessageAdded) {
//                 setMessages((prev) => [...prev, { sender: "bot", text: "" }]);
//                 botMessageAdded = true;
//                 setHasFirstChunk(true);
//               }

//               // Append chunk
//               setMessages((prev) => {
//                 const updated = [...prev];
//                 const lastIndex = updated.length - 1;
//                 if (updated[lastIndex]?.sender === "bot") {
//                   updated[lastIndex] = {
//                     ...updated[lastIndex],
//                     text: updated[lastIndex].text + json.chunk,
//                   };
//                 }
//                 return updated;
//               });
//             }
//           } catch (e) {
//             console.error("Failed to parse chunk:", line, e);
//           }
//         }
//       }
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "⚠️ Something went wrong. Please try again." },
//       ]);
//       console.error("Chat error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   return (
//     <Paper
//       elevation={8}
//       sx={{
//         position: "fixed",
//         bottom: 20,
//         right: 20,
//         left: { xs: 10, sm: "auto" },
//         width: {
//           xs: "calc(100vw - 16px)",
//           sm: "min(90vw, 540px)",
//           md: "min(50vw, 650px)",
//           lg: "min(45vw, 720px)",
//           xl: "min(40vw, 800px)",
//         },
//         height: {
//           xs: "calc(100vh - 32px)",
//           sm: "min(90vh, 720px)",
//           md: "min(85vh, 750px)",
//           lg: "min(80vh, 800px)",
//           xl: "min(75vh, 850px)",
//         },
//         display: "flex",
//         flexDirection: "column",
//         borderRadius: { xs: 2, sm: 3 },
//         overflow: "hidden",
//         zIndex: 1300,
//         boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
//         border: "1px solid",
//         borderColor: "grey.200",
//       }}
//     >
//       {/* Header */}
//       <AppBar position="static" color="primary">
//         <Toolbar
//           variant="dense"
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             minHeight: { xs: 48, sm: 56 },
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//             <Avatar
//               sx={{
//                 bgcolor: "rgba(255,255,255,0.2)",
//                 width: 32,
//                 height: 32,
//                 fontSize: "1.2rem",
//               }}
//             >
//               🤖
//             </Avatar>
//             <Typography
//               variant="subtitle1"
//               sx={{ fontWeight: 600, lineHeight: 1.2 }}
//             >
//               IT Path Assistant
//             </Typography>
//           </Box>
//           <IconButton
//             size="small"
//             color="inherit"
//             onClick={onClose}
//             sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
//           >
//             <ICONS.CLOSE fontSize="small" />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       {/* Messages */}
//       <Box
//         sx={{
//           flex: 1,
//           overflowY: "auto",
//           bgcolor: "#E5E4E2",
//           "&::-webkit-scrollbar": { width: "6px" },
//           "&::-webkit-scrollbar-thumb": {
//             background: "#d0d0d0",
//             borderRadius: "10px",
//           },
//         }}
//       >
//         <Box sx={{ p: { xs: 1, sm: 2 } }}>
//           {messages.map((msg, i) => (
//             <Box
//               key={i}
//               sx={{
//                 display: "flex",
//                 justifyContent:
//                   msg.sender === "user" ? "flex-end" : "flex-start",
//                 mb: 1.5,
//                 alignItems: "flex-start",
//                 gap: 1,
//               }}
//             >
//               {msg.sender === "bot" && (
//                 <Avatar
//                   sx={{
//                     width: 28,
//                     height: 28,
//                     bgcolor: "primary.main",
//                     fontSize: "0.8rem",
//                     mt: 0.5,
//                   }}
//                 >
//                   🤖
//                 </Avatar>
//               )}
//               <Box
//                 sx={{
//                   maxWidth: "75%",
//                   px: 2,
//                   py: 1.2,
//                   borderRadius: 1.5,
//                   bgcolor:
//                     msg.sender === "user" ? "primary.main" : "background.paper",
//                   color: msg.sender === "user" ? "white" : "text.primary",
//                   border: msg.sender === "bot" ? "1px solid" : "none",
//                   borderColor:
//                     msg.sender === "bot" ? "grey.200" : "transparent",
//                 }}
//               >
//                 {msg.sender === "bot" ? (
//                   <BotMessage message={msg.text} />
//                 ) : (
//                   <Typography
//                     variant="body2"
//                     sx={{ lineHeight: 1.4, whiteSpace: "pre-wrap" }}
//                   >
//                     {msg.text}
//                   </Typography>
//                 )}
//               </Box>
//               {msg.sender === "user" && (
//                 <Avatar
//                   sx={{
//                     width: 28,
//                     height: 28,
//                     bgcolor: "secondary.main",
//                     fontSize: "0.8rem",
//                     mt: 0.5,
//                   }}
//                 >
//                   👤
//                 </Avatar>
//               )}
//             </Box>
//           ))}

//           {/* Loading fallback UI */}
//           {loading && !hasFirstChunk && (
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//                 mt: 1,
//                 mb: 2,
//               }}
//             >
//               <Avatar
//                 sx={{
//                   width: 28,
//                   height: 28,
//                   bgcolor: "primary.main",
//                   fontSize: "0.8rem",
//                 }}
//               >
//                 🤖
//               </Avatar>
//               <Box
//                 sx={{
//                   bgcolor: "background.paper",
//                   px: 2,
//                   py: 1.5,
//                   borderRadius: "4px",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                 }}
//               >
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ fontSize: "0.85rem" }}
//                 >
//                   AI is thinking
//                 </Typography>
//                 <Box sx={{ display: "flex", gap: 0.5 }}>
//                   {[0, 1, 2].map((i) => (
//                     <Box
//                       key={i}
//                       sx={{
//                         width: 6,
//                         height: 6,
//                         borderRadius: "50%",
//                         bgcolor: "primary.main",
//                         animation: `bounce 1.4s ease-in-out ${
//                           i * 0.2
//                         }s infinite`,
//                         "@keyframes bounce": {
//                           "0%, 80%, 100%": {
//                             transform: "scale(0.8)",
//                             opacity: 0.5,
//                           },
//                           "40%": { transform: "scale(1)", opacity: 1 },
//                         },
//                       }}
//                     />
//                   ))}
//                 </Box>
//               </Box>
//             </Box>
//           )}
//         </Box>
//         <div ref={messagesEndRef} />
//       </Box>

//       <Divider />

//       {/* Input */}
//       <Box
//         sx={{
//           display: "flex",
//           p: 2,
//           alignItems: "flex-end",
//           gap: 1.5,
//           bgcolor: "background.paper",
//         }}
//       >
//         <TextareaAutosize
//           minRows={1}
//           maxRows={4}
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               if (!loading) sendMessage();
//             }
//           }}
//           style={{
//             flex: 1,
//             borderRadius: "20px",
//             padding: "12px 16px",
//             border: "2px solid #e0e0e0",
//             resize: "none",
//             outline: "none",
//             fontSize: "14px",
//           }}
//         />
//         <IconButton
//           onClick={sendMessage}
//           disabled={!input.trim() || loading}
//           sx={{
//             bgcolor: "primary.main",
//             color: "white",
//             width: 44,
//             height: 44,
//             "&:hover": { bgcolor: "primary.dark", transform: "scale(1.05)" },
//             "&:disabled": { bgcolor: "grey.300", color: "grey.500" },
//           }}
//         >
//           <ICONS.SEND fontSize="small" />
//         </IconButton>
//       </Box>
//     </Paper>
//   );
// }


import { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  Avatar,
  TextareaAutosize,
  Fade,
  Grow,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ICONS } from "../assets/icons";
import { BASE_URL } from "../utils/constant";

// Animated Text Component for character-by-character streaming animation
const StreamingText = ({ text, isStreaming = false, speed = 20 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const animationRef = useRef(null);
  const prevTextLengthRef = useRef(0);

  useEffect(() => {
    // If text is empty, reset
    if (!text) {
      setDisplayedText("");
      setCurrentIndex(0);
      prevTextLengthRef.current = 0;
      return;
    }

    // If not streaming, show full text immediately
    if (!isStreaming) {
      setDisplayedText(text);
      setCurrentIndex(text.length);
      prevTextLengthRef.current = text.length;
      return;
    }

    // Clear existing animation
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    // Start from where we left off when new content is added
    const startIndex = Math.min(currentIndex, text.length);

    // If new content was added, continue animation from current position
    if (text.length > prevTextLengthRef.current) {
      let index = startIndex;
      
      const animateNextChar = () => {
        if (index < text.length) {
          setDisplayedText(text.substring(0, index + 1));
          setCurrentIndex(index + 1);
          index++;
          
          // Variable speed based on character type
          let delay = speed;
          const char = text[index - 1];
          
          // Slower for punctuation to create natural pauses
          if (/[.!?]/.test(char)) {
            delay = speed * 4;
          } else if (/[,;:]/.test(char)) {
            delay = speed * 2;
          } else if (/\s/.test(char)) {
            delay = speed * 0.5;
          }
          
          animationRef.current = setTimeout(animateNextChar, delay);
        }
      };

      // Start animation with a small delay to make it smooth
      animationRef.current = setTimeout(animateNextChar, speed);
    }

    prevTextLengthRef.current = text.length;

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [text, isStreaming, speed, currentIndex]);

  // Reset when starting a new message
  useEffect(() => {
    if (isStreaming && text === "") {
      setDisplayedText("");
      setCurrentIndex(0);
      prevTextLengthRef.current = 0;
    }
  }, [isStreaming, text]);

  return displayedText;
};

const BotMessage = ({ message, isStreaming = false }) => {
  // For streaming, show text character by character with cursor
  // For non-streaming, show full markdown rendering
  
  if (isStreaming) {
    return (
      <Box
        sx={{
          "& > *:first-of-type": { mt: 0 },
          "& > *:last-child": { mb: 0 },
          position: 'relative',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            m: 0,
            lineHeight: 1.5,
            fontSize: "0.875rem",
            whiteSpace: "pre-wrap",
            display: 'inline',
          }}
        >
          <StreamingText text={message} isStreaming={isStreaming} speed={15} />
        </Typography>
        {/* Animated cursor */}
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            width: '2px',
            height: '1.2em',
            backgroundColor: 'primary.main',
            marginLeft: '3px',
            verticalAlign: 'top',
            animation: 'blink 1.2s ease-in-out infinite',
            '@keyframes blink': {
              '0%, 50%': { opacity: 1 },
              '51%, 100%': { opacity: 0 },
            },
          }}
        />
      </Box>
    );
  }

  // Full markdown rendering when not streaming
  return (
    <Box
      sx={{
        "& > *:first-of-type": { mt: 0 },
        "& > *:last-child": { mb: 0 },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <Typography
              variant="body2"
              sx={{
                m: 0,
                mb: 1,
                lineHeight: 1.5,
                fontSize: "0.875rem",
                whiteSpace: "pre-wrap",
                "&:last-child": { mb: 0 },
              }}
            >
              {children}
            </Typography>
          ),
          h1: ({ children }) => (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                m: 0,
                mb: 1.5,
                mt: 1.5,
                lineHeight: 1.3,
                fontSize: "1.1rem",
                color: "primary.main",
                "&:first-of-type": { mt: 0 },
              }}
            >
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 650,
                m: 0,
                mb: 1,
                mt: 1.5,
                lineHeight: 1.3,
                fontSize: "1rem",
                color: "primary.dark",
                "&:first-of-type": { mt: 0 },
              }}
            >
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                m: 0,
                mb: 0.8,
                mt: 1,
                lineHeight: 1.3,
                fontSize: "0.95rem",
                "&:first-of-type": { mt: 0 },
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
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                lineHeight: 1.4,
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
                  color: "primary.dark",
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
          hr: () => <Divider sx={{ my: 2, borderColor: "grey.400" }} />,
        }}
      >
        {message}
      </ReactMarkdown>
    </Box>
  );
};

// Enhanced loading component with better animations
const ThinkingIndicator = () => (
  <Fade in timeout={300}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mt: 1,
        mb: 2,
      }}
    >
      <Avatar
        sx={{
          width: 28,
          height: 28,
          bgcolor: "primary.main",
          fontSize: "0.8rem",
        }}
      >
        🤖
      </Avatar>
      <Box
        sx={{
          bgcolor: "background.paper",
          px: 2,
          py: 1.5,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: 1,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          border: "1px solid",
          borderColor: "grey.200",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.85rem" }}
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
                  "0%, 80%, 100%": {
                    transform: "scale(0.8)",
                    opacity: 0.5,
                  },
                  "40%": { transform: "scale(1)", opacity: 1 },
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  </Fade>
);

export default function ChatWindow({ onClose, messages, setMessages }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasFirstChunk, setHasFirstChunk] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState(null);
  const messagesEndRef = useRef(null);
  const streamingTimeoutRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { 
      sender: "user", 
      text: input, 
      id: Date.now(),
      timestamp: new Date() 
    };
    
    setMessages((prev) => [...prev, userMessage]);

    const question = input;
    setInput("");
    setLoading(true);
    setHasFirstChunk(false);
    setStreamingMessageId(null);

    try {
      const res = await fetch(`${BASE_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, useStreaming: true }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let botMessageAdded = false;
      let currentMessageId = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk
          .split("\n")
          .filter((line) => line.trim().startsWith("data:"));

        for (const line of lines) {
          try {
            const json = JSON.parse(line.replace(/^data:\s*/, ""));

            if (json.chunk) {
              // First chunk arrived - add bot message with smooth entrance
              if (!botMessageAdded) {
                currentMessageId = Date.now();
                setMessages((prev) => [
                  ...prev, 
                  { 
                    sender: "bot", 
                    text: "",
                    id: currentMessageId,
                    timestamp: new Date(),
                    isStreaming: true 
                  }
                ]);
                botMessageAdded = true;
                setHasFirstChunk(true);
                setStreamingMessageId(currentMessageId);
              }

              // Append chunk
                for (const char of json.chunk) {
                    await new Promise((resolve) => setTimeout(resolve, 0));
                  setMessages((prev) => {
                    const updated = [...prev];
                    const lastIndex = updated.length - 1;
                    if (updated[lastIndex]?.sender === "bot") {
                      updated[lastIndex] = {
                        ...updated[lastIndex],
                        text: updated[lastIndex].text + char,
                      };
                    }
                    return updated;
                  });
                }
            }
          } catch (e) {
            console.error("Failed to parse chunk:", line, e);
          }
        }
      }
    } catch (error) {
      const errorMessageId = Date.now();
      setMessages((prev) => [
        ...prev,
        { 
          sender: "bot", 
          text: "⚠️ Something went wrong. Please try again.",
          id: errorMessageId,
          timestamp: new Date(),
          isStreaming: false 
        },
      ]);
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
      // Final cleanup - ensure all animations complete
      setTimeout(() => {
        setMessages((prev) => 
          prev.map(msg => ({ ...msg, isStreaming: false }))
        );
        setStreamingMessageId(null);
      }, 2000); // Extended timeout for character animation
    }
  };

  // Enhanced auto-scroll with smooth behavior
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ 
          behavior: "smooth", 
          block: "end",
          inline: "nearest" 
        });
      }
    };

    // Immediate scroll for new messages
    scrollToBottom();
    
    // Additional scroll after a short delay to ensure content is rendered
    const scrollTimeout = setTimeout(scrollToBottom, 150);
    
    return () => clearTimeout(scrollTimeout);
  }, [messages, loading]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        left: { xs: 10, sm: "auto" },
        width: {
          xs: "calc(100vw - 16px)",
          sm: "min(90vw, 540px)",
          md: "min(50vw, 650px)",
          lg: "min(45vw, 720px)",
          xl: "min(40vw, 800px)",
        },
        height: {
          xs: "calc(100vh - 32px)",
          sm: "min(90vh, 720px)",
          md: "min(85vh, 750px)",
          lg: "min(80vh, 800px)",
          xl: "min(75vh, 850px)",
        },
        display: "flex",
        flexDirection: "column",
        borderRadius: { xs: 2, sm: 3 },
        overflow: "hidden",
        zIndex: 1300,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        border: "1px solid",
        borderColor: "grey.200",
      }}
    >
      {/* Header */}
      <AppBar position="static" color="primary">
        <Toolbar
          variant="dense"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: { xs: 48, sm: 56 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                width: 32,
                height: 32,
                fontSize: "1.2rem",
              }}
            >
              🤖
            </Avatar>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, lineHeight: 1.2 }}
            >
              IT Path Assistant
            </Typography>
          </Box>
          <IconButton
            size="small"
            color="inherit"
            onClick={onClose}
            sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
          >
            <ICONS.CLOSE fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          bgcolor: "#E5E4E2",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            background: "#d0d0d0",
            borderRadius: "10px",
          },
        }}
      >
        <Box sx={{ p: { xs: 1, sm: 2 } }}>
          {messages.map((msg, i) => (
            <Grow
              key={msg.id || i}
              in={true}
              timeout={300}
              style={{ transformOrigin: msg.sender === "user" ? "right center" : "left center" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                  mb: 1.5,
                  alignItems: "flex-start",
                  gap: 1,
                }}
              >
                {msg.sender === "bot" && (
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      bgcolor: "primary.main",
                      fontSize: "0.8rem",
                      mt: 0.5,
                      // Enhanced streaming animation with glow effect
                      ...(msg.isStreaming && {
                        animation: 'pulseGlow 2s ease-in-out infinite',
                        '@keyframes pulseGlow': {
                          '0%, 100%': { 
                            transform: 'scale(1)',
                            boxShadow: '0 0 0 0 rgba(25, 118, 210, 0.4)'
                          },
                          '50%': { 
                            transform: 'scale(1.08)',
                            boxShadow: '0 0 0 8px rgba(25, 118, 210, 0)'
                          },
                        },
                      }),
                    }}
                  >
                    🤖
                  </Avatar>
                )}
                <Box
                  sx={{
                    maxWidth: "75%",
                    px: 2,
                    py: 1.2,
                    borderRadius: 1.5,
                    bgcolor:
                      msg.sender === "user" ? "primary.main" : "background.paper",
                    color: msg.sender === "user" ? "white" : "text.primary",
                    border: msg.sender === "bot" ? "1px solid" : "none",
                    borderColor:
                      msg.sender === "bot" ? "grey.200" : "transparent",
                    // Enhanced effects for streaming messages
                    ...(msg.isStreaming && msg.sender === "bot" && {
                      boxShadow: "0 4px 20px rgba(25, 118, 210, 0.15), 0 0 0 1px rgba(25, 118, 210, 0.1)",
                      borderColor: "rgba(25, 118, 210, 0.2)",
                      background: "linear-gradient(135deg, #ffffff 0%, #f8fafe 100%)",
                      animation: 'shimmer 3s ease-in-out infinite',
                      '@keyframes shimmer': {
                        '0%, 100%': { 
                          transform: 'translateX(0)',
                        },
                        '50%': { 
                          transform: 'translateX(1px)',
                        },
                      },
                    }),
                    // Default shadow for non-streaming
                    ...(!msg.isStreaming && {
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }),
                    transition: "all 0.3s ease",
                  }}
                >
                  {msg.sender === "bot" ? (
                    <BotMessage message={msg.text} isStreaming={msg.isStreaming} />
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ lineHeight: 1.4, whiteSpace: "pre-wrap" }}
                    >
                      {msg.text}
                    </Typography>
                  )}
                </Box>
                {msg.sender === "user" && (
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      bgcolor: "secondary.main",
                      fontSize: "0.8rem",
                      mt: 0.5,
                    }}
                  >
                    👤
                  </Avatar>
                )}
              </Box>
            </Grow>
          ))}

          {/* Enhanced loading indicator */}
          {loading && !hasFirstChunk && <ThinkingIndicator />}
        </Box>
        <div ref={messagesEndRef} />
      </Box>

      <Divider />

      {/* Input */}
      <Box
        sx={{
          display: "flex",
          p: 2,
          alignItems: "flex-end",
          gap: 1.5,
          bgcolor: "background.paper",
        }}
      >
        <TextareaAutosize
          minRows={1}
          maxRows={4}
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!loading) sendMessage();
            }
          }}
          style={{
            flex: 1,
            borderRadius: "20px",
            padding: "12px 16px",
            border: "2px solid #e0e0e0",
            resize: "none",
            outline: "none",
            fontSize: "14px",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#1976d2";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e0e0e0";
          }}
        />
        <IconButton
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          sx={{
            bgcolor: "primary.main",
            color: "white",
            width: 44,
            height: 44,
            transition: "all 0.2s ease",
            "&:hover": { 
              bgcolor: "primary.dark", 
              transform: "scale(1.05)",
            },
            "&:active": {
              transform: "scale(0.95)",
            },
            "&:disabled": { 
              bgcolor: "grey.300", 
              color: "grey.500",
              transform: "none",
            },
          }}
        >
          <ICONS.SEND fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  );
}