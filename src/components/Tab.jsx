import { RiMessage2Fill, RiMessage2Line } from 'react-icons/ri';
import { IoSettingsOutline, IoSettingsSharp } from 'react-icons/io5';
import { PanelRightOpen } from 'lucide-react';

function Tab({
  activeView,
  setActiveView,
  showMobileSidebar,
  setShowMobileSidebar,
}) {
  const handleViewChange = (view) => {
    const isMobile = window.innerWidth < 864;

    if (isMobile) {
      if (activeView === view && showMobileSidebar) {
        setShowMobileSidebar(false);
      } else {
        setActiveView(view);
        setShowMobileSidebar(true);
      }
    } else {
      setActiveView(view);
    }
  };

  return (
    <>
      <aside className='bg-white dark:bg-[#1b1b1e] text-neutral-700 dark:text-neutral-200 z-60 flex flex-col justify-between px-2 py-3 relative border-x-2 md:border-none border-black/10 dark:border-white/10'>
        <div className='flex flex-col items-center  gap-2'>
          <div className='flex flex-col items-center mb- gap-1'>
            <button
              onClick={() => handleViewChange('chat')}
              className={`p-2 rounded-full transition-colors duration-150 ${
                activeView === 'chat'
                  ? 'bg-neutral-200 dark:bg-neutral-700'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
              title='Chat'
            >
              {activeView === 'chat' ? (
                <RiMessage2Fill className='size-4.5' />
              ) : (
                <RiMessage2Line className='size-4.5' />
              )}
            </button>

            <button
              onClick={() => handleViewChange('status')}
              className={`p-2 rounded-full transition-colors duration-150 ${
                activeView === 'status'
                  ? 'bg-neutral-200 dark:bg-neutral-700'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
              title='Status'
            >
              {activeView === 'status' ? (
                <svg className='size-4.5' viewBox='0 0 24 24' fill='none'>
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
              ) : (
                <svg className='size-4.5' viewBox='0 0 24 24' fill='none'>
                  <title>status-refreshed</title>
                  <path
                    d='M13.5628 3.13661C13.6587 2.59272 14.1794 2.22464 14.711 2.37436C15.7905 2.6784 16.8135 3.16254 17.736 3.80856C18.9323 4.64623 19.9305 5.73573 20.6606 7.00048C21.3907 8.26524 21.8349 9.67455 21.962 11.1294C22.0601 12.2513 21.9677 13.3794 21.6911 14.4662C21.5549 15.0014 20.9758 15.2682 20.4568 15.0792C19.9378 14.8903 19.677 14.317 19.7998 13.7785C19.9843 12.9693 20.0422 12.1343 19.9696 11.3035C19.8679 10.1396 19.5126 9.01217 18.9285 8.00036C18.3444 6.98856 17.5458 6.11696 16.5888 5.44682C15.9057 4.96842 15.1536 4.60099 14.3606 4.35609C13.8329 4.19312 13.4669 3.6805 13.5628 3.13661Z'
                    fill='currentColor'
                  ></path>
                  <path
                    d='M18.8944 17.785C19.3175 18.14 19.3759 18.7749 18.9804 19.1604C18.1774 19.9433 17.2466 20.5872 16.2259 21.0631C14.9023 21.6802 13.4597 22 11.9993 21.9999C10.5389 21.9998 9.09633 21.6798 7.77287 21.0625C6.7522 20.5864 5.82149 19.9424 5.01855 19.1594C4.62314 18.7739 4.68167 18.1389 5.10479 17.784C5.52792 17.4291 6.15484 17.4898 6.55976 17.8654C7.16828 18.4298 7.86245 18.8974 8.61829 19.25C9.67707 19.7438 10.8312 19.9998 11.9994 19.9999C13.1677 20 14.3218 19.7442 15.3807 19.2505C16.1366 18.898 16.8308 18.4304 17.4394 17.8661C17.8444 17.4906 18.4713 17.43 18.8944 17.785Z'
                    fill='currentColor'
                  ></path>
                  <path
                    d='M3.54277 15.0781C3.02379 15.267 2.4447 15.0001 2.30857 14.4649C2.03215 13.3781 1.9399 12.2501 2.03806 11.1283C2.16533 9.6736 2.60965 8.26443 3.33978 6.99982C4.06991 5.73521 5.06815 4.64585 6.26432 3.8083C7.1868 3.16239 8.20975 2.67832 9.28915 2.37433C9.82075 2.22461 10.3414 2.59269 10.4373 3.13659C10.5332 3.68048 10.1672 4.1931 9.6395 4.35605C8.84657 4.60092 8.09458 4.9683 7.41146 5.44662C6.45452 6.11666 5.65593 6.98815 5.07183 7.99983C4.48772 9.01152 4.13226 10.1389 4.03045 11.3026C3.95776 12.1334 4.01559 12.9683 4.19998 13.7774C4.3227 14.3159 4.06175 14.8892 3.54277 15.0781Z'
                    fill='currentColor'
                  ></path>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M12.0001 16C14.2092 16 16.0001 14.2091 16.0001 12C16.0001 9.79086 14.2092 8 12.0001 8C9.79092 8 8.00006 9.79086 8.00006 12C8.00006 14.2091 9.79092 16 12.0001 16ZM12.0001 18C15.3138 18 18.0001 15.3137 18.0001 12C18.0001 8.68629 15.3138 6 12.0001 6C8.68635 6 6.00006 8.68629 6.00006 12C6.00006 15.3137 8.68635 18 12.0001 18Z'
                    fill='currentColor'
                  ></path>
                </svg>
              )}
            </button>

            <button
              onClick={() => handleViewChange('channels')}
              className={`p-2 rounded-full transition-colors duration-150 ${
                activeView === 'channels'
                  ? 'bg-neutral-200 dark:bg-neutral-700'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
              title='Channels'
            >
              {activeView === 'channels' ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='size-4.5'
                >
                  <path d='M16.881 4.345A23.112 23.112 0 0 1 8.25 6H7.5a5.25 5.25 0 0 0-.88 10.427 21.593 21.593 0 0 0 1.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.593.772-2.468a17.116 17.116 0 0 1-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0 0 18 11.25c0-2.414-.393-4.735-1.119-6.905ZM18.26 3.74a23.22 23.22 0 0 1 1.24 7.51 23.22 23.22 0 0 1-1.41 7.992.75.75 0 1 0 1.409.516 24.555 24.555 0 0 0 1.415-6.43 2.992 2.992 0 0 0 .836-2.078c0-.807-.319-1.54-.836-2.078a24.65 24.65 0 0 0-1.415-6.43.75.75 0 1 0-1.409.516c.059.16.116.321.17.483Z' />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-4.5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46'
                  />
                </svg>
              )}
            </button>

            <button
              onClick={() => handleViewChange('communities')}
              className={`p-2 rounded-full transition-colors duration-150 ${
                activeView === 'communities'
                  ? 'bg-neutral-200 dark:bg-neutral-700'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
              title='Communities'
            >
              {activeView === 'communities' ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='size-4.5'
                >
                  <path
                    fillRule='evenodd'
                    d='M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z'
                    clipRule='evenodd'
                  />
                  <path d='M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z' />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-4.5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z'
                  />
                </svg>
              )}
            </button>
          </div>
          {showMobileSidebar && (
            <>
              <div className='block md:hidden w-full h-px border border-zinc-200/75 dark:border-zinc-700 my-2'></div>
              <button
                className='block md:hidden hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-full'
                onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                title='Close Sidebar'
              >
                <PanelRightOpen />
              </button>{' '}
            </>
          )}
        </div>

        <div className='flex flex-col gap-1 p-1'>
          <button
            onClick={() => handleViewChange('settings')}
            className={`p-2 rounded-full transition-colors duration-150 ${
              activeView === 'settings'
                ? 'bg-neutral-200 dark:bg-neutral-700'
                : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
            title='Settings'
          >
            {activeView === 'settings' ? (
              <IoSettingsSharp className='size-4.5' />
            ) : (
              <IoSettingsOutline className='size-4.5' />
            )}
          </button>

          <button
            onClick={() => handleViewChange('profile')}
            className={`p-2 rounded-full transition-colors duration-150 ${
              activeView === 'profile'
                ? 'bg-neutral-200 dark:bg-neutral-700'
                : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
            title='Profile'
          >
            {activeView === 'profile' ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='size-4.5'
              >
                <path
                  fillRule='evenodd'
                  d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
                  clipRule='evenodd'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-4.5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                />
              </svg>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

export default Tab;
