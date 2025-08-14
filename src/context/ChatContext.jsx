import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { chatApi } from '../../api/chatApi';

const initialState = {
  chats: [],
  messages: {},
  activeChat: null,
  loading: false,
  sendingMessage: false,
  error: null,
  page: 1,
  hasMore: true,
};

const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CHATS: 'SET_CHATS',
  ADD_CHAT: 'ADD_CHAT',
  UPDATE_CHAT: 'UPDATE_CHAT',
  UPDATE_CHAT_STATUS: 'UPDATE_CHAT_STATUS',
  DELETE_CHAT: 'DELETE_CHAT',
  SET_ACTIVE_CHAT: 'SET_ACTIVE_CHAT',
  SET_ACTIVE_CHAT_AND_CLEAR: 'SET_ACTIVE_CHAT_AND_CLEAR',
  SET_MESSAGES: 'SET_MESSAGES',
  ADD_MESSAGE: 'ADD_MESSAGE',
  ADD_MESSAGE_OPTIMISTIC: 'ADD_MESSAGE_OPTIMISTIC',
  UPDATE_MESSAGE_STATUS: 'UPDATE_MESSAGE_STATUS',
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
  CLEAR_CHAT_MESSAGES: 'CLEAR_CHAT_MESSAGES',
  SEND_MESSAGE_START: 'SEND_MESSAGE_START',
  SEND_MESSAGE_SUCCESS: 'SEND_MESSAGE_SUCCESS',
  SEND_MESSAGE_ERROR: 'SEND_MESSAGE_ERROR',
};

const chatReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };

    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case ActionTypes.SET_CHATS:
      return {
        ...state,
        chats: action.payload,
        loading: false,
        error: null,
      };

    case ActionTypes.ADD_CHAT:
      return {
        ...state,
        chats: [
          action.payload,
          ...state.chats.filter((chat) => chat.waId !== action.payload.waId),
        ],
      };

    case ActionTypes.UPDATE_CHAT:
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.waId === action.payload.waId
            ? { ...chat, ...action.payload }
            : chat
        ),
      };

    case ActionTypes.UPDATE_CHAT_STATUS:
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.waId === action.payload.waId
            ? { ...chat, ...action.payload.updates }
            : chat
        ),
      };

    case ActionTypes.DELETE_CHAT:
      return {
        ...state,
        chats: state.chats.filter((chat) => chat.waId !== action.payload),
      };

    case ActionTypes.SET_ACTIVE_CHAT:
      return { ...state, activeChat: action.payload };

    case ActionTypes.SET_ACTIVE_CHAT_AND_CLEAR:
      return {
        ...state,
        activeChat: action.payload,

        messages: action.payload ? { [action.payload.waId]: [] } : {},
      };

    case ActionTypes.SET_MESSAGES:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.waId]: action.payload.messages,
        },
      };

    case ActionTypes.ADD_MESSAGE:
      const { waId, message } = action.payload;
      return {
        ...state,
        messages: {
          ...state.messages,
          [waId]: [...(state.messages[waId] || []), message],
        },
      };

    case ActionTypes.ADD_MESSAGE_OPTIMISTIC:
      const { waId: optWaId, message: optMessage } = action.payload;
      return {
        ...state,
        messages: {
          ...state.messages,
          [optWaId]: [...(state.messages[optWaId] || []), optMessage],
        },
      };

    case ActionTypes.UPDATE_MESSAGE_STATUS:
      const { messageId, status, newMessageId, newMessage } = action.payload;
      const updatedMessages = { ...state.messages };

      Object.keys(updatedMessages).forEach((chatId) => {
        updatedMessages[chatId] = updatedMessages[chatId].map((msg) =>
          msg.messageId === messageId
            ? {
                ...msg,
                status,
                messageId: newMessageId || msg.messageId,

                ...(newMessage && newMessage),
              }
            : msg
        );
      });
      return { ...state, messages: updatedMessages };

    case ActionTypes.CLEAR_MESSAGES:
      return { ...state, messages: {} };

    case ActionTypes.CLEAR_CHAT_MESSAGES:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.waId]: [],
        },
      };

    case ActionTypes.SEND_MESSAGE_START:
      return { ...state, sendingMessage: true };

    case ActionTypes.SEND_MESSAGE_SUCCESS:
      return { ...state, sendingMessage: false };

    case ActionTypes.SEND_MESSAGE_ERROR:
      return {
        ...state,
        sendingMessage: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { isConnected, joinChat, addEventListener, removeEventListener } =
    useWebSocket();

  const loadChats = async (page = 1, waIdFilter = null, searchTerm = null) => {
    try {
      console.log('Loading chats with filters:', {
        page,
        waIdFilter,
        searchTerm,
      });
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });

      const response = await chatApi.getChats(page, 20, waIdFilter, searchTerm);
      console.log('Received chat response:', response);

      const chats = response.chats || [];

      const validChats = chats.filter((chat) => {
        const isValid = chat.waId && typeof chat.waId === 'string';
        if (!isValid) {
          console.warn('Invalid chat record:', chat);
        }
        return isValid;
      });

      console.log(`Loaded ${validChats.length} valid chats`);

      validChats.forEach((chat) => {
        console.log(
          `- Chat wa_id: ${chat.waId}, contact: ${
            chat.contactName || 'No name'
          }`
        );
      });

      dispatch({ type: ActionTypes.SET_CHATS, payload: validChats });

      if (validChats.length === 0) {
        console.warn(
          'No valid chats found. Check backend data and wa_id format.'
        );
      }
    } catch (error) {
      console.error('Error loading chats:', error);
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  const loadMessages = async (waId, page = 1) => {
    try {
      console.log(`Loading messages for wa_id: ${waId}, page: ${page}`);

      if (page === 1) {
        dispatch({
          type: ActionTypes.CLEAR_CHAT_MESSAGES,
          payload: { waId },
        });
      }

      const messages = await chatApi.getMessages(waId, page);

      const validMessages = messages.filter((message) => message.waId === waId);

      console.log(`Loaded ${validMessages.length} messages for wa_id: ${waId}`);

      dispatch({
        type: ActionTypes.SET_MESSAGES,
        payload: { waId, messages: validMessages },
      });

      if (isConnected) {
        joinChat(waId);
      }
    } catch (error) {
      console.error(`Error loading messages for wa_id ${waId}:`, error);
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  const sendMessage = async (waId, messageContent) => {
    if (!messageContent.trim() || !waId) {
      throw new Error('Message content and waId are required');
    }

    const tempMessageId = `temp_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const optimisticMessage = {
      messageId: tempMessageId,
      waId: waId,
      content: { body: messageContent.trim() },
      timestamp: new Date().toISOString(),
      direction: 'outbound',
      status: 'sending',
      messageType: 'text',
    };

    try {
      console.log(`Sending message to wa_id: ${waId}`, optimisticMessage);

      dispatch({ type: ActionTypes.SEND_MESSAGE_START });

      dispatch({
        type: ActionTypes.ADD_MESSAGE_OPTIMISTIC,
        payload: { waId, message: optimisticMessage },
      });

      const response = await chatApi.sendMessage(waId, messageContent);
      console.log('✓ Message sent successfully:', response);

      dispatch({
        type: ActionTypes.UPDATE_MESSAGE_STATUS,
        payload: {
          messageId: tempMessageId,
          status: response.status || 'sent',
          newMessageId: response.messageId,
          newMessage: response,
        },
      });

      dispatch({
        type: ActionTypes.UPDATE_CHAT,
        payload: {
          waId,
          lastMessage: {
            content: messageContent.trim(),
            timestamp: response.timestamp || new Date().toISOString(),
            messageId: response.messageId,
          },
          updatedAt: new Date().toISOString(),
        },
      });

      dispatch({ type: ActionTypes.SEND_MESSAGE_SUCCESS });
      return response;
    } catch (error) {
      console.error(`Failed to send message to wa_id ${waId}:`, error);

      dispatch({
        type: ActionTypes.UPDATE_MESSAGE_STATUS,
        payload: {
          messageId: tempMessageId,
          status: 'failed',
        },
      });

      dispatch({
        type: ActionTypes.SEND_MESSAGE_ERROR,
        payload: error.message,
      });

      throw error;
    }
  };

  const searchChats = async (searchTerm) => {
    try {
      console.log(`Searching chats with term: ${searchTerm}`);
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });

      const response = await chatApi.searchChats(searchTerm);
      const chats = response.chats || [];

      dispatch({ type: ActionTypes.SET_CHATS, payload: chats });
    } catch (error) {
      console.error('Error searching chats:', error);
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  const setActiveChat = (chat) => {
    console.log(`Switching to chat for wa_id: ${chat?.waId}`);

    if (state.activeChat && chat && state.activeChat.waId !== chat.waId) {
      console.log(
        `Clearing messages for previous chat: ${state.activeChat.waId}`
      );
    }

    dispatch({ type: ActionTypes.SET_ACTIVE_CHAT_AND_CLEAR, payload: chat });

    if (chat && chat.waId) {
      loadMessages(chat.waId);
    }
  };

  const markChatRead = async (waId) => {
    try {
      console.log(`Marking chat as read for wa_id: ${waId}`);

      dispatch({
        type: ActionTypes.UPDATE_CHAT_STATUS,
        payload: {
          waId,
          updates: {
            isRead: true,
            unreadCount: 0,
          },
        },
      });

      await chatApi.markChatRead(waId);
      console.log(`✓ Successfully marked chat as read for wa_id: ${waId}`);
    } catch (error) {
      console.error(`Failed to mark chat as read for wa_id ${waId}:`, error);

      dispatch({
        type: ActionTypes.UPDATE_CHAT_STATUS,
        payload: {
          waId,
          updates: {
            isRead: false,
            unreadCount: 1,
          },
        },
      });

      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: `Failed to mark chat as read: ${error.message}`,
      });
    }
  };

  const markChatUnread = async (waId) => {
    try {
      console.log(`Marking chat as unread for wa_id: ${waId}`);

      dispatch({
        type: ActionTypes.UPDATE_CHAT_STATUS,
        payload: {
          waId,
          updates: {
            isRead: false,
            unreadCount: 1,
          },
        },
      });

      await chatApi.markChatUnread(waId);
      console.log(`✓ Successfully marked chat as unread for wa_id: ${waId}`);
    } catch (error) {
      console.error(`Failed to mark chat as unread for wa_id ${waId}:`, error);

      dispatch({
        type: ActionTypes.UPDATE_CHAT_STATUS,
        payload: {
          waId,
          updates: {
            isRead: true,
            unreadCount: 0,
          },
        },
      });

      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: `Failed to mark chat as unread: ${error.message}`,
      });
    }
  };

  const pinChat = async (waId) => {
    try {
      dispatch({
        type: ActionTypes.UPDATE_CHAT_STATUS,
        payload: {
          waId,
          updates: { isPinned: true },
        },
      });

      await chatApi.pinChat(waId);
      console.log(`Pinned chat for wa_id: ${waId}`);
    } catch (error) {
      console.error(`Failed to pin chat for wa_id ${waId}:`, error);

      dispatch({
        type: ActionTypes.UPDATE_CHAT_STATUS,
        payload: {
          waId,
          updates: { isPinned: false },
        },
      });
    }
  };

  const unpinChat = async (waId) => {
    try {
      dispatch({
        type: ActionTypes.UPDATE_CHAT_STATUS,
        payload: {
          waId,
          updates: { isPinned: false },
        },
      });

      await chatApi.unpinChat(waId);
      console.log(`Unpinned chat for wa_id: ${waId}`);
    } catch (error) {
      console.error(`Failed to unpin chat for wa_id ${waId}:`, error);

      dispatch({
        type: ActionTypes.UPDATE_CHAT_STATUS,
        payload: {
          waId,
          updates: { isPinned: true },
        },
      });
    }
  };

  const deleteChat = async (waId) => {
    try {
      await chatApi.deleteChat(waId);
      dispatch({ type: ActionTypes.DELETE_CHAT, payload: waId });
      console.log(`Deleted chat for wa_id: ${waId}`);
    } catch (error) {
      console.error(`Failed to delete chat for wa_id ${waId}:`, error);
    }
  };

  useEffect(() => {
    if (!isConnected) return;

    const handleNewMessage = (message) => {
      console.log('WebSocket: New message received:', message);

      const isDuplicate = state.messages[message.waId]?.some(
        (m) =>
          m.messageId === message.messageId ||
          (m.content?.body === message.content?.body &&
            Math.abs(new Date(m.timestamp) - new Date(message.timestamp)) <
              5000)
      );

      if (!isDuplicate) {
        dispatch({
          type: ActionTypes.ADD_MESSAGE,
          payload: { waId: message.waId, message },
        });
      }
    };

    const handleMessageStatusUpdate = ({ messageId, status }) => {
      console.log('WebSocket: Message status updated:', messageId, status);
      dispatch({
        type: ActionTypes.UPDATE_MESSAGE_STATUS,
        payload: { messageId, status },
      });
    };

    const handleChatUpdated = ({ waId, message }) => {
      console.log('WebSocket: Chat updated:', waId);
      dispatch({
        type: ActionTypes.UPDATE_CHAT,
        payload: {
          waId,
          lastMessage: {
            content: message.content.body,
            timestamp: message.timestamp,
            messageId: message.messageId,
          },
          updatedAt: new Date(),
        },
      });
    };

    const handleChatRead = ({ waId }) => {
      console.log('WebSocket: Chat marked as read:', waId);
      dispatch({
        type: ActionTypes.UPDATE_CHAT_STATUS,
        payload: {
          waId,
          updates: {
            isRead: true,
            unreadCount: 0,
          },
        },
      });
    };

    const handleChatUnread = ({ waId }) => {
      console.log('WebSocket: Chat marked as unread:', waId);
      dispatch({
        type: ActionTypes.UPDATE_CHAT_STATUS,
        payload: {
          waId,
          updates: {
            isRead: false,
            unreadCount: 1,
          },
        },
      });
    };

    const handleChatPinned = ({ waId }) => {
      dispatch({
        type: ActionTypes.UPDATE_CHAT_STATUS,
        payload: { waId, updates: { isPinned: true } },
      });
    };

    const handleChatUnpinned = ({ waId }) => {
      dispatch({
        type: ActionTypes.UPDATE_CHAT_STATUS,
        payload: { waId, updates: { isPinned: false } },
      });
    };

    const handleChatDeleted = ({ waId }) => {
      dispatch({ type: ActionTypes.DELETE_CHAT, payload: waId });
    };

    addEventListener('new_message', handleNewMessage);
    addEventListener('message_status_updated', handleMessageStatusUpdate);
    addEventListener('chat_updated', handleChatUpdated);
    addEventListener('chat_read', handleChatRead);
    addEventListener('chat_unread', handleChatUnread);
    addEventListener('chat_pinned', handleChatPinned);
    addEventListener('chat_unpinned', handleChatUnpinned);
    addEventListener('chat_deleted', handleChatDeleted);

    return () => {
      removeEventListener('new_message', handleNewMessage);
      removeEventListener('message_status_updated', handleMessageStatusUpdate);
      removeEventListener('chat_updated', handleChatUpdated);
      removeEventListener('chat_read', handleChatRead);
      removeEventListener('chat_unread', handleChatUnread);
      removeEventListener('chat_pinned', handleChatPinned);
      removeEventListener('chat_unpinned', handleChatUnpinned);
      removeEventListener('chat_deleted', handleChatDeleted);
    };
  }, [isConnected, addEventListener, removeEventListener, state.messages]);

  useEffect(() => {
    loadChats();
  }, []);

  const value = {
    ...state,
    isConnected,
    loadChats,
    loadMessages,
    sendMessage,
    searchChats,
    setActiveChat,
    markChatRead,
    markChatUnread,
    pinChat,
    unpinChat,
    deleteChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
