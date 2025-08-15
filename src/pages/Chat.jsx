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
              <svg className='size-10 sm:size-15' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M13.5628 3.1366C13.6587 2.5927 14.1794 2.22462 14.711 2.37435C15.7905 2.67838 16.8135 3.16253 17.736 3.80854C18.9323 4.64621 19.9305 5.73571 20.6606 7.00047C21.3907 8.26523 21.8349 9.67454 21.962 11.1294C22.0601 12.2513 21.9677 13.3793 21.6911 14.4662C21.5549 15.0014 20.9758 15.2682 20.4568 15.0792C19.9378 14.8903 19.677 14.317 19.7998 13.7785C19.9843 12.9693 20.0422 12.1343 19.9696 11.3035C19.8679 10.1396 19.5126 9.01215 18.9285 8.00035C18.3444 6.98854 17.5458 6.11694 16.5888 5.44681C15.9057 4.96841 15.1536 4.60097 14.3606 4.35607C13.8329 4.19311 13.4669 3.68049 13.5628 3.1366Z'
                  fill='currentColor'
                ></path>
                <path
                  d='M18.8944 17.785C19.3175 18.14 19.3759 18.7749 18.9804 19.1604C18.1774 19.9433 17.2466 20.5872 16.2259 21.0631C14.9023 21.6802 13.4597 22 11.9993 21.9999C10.5389 21.9998 9.09633 21.6798 7.77287 21.0625C6.7522 20.5864 5.82149 19.9424 5.01855 19.1594C4.62314 18.7739 4.68167 18.1389 5.10479 17.784C5.52792 17.429 6.15484 17.4898 6.55976 17.8653C7.16828 18.4297 7.86245 18.8974 8.61829 19.25C9.67707 19.7438 10.8312 19.9998 11.9994 19.9999C13.1677 19.9999 14.3218 19.7441 15.3807 19.2504C16.1366 18.898 16.8308 18.4304 17.4394 17.8661C17.8444 17.4906 18.4713 17.4299 18.8944 17.785Z'
                  fill='currentColor'
                ></path>
                <path
                  d='M3.54277 15.078C3.02379 15.2669 2.4447 15.0001 2.30857 14.4648C2.03215 13.378 1.9399 12.2501 2.03806 11.1283C2.16533 9.67358 2.60965 8.26441 3.33978 6.9998C4.06991 5.7352 5.06815 4.64584 6.26432 3.80828C7.1868 3.16237 8.20975 2.6783 9.28915 2.37431C9.82075 2.22459 10.3414 2.59268 10.4373 3.13657C10.5332 3.68047 10.1672 4.19308 9.6395 4.35604C8.84657 4.60091 8.09458 4.96828 7.41146 5.4466C6.45452 6.11664 5.65593 6.98813 5.07183 7.99982C4.48772 9.0115 4.13226 10.1388 4.03045 11.3026C3.95776 12.1334 4.01559 12.9683 4.19998 13.7774C4.3227 14.3159 4.06175 14.8892 3.54277 15.078Z'
                  fill='currentColor'
                ></path>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M12.0001 18C15.3138 18 18.0001 15.3137 18.0001 12C18.0001 8.68628 15.3138 5.99999 12.0001 5.99999C8.68635 5.99999 6.00006 8.68628 6.00006 12C6.00006 15.3137 8.68635 18 12.0001 18Z'
                  fill='currentColor'
                ></path>
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
                className='size-10 sm:size-15'
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
                className='size-10 sm:size-15'
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
                className='size-10 sm:size-15'
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
                className='size-10 sm:size-15'
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
              <svg className='size-10 sm:size-15' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
              </svg>
            ),
          };
      }
    };

    const { title, subtitle, icon } = getViewContent();

    return (
      <div className='flex flex-col items-center justify-center h-full p-8 text-center bg-amber-50/25 dark:bg-zinc-900 gap-4'>
        <div className=' rounded-full flex items-center justify-center text-black/25 dark:text-white/50'>
          {icon}
        </div>
        <div className='flex flex-col gap-1'>
          <h2 className='text-xl md:text-3xl text-gray-900 dark:text-gray-200'>{title}</h2>
          <p className='text-xs md:text-md text-gray-600 dark:text-gray-300 max-w-md'>
            {subtitle}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className='flex h-full'>
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
