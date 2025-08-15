import { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

const WEBSOCKET_URL = import.meta.env.VITE_API_URL;

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const socketRef = useRef(null);
  const eventListenersRef = useRef({});

  useEffect(() => {
    socketRef.current = io(WEBSOCKET_URL, {
      transports: ['websocket', 'polling'],
      timeout: 60000,
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      setIsConnected(true);
      setConnectionError(null);
    });

    socket.on('disconnect', (reason) => {
      setIsConnected(false);
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      setConnectionError(error.message);
      setIsConnected(false);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const joinChat = useCallback(
    (waId) => {
      if (socketRef.current && isConnected) {
        socketRef.current.emit('join_chat', waId);
      }
    },
    [isConnected]
  );

  const addEventListener = useCallback((event, callback) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);

      if (!eventListenersRef.current[event]) {
        eventListenersRef.current[event] = [];
      }
      eventListenersRef.current[event].push(callback);
    }
  }, []);

  const removeEventListener = useCallback((event, callback) => {
    if (socketRef.current) {
      socketRef.current.off(event, callback);

      if (eventListenersRef.current[event]) {
        eventListenersRef.current[event] = eventListenersRef.current[
          event
        ].filter((cb) => cb !== callback);
      }
    }
  }, []);

  const removeAllEventListeners = useCallback((event) => {
    if (socketRef.current) {
      socketRef.current.removeAllListeners(event);
      delete eventListenersRef.current[event];
    }
  }, []);

  return {
    isConnected,
    connectionError,
    joinChat,
    addEventListener,
    removeEventListener,
    removeAllEventListeners,
    socket: socketRef.current,
  };
};
