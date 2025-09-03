# Session-Based Chat API Integration

This document explains how the chatbot widget now integrates with your session-based chat API.

## API Endpoints Used

### 1. Start Chat Session
- **Endpoint**: `POST /api/start-chat`
- **Purpose**: Creates a new chat session with the first user message
- **Request Body**:
  ```json
  {
    "initialMessage": "I'm interested in building a similar Virtual healthcare app solution for my company in-house."
  }
  ```
- **Response**:
  ```json
  {
    "response": "IT Path Solutions specializes in creating custom-tailored app solutions...",
    "sessionId": "session_1756902366243_bs9ppb8sn",
    "messageCount": 2,
    "tokenUsage": {...},
    "cacheHit": false,
    "usageMetadata": {...}
  }
  ```

### 2. Continue Chat Session
- **Endpoint**: `POST /api/chat/{sessionId}/continue`
- **Purpose**: Continues an existing chat session with a new user message
- **Request Body**:
  ```json
  {
    "message": "How can I connect with sales team"
  }
  ```
- **Response**: Same format as start chat

### 3. Get Session Messages
- **Endpoint**: `GET /api/sessions/{sessionId}/messages`
- **Purpose**: Retrieves all messages from a specific session
- **Response**:
  ```json
  {
    "sessionId": "session_1756902366243_bs9ppb8sn",
    "messages": [
      {
        "sessionId": "session_1756902366243_bs9ppb8sn",
        "role": "user",
        "content": "I'm interested in building a similar Virtual healthcare app solution...",
        "timestamp": "2025-09-03T12:26:13.806Z",
        "messageIndex": 1
      },
      {
        "sessionId": "session_1756902366243_bs9ppb8sn",
        "role": "assistant",
        "content": "IT Path Solutions specializes in creating custom-tailored app solutions...",
        "timestamp": "2025-09-03T12:26:14.582Z",
        "messageIndex": 2
      }
    ],
    "count": 4,
    "historyType": "comprehensive"
  }
  ```

## Features Implemented

### 1. Session Management
- **Automatic Session Creation**: Creates session on first message
- **Session Persistence**: Stores session ID in localStorage
- **Session Recovery**: Automatically loads previous conversation when widget reopens
- **Context Continuity**: Your backend handles all context persistence

### 2. Local Storage Integration
- **Session Storage**: `chatbot-session-id` stores current session
- **Session History**: `chatbot-session-history` stores session metadata
- **Automatic Cleanup**: Invalid sessions are automatically cleared

### 3. UI Features
- **Session Indicator**: Shows shortened session ID in header
- **Clear Session Button**: Allows users to start fresh conversation
- **Conversation Persistence**: Messages persist across browser sessions

### 4. Error Handling
- **Invalid Session**: Automatically clears invalid sessions
- **Network Errors**: Graceful error messages
- **Fallback**: Works without session for first message

## Configuration

### Base URL Configuration
Update `src/utils/constant/index.js`:
```javascript
export const BASE_URL = "http://localhost:3000" // Your API base URL
```

### Widget Configuration
The widget accepts an `apiUrl` config option:
```javascript
const config = {
  apiUrl: "http://localhost:3000", // Your API server
  botName: "IT Path Assistant",
  // ... other config options
};
```

## Usage Flow

1. **First Message**: User sends initial message
   - Widget calls `/api/start-chat` with `initialMessage`
   - Receives `sessionId` and stores it in localStorage
   - Displays bot response

2. **Subsequent Messages**: User continues conversation
   - Widget calls `/api/chat/{sessionId}/continue` with `message`
   - Context is automatically maintained by your backend
   - Displays bot response

3. **Widget Reopen**: User closes and reopens widget
   - Widget loads stored `sessionId` from localStorage
   - Calls `/api/sessions/{sessionId}/messages` to load conversation history
   - User can continue where they left off

4. **Clear Session**: User clicks refresh/clear button
   - Clears localStorage session data
   - Next message will start a new session

## API Integration Benefits

✅ **Simple Integration**: Only 2 main API endpoints needed  
✅ **Session Management**: Create session on first message, reuse for follow-ups  
✅ **Context Automatic**: Your backend handles all context persistence  
✅ **Show All Conversations**: Complete conversation history by session  
✅ **Error Recovery**: Graceful handling of invalid/expired sessions  
✅ **Performance**: Efficient message loading and caching  

## Files Modified

1. `src/hooks/useChatbotLogic.js` - Main chat logic with session management
2. `src/api/client.js` - API client with session-based endpoints
3. `src/utils/sessionManager.js` - Session storage utility
4. `src/components/chat-window/index.jsx` - UI updates for session display
5. `src/assets/icons/index.js` - Added refresh icon
6. `src/utils/constant/index.js` - Updated base URL format

The implementation is now ready to work with your session-based chat API!
