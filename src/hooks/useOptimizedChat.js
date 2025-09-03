import { useCallback, useRef, useMemo } from 'react';

/**
 * Hook for optimizing message rendering
 * Memoizes message keys and prevents unnecessary re-renders
 */
export const useMessageOptimization = (messages) => {
  // Create stable keys for messages to prevent unnecessary re-renders
  const messageKeys = useMemo(() => {
    return messages?.map((msg, index) => {
      // Create a stable key based on content and position
      const contentHash = msg.text.length + msg.sender + index;
      return `${msg.sender}-${index}-${contentHash}`;
    });
  }, [messages]);

  // Memoize message chunks for better performance
  const messageChunks = useMemo(() => {
    const chunkSize = 50; // Render messages in chunks of 50
    const chunks = [];
    
    for (let i = 0; i < messages.length; i += chunkSize) {
      chunks.push(messages.slice(i, i + chunkSize));
    }
    
    return chunks;
  }, [messages]);

  return {
    messageKeys,
    messageChunks,
    totalMessages: messages.length
  };
};

/**
 * Hook for optimizing streaming updates
 * Reduces the frequency of state updates during streaming
 */
export const useStreamingOptimization = () => {
  const streamBufferRef = useRef('');
  const lastUpdateRef = useRef(0);
  const updateQueueRef = useRef([]);

  const addToStream = useCallback((chunk, onUpdate, options = {}) => {
    const { 
      batchSize = 10, 
      updateInterval = 50,
      forceUpdate = false 
    } = options;

    updateQueueRef.current.push(chunk);
    
    const now = Date.now();
    const shouldUpdate = 
      forceUpdate ||
      updateQueueRef.current.length >= batchSize ||
      (now - lastUpdateRef.current) >= updateInterval;

    if (shouldUpdate) {
      const combinedChunk = updateQueueRef.current.join('');
      updateQueueRef.current = [];
      streamBufferRef.current += combinedChunk;
      lastUpdateRef.current = now;
      
      onUpdate(streamBufferRef.current);
    }
  }, []);

  const flushStream = useCallback((onUpdate) => {
    if (updateQueueRef.current.length > 0) {
      const combinedChunk = updateQueueRef.current.join('');
      updateQueueRef.current = [];
      streamBufferRef.current += combinedChunk;
      onUpdate(streamBufferRef.current);
    }
  }, []);

  const resetStream = useCallback(() => {
    streamBufferRef.current = '';
    updateQueueRef.current = [];
    lastUpdateRef.current = 0;
  }, []);

  return {
    addToStream,
    flushStream,
    resetStream,
    getCurrentBuffer: () => streamBufferRef.current
  };
};