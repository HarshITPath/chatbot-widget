# Streaming & Non-Streaming Chat Integration

This document explains how the chatbot widget now supports both streaming and non-streaming responses from your session-based chat API.

## API Response Modes

### 1. Streaming Mode (`useStreaming: true`)
When `useStreaming` is set to `true` in the request body, the API returns chunked responses:

**Request:**
```json
{
  "initialMessage": "I'm interested in building a Virtual healthcare app",
  "useStreaming": true
}
```

**Response:** Server-Sent Events (SSE) format
```
data: {"chunk": "IT Path Solutions specializes"}
data: {"chunk": " in creating custom-tailored"}
data: {"chunk": " app solutions, including"}
data: {"sessionId": "session_1756902366243_bs9ppb8sn", "messageCount": 2}
data: {"chunk": " virtual healthcare apps."}
data: {"done": true, "finalResponse": "Complete response text"}
```

### 2. Non-Streaming Mode (`useStreaming: false` or omitted)
When `useStreaming` is `false` or not provided, the API returns a complete JSON response:

**Request:**
```json
{
  "initialMessage": "I'm interested in building a Virtual healthcare app"
}
```

**Response:**
```json
{
  "response": "IT Path Solutions specializes in creating custom-tailored app solutions, including virtual healthcare apps...",
  "sessionId": "session_1756902366243_bs9ppb8sn",
  "messageCount": 2,
  "tokenUsage": {...},
  "cacheHit": false
}
```

## Frontend Implementation

### Configuration Options

You can control the streaming behavior through the widget configuration:

```javascript
// Enable streaming (default)
const streamingConfig = {
  apiUrl: "http://192.168.0.39:3000/api",
  useStreaming: true,  // Real-time chunks
  botName: "IT Path Assistant"
};

// Disable streaming for instant responses
const nonStreamingConfig = {
  apiUrl: "http://192.168.0.39:3000/api",
  useStreaming: false, // Complete JSON response
  botName: "IT Path Assistant"
};
```

### API Client Functions

The `chatAPI` functions now support both modes:

```javascript
// Start chat with streaming
await chatAPI.startChat("Hello", true);  // useStreaming = true

// Start chat without streaming
await chatAPI.startChat("Hello", false); // useStreaming = false

// Continue chat with streaming
await chatAPI.continueChat(sessionId, "Next message", true);

// Continue chat without streaming
await chatAPI.continueChat(sessionId, "Next message", false);
```

### Automatic Mode Detection

The `sendMessage` function automatically handles both response types:

```javascript
// Streaming mode - processes chunks in real-time
const sendMessage = useCallback(async (useStreaming = true) => {
  if (useStreaming) {
    // Handle Server-Sent Events
    const response = await chatAPI.sendMessage(messageText, sessionId, true);
    const reader = response.body.getReader();
    // Process streaming chunks...
  } else {
    // Handle JSON response
    const data = await chatAPI.sendMessage(messageText, sessionId, false);
    // Process complete response...
  }
});
```

## Benefits of Each Mode

### Streaming Mode ✨
- **Real-time feedback**: Users see responses as they're generated
- **Better UX**: Feels more conversational and responsive
- **Progressive loading**: Long responses appear gradually
- **Reduced perceived latency**: Users see content immediately

### Non-Streaming Mode ⚡
- **Simpler implementation**: Standard JSON request/response
- **Better for mobile**: Reduces connection overhead
- **Easier debugging**: Complete responses in single network calls
- **Lower bandwidth**: No streaming overhead

## Session Management

Both modes maintain the same session management:

1. **First message** → Creates new session
2. **Subsequent messages** → Uses existing session
3. **Session persistence** → Stored in localStorage
4. **Conversation history** → Retrieved via `/sessions/{sessionId}/messages`

## Frontend Response Handling

### Streaming Response Processing
```javascript
// Parse streaming chunks
const lines = chunk.split("\n").filter(line => line.trim().startsWith("data:"));
for (const line of lines) {
  const json = JSON.parse(line.replace(/^data:\s*/, ""));
  
  if (json.chunk) {
    // Update UI with new chunk
    addToStream(json.chunk, updateBotMessage);
  }
  
  if (json.sessionId) {
    // Store session metadata
    setSessionId(json.sessionId);
  }
  
  if (json.done) {
    // Response complete
    flushStream(updateBotMessage);
  }
}
```

### Non-Streaming Response Processing
```javascript
// Handle complete JSON response
const data = await chatAPI.sendMessage(messageText, sessionId, false);

const botMessage = {
  sender: "bot",
  text: data.response,
  sessionId: data.sessionId,
  messageCount: data.messageCount,
  timestamp: new Date().toISOString()
};

setMessages(prev => [...prev, botMessage]);
```

## Error Handling

Both modes use the same error handling strategy:

```javascript
try {
  // API call (streaming or non-streaming)
} catch (error) {
  setMessages(prev => [...prev, {
    sender: "bot",
    text: "⚠️ Something went wrong. Please try again."
  }]);
  console.error("Chat error:", error);
}
```

## Usage Examples

### Example 1: Enable Streaming Globally
```javascript
const config = {
  apiUrl: "http://192.168.0.39:3000/api",
  useStreaming: true,  // All responses will be streamed
  botName: "Streaming Assistant"
};
```

### Example 2: Disable Streaming for Performance
```javascript
const config = {
  apiUrl: "http://192.168.0.39:3000/api",
  useStreaming: false, // All responses will be instant JSON
  botName: "Fast Assistant"
};
```

### Example 3: Dynamic Mode Switching
```javascript
// User can toggle between modes
const [streamingEnabled, setStreamingEnabled] = useState(true);

const config = {
  apiUrl: "http://192.168.0.39:3000/api",
  useStreaming: streamingEnabled,
  botName: streamingEnabled ? "Streaming Bot" : "Instant Bot"
};
```

## Files Modified

1. **`src/api/client.js`** - Added streaming parameter to all chat functions
2. **`src/hooks/useChatbotLogic.js`** - Dual-mode response handling
3. **`src/components/ChatModeExample.jsx`** - Demo component for both modes

## Configuration Summary

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `useStreaming` | boolean | `true` | Enable/disable streaming responses |
| `apiUrl` | string | Required | Your API base URL |
| `botName` | string | "IT Path Assistant" | Bot display name |

The implementation now seamlessly handles both streaming and non-streaming responses while maintaining the same session-based conversation flow!
