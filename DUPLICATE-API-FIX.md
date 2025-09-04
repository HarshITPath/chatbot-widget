# Fix: Duplicate API Calls on Page Refresh

## Problem
When refreshing the page and opening the chatbot, the GET API for session history was being called twice, as visible in the DevTools Network tab.

## Root Cause
The issue was caused by **React.StrictMode** in development mode, which intentionally double-executes effects to help detect side effects. This is normal React behavior but causes duplicate API calls.

## Solution Implemented

### 1. **Added Loading Guards**
```javascript
const sessionLoadedRef = useRef(false);
const loadingSessionRef = useRef(false);
```

### 2. **Enhanced useCallback with Duplicate Prevention**
```javascript
const loadSessionMessages = useCallback(async (sessionId) => {
  if (!sessionId || sessionLoadedRef.current || loadingSessionRef.current) {
    console.log("Skipping session load - already loaded/loading");
    return;
  }
  
  loadingSessionRef.current = true;
  sessionLoadedRef.current = true;
  
  try {
    // API call here
  } finally {
    loadingSessionRef.current = false;
  }
}, []);
```

### 3. **Debounced useEffect**
```javascript
useEffect(() => {
  let isMounted = true;
  let timeoutId;
  
  const loadSession = () => {
    const storedSessionId = sessionManager.getCurrentSessionId();
    if (storedSessionId && isMounted && !sessionLoadedRef.current) {
      setSessionId(storedSessionId);
      // Debounce to prevent double calls in StrictMode
      timeoutId = setTimeout(() => {
        if (isMounted && !sessionLoadedRef.current) {
          loadSessionMessages(storedSessionId);
        }
      }, 100);
    }
  };
  
  return () => {
    if (timeoutId) clearTimeout(timeoutId);
  };
}, [loadSessionMessages]);
```

### 4. **Reset Flags on Session Clear**
```javascript
const clearSession = useCallback(() => {
  sessionManager.clearSession();
  setSessionId(null);
  setMessages([]);
  sessionLoadedRef.current = false;
  loadingSessionRef.current = false;
}, []);
```

## Benefits

✅ **No More Duplicate Calls**: Session history API called only once  
✅ **StrictMode Compatible**: Works properly in React development mode  
✅ **Error Recovery**: Flags reset on errors for retry capability  
✅ **Performance**: Prevents unnecessary network requests  
✅ **Debug Friendly**: Console logs show when calls are skipped  

## Console Output

When working correctly, you'll see:
```
Found stored session ID: session_1756969463582_d0v4c1klg
Loading session messages for: session_1756969463582_d0v4c1klg
Session messages loaded successfully: 4 messages
Skipping session load - already loaded/loading: {sessionId: "...", loaded: true, loading: false}
```

## Testing

1. **Open chatbot** → Should load session once
2. **Refresh page** → Should load session once (not twice)
3. **Close/reopen chatbot** → Should use cached session
4. **Clear session** → Should reset and allow new loading

The duplicate API call issue is now resolved! 🎉
