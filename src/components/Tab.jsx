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
              className={`p-2 rounded-full transition-colors ${
                activeView === 'chat'
                  ? 'bg-neutral-200 dark:bg-neutral-700'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
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
              className={`p-2 rounded-full transition-colors ${
                activeView === 'status'
                  ? 'bg-neutral-200 dark:bg-neutral-700'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
              title='Status'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='size-4.5'
                viewBox='0 0 56 56'
              >
                <path
                  fill='currentColor'
                  d='m50.923 21.002l.046.131l.171.566l.143.508l.061.232l.1.42a23.93 23.93 0 0 1-2.653 17.167a23.93 23.93 0 0 1-13.57 10.89l-.404.12l-.496.128l-.717.17a1.89 1.89 0 0 1-2.288-1.558a2.127 2.127 0 0 1 1.606-2.389l.577-.145q.54-.142.929-.273a19.93 19.93 0 0 0 10.899-8.943a19.93 19.93 0 0 0 2.292-13.923l-.069-.313l-.092-.365l-.115-.418l-.138-.47a2.135 2.135 0 0 1 1.26-2.602a1.894 1.894 0 0 1 2.458 1.067M7.385 19.92q.065.02.128.044A2.127 2.127 0 0 1 8.78 22.55q-.27.909-.39 1.513a19.93 19.93 0 0 0 2.295 13.91a19.93 19.93 0 0 0 10.911 8.947l.306.097l.174.05l.39.106l.694.171a2.135 2.135 0 0 1 1.623 2.393a1.894 1.894 0 0 1-2.152 1.594l-.138-.025l-.576-.135l-.51-.13l-.446-.125l-.2-.06A23.93 23.93 0 0 1 7.22 39.972a23.93 23.93 0 0 1-2.647-17.197l.077-.32l.1-.375l.194-.665l.076-.25a1.89 1.89 0 0 1 2.365-1.246M28.051 12c8.837 0 16 7.163 16 16s-7.163 16-16 16s-16-7.163-16-16s7.164-16 16-16m0 4c-6.627 0-12 5.373-12 12s5.373 12 12 12c6.628 0 12-5.373 12-12s-5.372-12-12-12m0-12a23.93 23.93 0 0 1 16.217 6.306l.239.227l.275.274l.31.322l.346.369a1.89 1.89 0 0 1-.205 2.76a2.127 2.127 0 0 1-2.873-.196q-.326-.345-.605-.617l-.35-.334l-.16-.143A19.93 19.93 0 0 0 28.051 8a19.93 19.93 0 0 0-13.204 4.976l-.114.102l-.253.24l-.287.285l-.495.515c-.76.809-2.014.9-2.883.21a1.894 1.894 0 0 1-.305-2.662l.90-.106l.405-.431l.368-.378q.262-.263.484-.465A23.93 23.93 0 0 1 28.05 4'
                />
              </svg>
            </button>

            <button
              onClick={() => handleViewChange('channels')}
              className={`p-2 rounded-full transition-colors ${
                activeView === 'channels'
                  ? 'bg-neutral-200 dark:bg-neutral-700'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
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
              className={`p-2 rounded-full transition-colors ${
                activeView === 'communities'
                  ? 'bg-neutral-200 dark:bg-neutral-700'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
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
                className='block md:hidden hover:bg-neutral-100 dark:hover:bg-neutral-700 p-2 rounded-full'
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
            className={`p-2 rounded-full ${
              activeView === 'settings'
                ? 'bg-neutral-200 dark:bg-neutral-700'
                : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
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
            className={`p-2 rounded-full transition-colors ${
              activeView === 'profile'
                ? 'bg-neutral-200 dark:bg-neutral-700'
                : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
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
