import apiClient from './client';

const BUSINESS_PHONE_ID = import.meta.env.REACT_APP_BUSINESS_PHONE_ID;

export const chatApi = {
  sendMessage: async (waId, messageContent, messageType = 'text') => {
    try {
      console.log(`Sending message to wa_id: ${waId}`);

      const messageData = {
        waId: waId,
        content: {
          body: messageContent,
        },
        messageType: messageType,
        direction: 'outbound',
        timestamp: new Date().toISOString(),
      };

      const response = await apiClient.post(
        `/api/chats/${waId}/send`,
        messageData
      );
      return response.data;
    } catch (error) {
      console.error(`Error sending message to wa_id ${waId}:`, error);
      throw new Error(`Failed to send message: ${error.message}`);
    }
  },

  getChats: async (
    page = 1,
    limit = 20,
    waIdFilter = null,
    searchTerm = null
  ) => {
    try {
      const params = {
        businessPhoneId: BUSINESS_PHONE_ID,
        page,
        limit,
      };

      if (waIdFilter) {
        params.waId = waIdFilter;
      }

      if (searchTerm) {
        params.search = searchTerm;
      }

      console.log('Fetching chats with params:', params);

      const response = await apiClient.get('/api/chats', { params });

      if (response.data.chats) {
        return {
          chats: response.data.chats,
          total: response.data.total,
          page: response.data.page,
          limit: response.data.limit,
          filters: response.data.filters,
        };
      }

      return {
        chats: Array.isArray(response.data) ? response.data : [],
        total: Array.isArray(response.data) ? response.data.length : 0,
        page: 1,
        limit: 20,
        filters: {},
      };
    } catch (error) {
      console.error('Error fetching chats:', error);
      throw new Error(`Failed to fetch chats: ${error.message}`);
    }
  },

  getMessages: async (waId, page = 1, limit = 50) => {
    try {
      console.log(`Fetching messages for wa_id: ${waId}`);

      const response = await apiClient.get(`/api/chats/${waId}/messages`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching messages for wa_id ${waId}:`, error);
      throw new Error(`Failed to fetch messages: ${error.message}`);
    }
  },

  getChatByWaId: async (waId, businessPhoneId = BUSINESS_PHONE_ID) => {
    try {
      console.log(`Fetching chat details for wa_id: ${waId}`);

      const response = await apiClient.get(`/api/chats/${waId}`, {
        params: businessPhoneId ? { businessPhoneId } : {},
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        console.log(`Chat not found for wa_id: ${waId}`);
        return null;
      }
      console.error(`Error fetching chat for wa_id ${waId}:`, error);
      throw new Error(`Failed to fetch chat: ${error.message}`);
    }
  },

  searchChats: async (searchTerm, page = 1, limit = 20) => {
    try {
      return await chatApi.getChats(page, limit, null, searchTerm);
    } catch (error) {
      throw new Error(`Failed to search chats: ${error.message}`);
    }
  },

  markChatRead: async (waId) => {
    try {
      console.log(`Marking chat as read for wa_id: ${waId}`);
      const response = await apiClient.put(`/api/chats/${waId}/read`);
      return response.data;
    } catch (error) {
      console.error(`Error marking chat read for wa_id ${waId}:`, error);
      throw new Error(`Failed to mark chat as read: ${error.message}`);
    }
  },

  markChatUnread: async (waId) => {
    try {
      console.log(`Marking chat as unread for wa_id: ${waId}`);
      const response = await apiClient.put(`/api/chats/${waId}/unread`);
      return response.data;
    } catch (error) {
      console.error(`Error marking chat unread for wa_id ${waId}:`, error);
      throw new Error(`Failed to mark chat as unread: ${error.message}`);
    }
  },

  pinChat: async (waId) => {
    try {
      console.log(`Pinning chat for wa_id: ${waId}`);
      const response = await apiClient.put(`/api/chats/${waId}/pin`);
      return response.data;
    } catch (error) {
      console.error(`Error pinning chat for wa_id ${waId}:`, error);
      throw new Error(`Failed to pin chat: ${error.message}`);
    }
  },

  unpinChat: async (waId) => {
    try {
      console.log(`Unpinning chat for wa_id: ${waId}`);
      const response = await apiClient.put(`/api/chats/${waId}/unpin`);
      return response.data;
    } catch (error) {
      console.error(`Error unpinning chat for wa_id ${waId}:`, error);
      throw new Error(`Failed to unpin chat: ${error.message}`);
    }
  },

  deleteChat: async (waId) => {
    try {
      console.log(`Deleting chat for wa_id: ${waId}`);
      const response = await apiClient.delete(`/api/chats/${waId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting chat for wa_id ${waId}:`, error);
      throw new Error(`Failed to delete chat: ${error.message}`);
    }
  },

  restoreChat: async (waId) => {
    try {
      console.log(`Restoring chat for wa_id: ${waId}`);
      const response = await apiClient.put(`/api/chats/${waId}/restore`);
      return response.data;
    } catch (error) {
      console.error(`Error restoring chat for wa_id ${waId}:`, error);
      throw new Error(`Failed to restore chat: ${error.message}`);
    }
  },
};
