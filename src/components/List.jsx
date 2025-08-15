import {
  MessageSquarePlus,
  EllipsisVertical,
  Search,
  ChevronDown,
  Star,
  SquareCheck,
  LogOut,
  Loader,
  Pin,
  MoreVertical,
  MessageSquareText,
  MessageSquareDot,
  Delete,
  Phone,
  RefreshCw,
  Trash2,
  PinOff,
  X,
} from 'lucide-react';
import { useRef, useState, useMemo } from 'react';
import { useChat } from '../context/ChatContext';
import Popover from './ui/Popover';

function List() {
  const [isListOpen, setIsListOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [chatMenuOpen, setChatMenuOpen] = useState(null);
  const listButtonRef = useRef(null);
  const chatMenuButtonRefs = useRef(new Map());

  const {
    chats,
    loading,
    error,
    activeChat,
    setActiveChat,
    markChatRead,
    markChatUnread,
    pinChat,
    unpinChat,
    deleteChat,
    isConnected,
    loadChats,
    searchChats,
  } = useChat();

  const getChatMenuButtonRef = (waId) => {
    if (!chatMenuButtonRefs.current.has(waId)) {
      chatMenuButtonRefs.current.set(waId, { current: null });
    }
    return chatMenuButtonRefs.current.get(waId);
  };

  const toggleList = () => {
    setIsListOpen((prev) => !prev);
  };

  const closeList = () => {
    setIsListOpen(false);
  };

  const handleChatMenuOpen = (e, waId) => {
    e.preventDefault();
    e.stopPropagation();

    if (chatMenuOpen === waId) {
      closeChatMenu();
    } else {
      setChatMenuOpen(waId);
    }
  };

  const closeChatMenu = () => {
    setChatMenuOpen(null);
  };

  const handleChatClick = (chat) => {
    setActiveChat(chat);

    if (!chat.isRead) {
      markChatRead(chat.waId);
    }
    closeChatMenu();
  };

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    if (searchTerm.trim()) {
      searchChats(searchTerm);
    } else {
      loadChats();
    }
  };

  const filteredChats = useMemo(() => {
    let filtered = chats;

    switch (activeTab) {
      case 'Unread':
        filtered = chats.filter((chat) => !chat.isRead && chat.unreadCount > 0);
        break;
      case 'Groups':
        filtered = chats.filter(
          (chat) =>
            chat.isGroup ||
            (chat.contactName &&
              chat.contactName.toLowerCase().includes('group'))
        );
        break;
      case 'All':
      default:
        filtered = chats;
        break;
    }

    return filtered;
  }, [chats, activeTab]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';

    const date = new Date(timestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    if (messageDate.getTime() === today.getTime()) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    } else if (
      messageDate.getTime() ===
      today.getTime() - 24 * 60 * 60 * 1000
    ) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const getDisplayInfo = (chat) => {
    const formattedNumber =
      chat.formattedNumber || formatWhatsAppNumber(chat.waId);

    return {
      primaryName: chat.contactName || formattedNumber,
      secondaryInfo: chat.contactName ? formattedNumber : null,
      waId: chat.waId,
      identifier: chat.chatIdentifier || chat.waId,
    };
  };

  const formatWhatsAppNumber = (waId) => {
    if (!waId || waId.length < 10) return waId;

    const countryCode = waId.slice(0, -10);
    const number = waId.slice(-10);

    return `+${countryCode} ${number.slice(0, 3)} ${number.slice(
      3,
      6
    )} ${number.slice(6)}`;
  };

  const getAvatarLetter = (chat) => {
    if (chat.contactName) {
      return chat.contactName.charAt(0).toUpperCase();
    }

    return chat.waId.slice(-2);
  };

  const handleRefresh = () => {
    if (searchQuery.trim()) {
      searchChats(searchQuery);
    } else {
      loadChats();
    }
  };

  const handleMarkRead = (event, chat) => {
    event.stopPropagation();
    if (chat.isRead) {
      markChatUnread(chat.waId);
    } else {
      markChatRead(chat.waId);
    }
    closeChatMenu();
  };

  const handlePinToggle = (event, chat) => {
    event.stopPropagation();
    if (chat.isPinned) {
      unpinChat(chat.waId);
    } else {
      pinChat(chat.waId);
    }
    closeChatMenu();
  };

  const handleDeleteChat = (event, chat) => {
    event.stopPropagation();
    if (window.confirm(`Delete chat with ${chat.contactName || chat.waId}?`)) {
      deleteChat(chat.waId);
    }
    closeChatMenu();
  };

  return (
    <>
      <section className='w-64 sm:w-80 md:w-88 lg:w-100 flex-1 py-2 bg-white dark:bg-zinc-900 dark:text-white border-x border-black/10 dark:border-white/10'>
        <header className='flex items-center justify-between p-1 px-3'>
          <h1
            className='text-emerald-600/80 dark:text-white text-xl font-sans font-bold'
            aria-labelledby='Header'
          >
            WhatsApp
          </h1>
          <div className='inline-flex gap-2'>
            <button
              onClick={handleRefresh}
              className='inline-flex p-2 transition-colors duration-150 rounded-full hover:bg-stone-100 dark:hover:bg-zinc-800'
              title='Refresh chats'
              disabled={loading}
            >
              <MessageSquarePlus className='size-4 sm:size-5' />
            </button>
            <div className='relative'>
              <button
                ref={listButtonRef}
                onClick={toggleList}
                className={`inline-flex p-2 transition-colors duration-150 rounded-full ${
                  isListOpen
                    ? 'bg-stone-100 dark:bg-zinc-700'
                    : 'hover:bg-stone-100 dark:hover:bg-zinc-800'
                }`}
                title='List Options'
              >
                <EllipsisVertical className='size-4 sm:size-5'/>
              </button>
              <Popover
                isOpen={isListOpen}
                onClose={closeList}
                anchorRef={listButtonRef}
                className='dark:bg-zinc-900 shadow-lg rounded-lg p-2 w-40 sm:w-64'
              >
                <div className='space-y-1 text-neutral-700 dark:text-neutral-300'>
                  <button className='flex items-center gap-3 w-full rounded-md px-3 py-2 text-left transition-all duration-50 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-zinc-100 dark:hover:bg-zinc-700'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      className='size-4 sm:size-5'
                    >
                      <path
                        fill='currentColor'
                        d='M13 11a3 3 0 1 0-3-3a3 3 0 0 0 3 3m0-4a1 1 0 1 1-1 1a1 1 0 0 1 1-1m4.11 3.86a5 5 0 0 0 0-5.72A2.9 2.9 0 0 1 18 5a3 3 0 0 1 0 6a2.9 2.9 0 0 1-.89-.14M13 13c-6 0-6 4-6 4v2h12v-2s0-4-6-4m-4 4c0-.29.32-2 4-2c3.5 0 3.94 1.56 4 2m7 0v2h-3v-2a5.6 5.6 0 0 0-1.8-3.94C24 13.55 24 17 24 17M8 12H5v3H3v-3H0v-2h3V7h2v3h3Z'
                      />
                    </svg>
                    <span className='text-xs sm:text-sm font-medium'>New Group</span>
                  </button>

                  <button className='flex items-center gap-3 w-full rounded-md px-3 py-2 text-left transition-all duration-50 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-zinc-100 dark:hover:bg-zinc-700'>
                    <Star className='size-4 sm:size-5' />
                    <span className='text-xs sm:text-sm font-medium'>
                      Starred Messages
                    </span>
                  </button>

                  <button className='flex items-center gap-3 w-full rounded-md px-3 py-2 text-left transition-all duration-50 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-zinc-100 dark:hover:bg-zinc-700'>
                    <SquareCheck className='size-4 sm:size-5' />
                    <span className='text-xs sm:text-sm font-medium'>Select Chats</span>
                  </button>

                  <div className='border-t border-neutral-200 dark:border-neutral-600 my-1.5'></div>

                  <button className='flex items-center gap-3 w-full rounded-md p-3 text-left transition-all duration-50 text-red-700 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/25'>
                    <LogOut className='size-4' />
                    <span className='text-xs sm:text-sm font-medium'>Log Out</span>
                  </button>
                </div>
              </Popover>
            </div>
          </div>
        </header>

        <div className='py-2 px-3'>
          <div className='group flex items-center px-2 py-1.5 gap-2.5 rounded-full border border-transparent hover:border-black/15 dark:hover:border-white/15 bg-stone-100 dark:bg-zinc-700'>
            <Search className='size-4.5 text-zinc-500 dark:text-zinc-400' />
            <input
              type='text'
              placeholder='Search or start new chat...'
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className='focus:outline-none placeholder:text-zinc-500 dark:placeholder:text-zinc-400 text-sm bg-transparent w-full'
            />
            {searchQuery && (
              <button
                className='cursor-pointer'
                onClick={() => {
                  setSearchQuery('');
                  loadChats();
                }}
                title='Clear search results'
              >
                <X className='size-4' />
              </button>
            )}
          </div>
        </div>

        <div id='tab' className='flex gap-2 p-1.5 px-3'>
          {['All', 'Unread', 'Groups'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm px-2.5 py-1 rounded-full border ${
                activeTab === tab
                  ? 'bg-green-200 dark:bg-green-900/69 text-green-700 dark:text-green-300 border-green-600'
                  : 'text-zinc-500 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/75 border-black/15 hover:border-black/25 dark:border-zinc-700 dark:hover:border-zinc-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className='space-y-2 px-3 h-[calc(100vh-9.5rem)] overflow-y-auto'>
          {loading && chats.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-32 text-zinc-500 dark:text-zinc-400'>
              <Loader className='size-6 animate-spin mb-2' />
              <p>Loading chats...</p>
            </div>
          ) : error ? (
            <div className='flex flex-col items-center justify-center h-64 text-red-500'>
              <p>Error loading chats</p>
              <p className='text-sm'>{error}</p>
              <button
                onClick={handleRefresh}
                className='mt-2 text-sm p-1 px-2 rounded-full text-black dark:bg-green-500 dark:hover:bg-green-600 '
              >
                Refresh
              </button>
            </div>
          ) : filteredChats.length > 0 ? (
            filteredChats.map((chat) => {
              const displayInfo = getDisplayInfo(chat);
              const chatMenuButtonRef = getChatMenuButtonRef(chat.waId);
              return (
                <div
                  key={chat.waId}
                  onClick={() => handleChatClick(chat)}
                  onContextMenu={(e) => handleChatMenuOpen(e, chat.waId)}
                  className={`grid grid-cols-[40px_1fr_auto] select-none items-center relative gap-2 py-3 px-2 pr-0 rounded-lg group transition-colors ${
                    chatMenuOpen === chat.waId
                      ? 'bg-zinc-200 dark:bg-zinc-800'
                      : activeChat?.waId === chat.waId
                      ? 'bg-emerald-100 dark:bg-emerald-900/30'
                      : 'hover:bg-stone-100 dark:hover:bg-zinc-800/75 cursor-pointer'
                  }`}
                >
                  <div className='relative' title='Users Avatar'>
                    <div className='size-9 sm:size-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-semibold text-xs'>
                      {getAvatarLetter(chat)}
                    </div>
                    {chat.isPinned && (
                      <span className='absolute -top-1.5 sm:-top-2 -left-1.5 sm:-left-2 p-1 bg-white dark:bg-zinc-800 shadow rounded-full'>
                        <Pin className='size-3 sm:size-3.5 -rotate-45' />
                      </span>
                    )}
                  </div>

                  <div className='min-w-0 flex flex-col sm:px-1'>
                    <div className='flex justify-between items-center gap-2'>
                      <p
                        className={`text-sm sm:text-base dark:text-zinc-300 text-zinc-600 font-semibold truncate ${
                          !chat.isRead ? 'font-bold' : ''
                        }`}
                      >
                        {displayInfo.primaryName}
                      </p>
                      <span className='text-[0.7em] sm:text-xs text-zinc-500 dark:text-zinc-400 flex-shrink-0'>
                        {formatTimestamp(chat.lastMessage?.timestamp)}
                      </span>
                    </div>
                    <div className='min-h-[20px] flex items-center gap-1.5 p-0.5 transition-all duration-250'>
                      <p
                        className={`flex-1 text-xs md:text-sm text-zinc-500 dark:text-zinc-400 truncate ${
                          !chat.isRead ? 'font-semibold' : ''
                        } ${
                          chatMenuOpen === chat.waId
                            ? !chat.isRead
                              ? 'pr-4 md:pr-8'
                              : 'pr-6 md:pr-6'
                            : !chat.isRead
                            ? 'pr-12 md:pr-6 md:group-hover:pr-10 lg:group-hover:pr-12'
                            : 'group-hover:pr-4 pr-6 sm:pr-0'
                        }`}
                      >
                        {chat.lastMessage?.content || 'No messages yet'}
                      </p>
                      <div className='absolute right-2 md:right-4 bottom-3 flex items-center gap-2 ml-auto'>
                        {chat.unreadCount > 0 && (
                          <span
                            className={`shadow md:translate-x-8 group-hover:translate-x-3 transition-all duration-150 bg-emerald-500 text-white text-xs rounded-full p-1 size-4.5 flex items-center justify-center flex-shrink-0 ${
                              chatMenuOpen === chat.waId
                                ? 'opacity-0'
                                : 'opacity-100'
                            }`}
                          >
                            {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                          </span>
                        )}

                        <button
                          ref={chatMenuButtonRef}
                          onClick={(e) => handleChatMenuOpen(e, chat.waId)}
                          className={`md:invisible md:group-hover:visible  p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-150 ${
                            chatMenuOpen === chat.waId
                              ? 'opacity-100 md:translate-x-2 md:visible bg-zinc-200 dark:bg-zinc-600'
                              : 'group-hover:translate-x-2 md:translate-x-6'
                          }`}
                          title='Chat options'
                        >
                          <ChevronDown className='size-4' />
                        </button>

                        <Popover
                          isOpen={chatMenuOpen === chat.waId}
                          onClose={closeChatMenu}
                          anchorRef={chatMenuButtonRef}
                          className='-translate-x-2 md:translate-x-0 dark:bg-zinc-800 shadow-lg rounded-lg p-1 w-fit border border-zinc-200 dark:border-zinc-700'
                        >
                          <div className='space-y-1'>
                            <button
                              onClick={(e) => handleMarkRead(e, chat)}
                              className='flex items-center gap-2 w-full px-3 py-2 text-[0.7em] sm:text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded'
                            >
                              {chat.isRead ? (
                                <MessageSquareDot className='size-4' />
                              ) : (
                                <MessageSquareText className='size-4' />
                              )}
                              Mark as {chat.isRead ? 'unread' : 'read'}
                            </button>
                            <button
                              onClick={(e) => handlePinToggle(e, chat)}
                              className='flex items-center gap-2 w-full px-3 py-2 text-[0.7em] sm:text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded'
                            >
                              {chat.isPinned ? (
                                <PinOff className='size-4' />
                              ) : (
                                <Pin className='size-4' />
                              )}
                              {chat.isPinned ? 'Unpin' : 'Pin'} chat
                            </button>
                            <div className='h-px w-full border dark:border-white/15 my-1.5'></div>
                            <button
                              onClick={(e) => handleDeleteChat(e, chat)}
                              className='flex items-center gap-2 w-full px-3 py-2 text-[0.7em] sm:text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded'
                            >
                              <Trash2 className='size-4' />
                              Delete chat
                            </button>
                          </div>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className='flex flex-col items-center justify-center h-64 text-zinc-500 dark:text-zinc-400'>
              <div className='text-center'>
                {/* <p className='mb-2'>No {activeTab.toLowerCase()} chats found</p> */}
                {searchQuery && (
                  <div className='space-y-2 px-2'>
                    <p className='text-sm'>
                      No results for found "{searchQuery}" in chats, contacts or messages
                    </p>
                    {/* <button className='text-sm text-blue-500 hover:underline'>
                      Clear search
                    </button> */}
                  </div>
                )}
                {!searchQuery && chats.length === 0 && (
                  <div className='space-y-2'>
                    <p className='text-sm'>No chats available</p>
                    <button
                      onClick={handleRefresh}
                      className='text-sm text-blue-500 hover:underline'
                    >
                      Refresh to load chats
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default List;
