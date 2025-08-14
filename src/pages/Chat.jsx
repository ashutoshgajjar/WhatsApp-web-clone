import { useState } from 'react';
import ChatUI from '../components/ChatUI';
import List from '../components/List';
import Tab from '../components/Tab';
import Channel from '../components/Channels';
import Status from '../components/Status';
import Communities from '../components/Communities';
import Profile from '../components/Profile';
import SettingsPage from '../components/SettingsPage';

function Chat() {
  const [activeView, setActiveView] = useState('chat');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleConversationUpdate = (updatedConversation) => {
    if (updatedConversation) {
      setSelectedConversation(updatedConversation);
    } else {
      setSelectedConversation(null);
    }
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'chat':
        return (
          <List
            onConversationSelect={handleConversationSelect}
            selectedConversation={selectedConversation}
          />
        );
      case 'status':
        return <Status />;
      case 'channels':
        return <Channel />;
      case 'communities':
        return <Communities />;
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <Profile />;
      default:
        return <List />;
    }
  };

  const renderRightPanel = () => {
    if (activeView === 'chat') {
      return (
        <ChatUI
          selectedConversation={selectedConversation}
          onConversationUpdate={handleConversationUpdate}
        />
      );
    }

    const getViewContent = () => {
      switch (activeView) {
        case 'status':
          return {
            title: 'Status Updates',
            subtitle: 'Share and view status updates from your contacts',
            icon: (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='size-15'
                viewBox='0 0 56 56'
                fill='currentColor'
              >
                <path d='m50.923 21.002l.046.131l.171.566l.143.508l.061.232l.1.42a23.93 23.93 0 0 1-2.653 17.167a23.93 23.93 0 0 1-13.57 10.89l-.404.12l-.496.128l-.717.17a1.89 1.89 0 0 1-2.288-1.558a2.127 2.127 0 0 1 1.606-2.389l.577-.145q.54-.142.929-.273a19.93 19.93 0 0 0 10.899-8.943a19.93 19.93 0 0 0 2.292-13.923l-.069-.313l-.092-.365l-.115-.418l-.138-.47a2.135 2.135 0 0 1 1.26-2.602a1.894 1.894 0 0 1 2.458 1.067M7.385 19.92q.065.02.128.044A2.127 2.127 0 0 1 8.78 22.55q-.27.909-.39 1.513a19.93 19.93 0 0 0 2.295 13.91a19.93 19.93 0 0 0 10.911 8.947l.306.097l.174.05l.39.106l.694.171a2.135 2.135 0 0 1 1.623 2.393a1.894 1.894 0 0 1-2.152 1.594l-.138-.025l-.576-.135l-.51-.13l-.446-.125l-.2-.06A23.93 23.93 0 0 1 7.22 39.972a23.93 23.93 0 0 1-2.647-17.197l.077-.32l.1-.375l.194-.665l.076-.25a1.89 1.89 0 0 1 2.365-1.246M28.051 12c8.837 0 16 7.163 16 16s-7.163 16-16 16s-16-7.163-16-16s7.164-16 16-16m0 4c-6.627 0-12 5.373-12 12s5.373 12 12 12c6.628 0 12-5.373 12-12s-5.372-12-12-12m0-12a23.93 23.93 0 0 1 16.217 6.306l.239.227l.275.274l.31.322l.346.369a1.89 1.89 0 0 1-.205 2.76a2.127 2.127 0 0 1-2.873-.196q-.326-.345-.605-.617l-.35-.334l-.16-.143A19.93 19.93 0 0 0 28.051 8a19.93 19.93 0 0 0-13.204 4.976l-.114.102l-.253.24l-.287.285l-.495.515c-.76.809-2.014.9-2.883.21a1.894 1.894 0 0 1-.305-2.662l.90-.106l.405-.431l.368-.378q.262-.263.484-.465A23.93 23.93 0 0 1 28.05 4' />
              </svg>
            ),
          };
        case 'channels':
          return {
            title: 'Channels',
            subtitle: 'Browse and join channels for group discussions',
            icon: (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='size-15'
              >
                <path d='M16.881 4.345A23.112 23.112 0 0 1 8.25 6H7.5a5.25 5.25 0 0 0-.88 10.427 21.593 21.593 0 0 0 1.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.593.772-2.468a17.116 17.116 0 0 1-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0 0 18 11.25c0-2.414-.393-4.735-1.119-6.905ZM18.26 3.74a23.22 23.22 0 0 1 1.24 7.51 23.22 23.22 0 0 1-1.41 7.992.75.75 0 1 0 1.409.516 24.555 24.555 0 0 0 1.415-6.43 2.992 2.992 0 0 0 .836-2.078c0-.807-.319-1.54-.836-2.078a24.65 24.65 0 0 0-1.415-6.43.75.75 0 1 0-1.409.516c.059.16.116.321.17.483Z' />
              </svg>
            ),
          };
        case 'communities':
          return {
            title: 'Communities',
            subtitle: 'Discover and participate in community groups',
            icon: (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='size-15'
              >
                <path
                  fillRule='evenodd'
                  d='M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z'
                  clipRule='evenodd'
                />
                <path d='M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z' />
              </svg>
            ),
          };
        case 'settings':
          return {
            title: 'Settings',
            subtitle: 'Adjust your preferences and account settings',
            icon: (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='size-15'
              >
                <path
                  fillRule='evenodd'
                  d='M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z'
                  clipRule='evenodd'
                />
              </svg>
            ),
          };
        case 'profile':
          return {
            title: 'Profile',
            subtitle: 'Manage your account settings and preferences',
            icon: (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='size-15'
              >
                <path
                  fillRule='evenodd'
                  d='M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
                  clipRule='evenodd'
                />
              </svg>
            ),
          };
        default:
          return {
            title: 'Welcome',
            subtitle: 'Select an option from the sidebar to get started',
            icon: (
              <svg className='size-15' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
              </svg>
            ),
          };
      }
    };

    const { title, subtitle, icon } = getViewContent();

    return (
      <div className='flex flex-col items-center justify-center h-full p-8 text-center bg-amber-50/25 dark:bg-zinc-900 gap-6'>
        <div className='size-18 bg-black/5 dark:bg-white/10 rounded-full flex items-center justify-center text-black/25 dark:text-white/50'>
          {icon}
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl text-gray-900 dark:text-white'>{title}</h2>
          <p className='text-md text-gray-600 dark:text-gray-300 max-w-md'>
            {subtitle}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className='flex h-screen'>
      <Tab
        activeView={activeView}
        setActiveView={setActiveView}
        showMobileSidebar={showMobileSidebar}
        setShowMobileSidebar={setShowMobileSidebar}
      />

      <div className='hidden md:block'>{renderMainContent()}</div>

      {showMobileSidebar && (
        <>
          <div
            className='fixed inset-0 bg-black/25 z-40 md:hidden'
            onClick={() => setShowMobileSidebar(false)}
          />

          <div className='fixed left-15 top-0 h-full z-100 md:hidden'>
            {renderMainContent()}
          </div>
        </>
      )}

      <div className='flex-1 bg-neutral-50 dark:bg-neutral-900'>
        {renderRightPanel()}
      </div>
    </div>
  );
}

export { Chat };
