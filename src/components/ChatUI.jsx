import React, { useState, useEffect, useRef } from 'react';
import {
  UserRound,
  EllipsisVertical,
  Video,
  Search,
  Send,
  Plus,
  Check,
  ChevronDown,
  BellOff,
  SquareCheck,
  CircleAlert,
  ClockFading,
  CircleX,
  ThumbsDown,
  CircleMinus,
  Trash2,
  Ban,
  Clock,
  Phone,
  CheckCheck,
  X,
  Users,
} from 'lucide-react';
import { RiSendPlane2Line } from 'react-icons/ri';
import { LuSticker } from 'react-icons/lu';
import { useChat } from '../context/ChatContext';
import { chatApi } from '../../api/chatApi';
import Popover from './ui/Popover';

function ChatUI() {
  const [isListOpen, setIsListOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const listButtonRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const { activeChat, messages, loadMessages, isConnected, setActiveChat } =
    useChat();

  const currentMessages = activeChat ? messages[activeChat.waId] || [] : [];

  const toggleList = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsListOpen((prev) => !prev);
  };

  const closeList = () => {
    setIsListOpen(false);
  };

  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setCurrentTime(time);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  // useEffect(() => {
  //   if (activeChat && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [activeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatMessageTime = (timestamp) => {
    if (!timestamp) return currentTime;

    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <Check className='size-4' />;
      case 'delivered':
        return <CheckCheck className='size-4' />;
      case 'read':
        return <CheckCheck className='size-4 text-blue-500' />;
      default:
        return <Clock className='size-4 text-gray-400' />;
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!messageInput.trim() || !activeChat || isSending) {
      return;
    }

    const messageText = messageInput.trim();
    setMessageInput('');
    setIsSending(true);

    try {
      const optimisticMessage = {
        messageId: `temp_${Date.now()}`,
        waId: activeChat.waId,
        content: {
          body: messageText,
        },
        timestamp: new Date().toISOString(),
        direction: 'outbound',
        status: 'sending',
        messageType: 'text',
      };

      const response = await chatApi.sendMessage(activeChat.waId, messageText);
    } catch (error) {
      console.error('Failed to send message:', error);

      setMessageInput(messageText);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const getDisplayName = () => {
    if (!activeChat) return 'Select a chat';
    return activeChat.contactName || activeChat.waId || 'Unknown Contact';
  };

  const formatPhoneNumber = (waId) => {
    if (!waId || waId.length < 10) return waId;

    const countryCode = waId.slice(0, -10);
    const number = waId.slice(-10);

    return `+${countryCode} ${number.slice(0, 3)} ${number.slice(
      3,
      6
    )} ${number.slice(6)}`;
  };

  const handleCloseChat = () => {
    setActiveChat(null);
    setMessageInput('');
  };

  if (!activeChat) {
    return (
      <section className='flex-1 dark:bg-zinc-900 dark:text-white flex items-center justify-center h-full'>
        <div className='space-y-2 px-[3px] text-center text-gray-600 dark:text-gray-300'>
          <Users className='size-10 md:size-16 mx-auto opacity-50' />
          <h3 className='text-lg md:text-2xl font-medium '>
            Select a chat to start messaging
          </h3>
          <p className='text-sm md:text-base'>
            Choose a conversation to view messages
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className='flex-1 dark:bg-zinc-900 dark:text-white flex flex-col'>
        <header className='flex items-center justify-between p-1.5 md:p-2 border-b border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900'>
          <button className='inline-flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700 p-2 rounded-lg transition-colors'>
            <div className='size-7 sm:size-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-semibold text-sm'>
              {activeChat.contactName
                ? activeChat.contactName.charAt(0).toUpperCase()
                : activeChat.waId.slice(-2)}
            </div>
            <div className='text-left space-y-0.5'>
              <h3 className='font-medium text-xs sm:text-sm md:text-base text-gray-900 dark:text-white'>
                {getDisplayName()}
              </h3>
              <div className='flex items-center gap-1 text-[0.6em] md:text-sm text-gray-500 dark:text-gray-400'>
                <Phone className='size-2.5 sm:size-3' />
                <span>{formatPhoneNumber(activeChat.waId)}</span>
                {/* {isConnected && (
                  <span className='ml-2 flex items-center gap-1'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='text-xs'>Online</span>
                  </span>
                )} */}
              </div>
            </div>
          </button>

          <div className='inline-flex items-center gap-2'>
            <button className='inline-flex p-2 rounded-full hover:bg-stone-100 dark:hover:bg-zinc-700'>
              <span className='inline-flex items-center gap-0.5'>
                <Video className='size-4 sm:size-5' />
                <ChevronDown className='size-4 sm:size-5' />
              </span>
            </button>
            <button className='inline-flex p-2 rounded-full hover:bg-stone-100 dark:hover:bg-zinc-700'>
              <Search className='size-4 sm:size-5' />
            </button>
            <div className='relative'>
              <button
                ref={listButtonRef}
                onClick={toggleList}
                className={`inline-flex p-2 rounded-full ${
                  isListOpen
                    ? 'bg-stone-100 dark:bg-zinc-700'
                    : 'hover:bg-stone-100 dark:hover:bg-zinc-700'
                }`}
                title='Chat options'
              >
                <EllipsisVertical className='size-4 sm:size-5' />
              </button>
              <Popover
                isOpen={isListOpen}
                onClose={closeList}
                anchorRef={listButtonRef}
                className='dark:bg-zinc-900 shadow-lg rounded-lg p-2 w-64'
              >
                <div className='space-y-1 text-neutral-700 dark:text-neutral-300'>
                  <button className='flex items-center gap-3 w-full rounded-md px-3 py-2 text-left transition-all duration-50 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-zinc-100 dark:hover:bg-zinc-700'>
                    <CircleAlert className='size-4 sm:size-5' />
                    <span className='text-xs sm:text-sm font-medium'>Contact info</span>
                  </button>
                  <button className='flex items-center gap-3 w-full rounded-md px-3 py-2 text-left transition-all duration-50 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-zinc-100 dark:hover:bg-zinc-700'>
                    <SquareCheck className='size-4 sm:size-5' />
                    <span className='text-xs sm:text-sm font-medium'>Select messages</span>
                  </button>
                  <button className='flex items-center gap-3 w-full rounded-md px-3 py-2 text-left transition-all duration-50 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-zinc-100 dark:hover:bg-zinc-700'>
                    <BellOff className='size-4 sm:size-5' />
                    <span className='text-xs sm:text-sm font-medium'>
                      Mute notifications
                    </span>
                  </button>
                  <button className='flex items-center gap-3 w-full rounded-md px-3 py-2 text-left transition-all duration-50 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-zinc-100 dark:hover:bg-zinc-700'>
                    <ClockFading className='size-4 sm:size-5' />
                    <span className='text-xs sm:text-sm font-medium'>
                      Disappearing messages
                    </span>
                  </button>
                  <button
                    onClick={handleCloseChat}
                    className='flex items-center gap-3 w-full rounded-md px-3 py-2 text-left transition-all duration-50 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                    title='Close chat'
                  >
                    <X className='size-4 sm:size-5' />
                    <span className='text-xs sm:text-sm font-medium'>Close chat</span>
                  </button>
                  <div className='border-t border-neutral-200 dark:border-neutral-600 my-2'></div>
                  <button className='flex items-center gap-3 w-full rounded-md px-3 py-2 text-left transition-all duration-50 hover:text-red-700 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/25'>
                    <Trash2 className='size-4 sm:size-5' />
                    <span className='text-xs sm:text-sm font-medium'>Delete chat</span>
                  </button>
                </div>
              </Popover>
            </div>
          </div>
        </header>

        <main className='flex-1 overflow-hidden'>
          <div
            className='relative z-1 bg-cover bg-center h-full w-full'
            style={{ backgroundImage: "url('/wall.jpg')" }}
          >
            <div className='absolute z-5 inset-0 bg-[#fffaea]/95 dark:bg-black/90'></div>
            <div
              key={activeChat?.waId}
              id='msgContainer'
              className='relative flex flex-col z-10 py-2.5 md:py-4 px-1 md:px-2 space-y-2.5 md:space-y-4 overflow-y-auto h-[calc(100dvh-8rem)] sm:h-[calc(100dvh-9.5rem)]'
              onContextMenu={toggleList}
            >
              {currentMessages.length === 0 ? (
                <div className='flex-1 flex items-center justify-center'>
                  <div className='text-center text-gray-500 dark:text-gray-400'>
                    <p className='text-lg font-medium mb-2'>No messages yet</p>
                    <p className='text-sm'>
                      Start a conversation with {getDisplayName()}
                    </p>
                  </div>
                </div>
              ) : (
                currentMessages.map((message, idx) => {
                  if (message.waId !== activeChat?.waId) {
                    console.warn(
                      'Message waId mismatch:',
                      message.waId,
                      'vs',
                      activeChat?.waId
                    );
                    return null;
                  }
                  const isOutbound = message.direction === 'outbound';
                  const isInbound = message.direction === 'inbound';

                  return (
                    <div
                      key={message.messageId || idx}
                      className={`flex ${
                        isOutbound ? 'justify-end mr-5' : 'justify-start ml-5'
                      }`}
                    >
                      {isOutbound && (
                        <div className='relative rounded-b-lg rounded-tl-lg shadow-md border border-green-300 dark:border-green-950 w-fit p-2 dark:bg-green-900 bg-green-200 max-w-55 md:max-w-xs lg:max-w-lg'>
                          <div className='absolute -right-[15px] -top-[1px] w-0 h-0 border-l-[0px] border-r-[15px] border-t-[18px] border-l-transparent border-r-transparent border-t-green-300 dark:border-t-green-950'></div>
                          <div className='absolute -right-3 top-0 w-0 h-0 border-l-[0px] border-r-[15px] border-t-[18px] border-l-transparent border-r-transparent border-t-green-200 dark:border-t-green-900'></div>

                          <div className='grid gap-2'>
                            <p className='text-sm text-black/85 dark:text-white/80 break-words'>
                              {message.content?.body ||
                                'Message content not available'}
                            </p>
                            <div className='flex select-none justify-end gap-2 text-xs text-black/50 dark:text-white/69'>
                              <div className='time'>
                                {formatMessageTime(message.timestamp)}
                              </div>
                              <div className='status'>
                                {getStatusIcon(message.status)}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {isInbound && (
                        <div className='relative inline-block w-fit p-2 h-auto bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-900 rounded-tr-lg rounded-b-lg max-w-55 md:max-w-xs lg:max-w-lg'>
                          <div className='absolute -left-[15px] -top-[1px] w-0 h-0 border-l-[15px] border-r-[0px] border-t-[18px] border-l-transparent border-r-transparent border-t-zinc-300 dark:border-t-zinc-900'></div>
                          <div className='absolute -left-3 top-0 w-0 h-0 border-l-[15px] border-r-[0px] border-t-[18px] border-l-transparent border-r-transparent border-t-zinc-50 dark:border-t-zinc-800'></div>

                          <div className='grid gap-2'>
                            <p className='text-sm text-black/85 dark:text-white/80 break-words'>
                              {message.content?.body ||
                                'Message content not available'}
                            </p>
                            <div className='flex select-none justify-end text-xs text-black/50 dark:text-white/69 mt-2'>
                              <div className='time'>
                                {formatMessageTime(message.timestamp)}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className='relative z-10 p-2'>
              <form onSubmit={sendMessage} className='flex items-center'>
                <div className='flex items-center bg-white dark:bg-zinc-800/50 bg-transparent backdrop-blur-xl w-full p-1.5 md:p-2 rounded-full border border-black/10 dark:border-white/5'>
                  <button
                    type='button'
                    className='inline-flex p-1 sm:p-2 rounded-full text-black/75 dark:text-white/75 hover:bg-stone-100 dark:hover:bg-neutral-700'
                  >
                    <Plus className='size-4 sm:size-5' />
                  </button>
                  <button
                    type='button'
                    className='inline-flex p-1 sm:p-2 rounded-full text-black/75 dark:text-white/75 hover:bg-stone-100 dark:hover:bg-neutral-700'
                  >
                    <LuSticker className='size-4 sm:size-5' />
                  </button>
                  <input
                    ref={inputRef}
                    type='text'
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Message ${getDisplayName()}...`}
                    disabled={isSending}
                    className='flex-1 p-1.5 focus:outline-none bg-transparent text-gray-900 dark:text-white placeholder:text-sm placeholder-gray-500 dark:placeholder-gray-400'
                  />
                  <button
                    type='submit'
                    disabled={!messageInput.trim() || isSending}
                    className={`p-2.5 rounded-full transition-all duration-300 ${
                      messageInput.trim() && !isSending
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-zinc-300 dark:bg-zinc-600 text-zinc-500 cursor-not-allowed'
                    }`}
                    title='Send message'
                  >
                    {isSending ? (
                      <div className='size-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                    ) : (
                      <RiSendPlane2Line className='size-4 md:size-5 fill-current' />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}

export default ChatUI;
