import {
  MessageSquarePlus,
  EllipsisVertical,
  Search,
  ChevronDown,
  CirclePlus,
  Plus,
  LockKeyhole,
} from 'lucide-react';
import Popover from './ui/Popover';
import { useRef, useState } from 'react';

function Status() {
  const [isListOpen, setIsListOpen] = useState(false);
  const listButtonRef = useRef(null);

  const toggleList = () => {
    setIsListOpen((prev) => !prev);
  };

  const closeList = () => {
    setIsListOpen(false);
  };

  const mockStatus = [
    {
      name: `Adriana O'Sullivan`,
      avatar: 'https://untitledui.com/images/avatars/adriana-sullivan',
      lastStatus: '16',
    },
    {
      name: 'Lily-Rose Chedjou',
      avatar: 'https://untitledui.com/images/avatars/lily-rose-chedjou',
      lastStatus: '16',
    },
    {
      name: 'Loki Bright',
      avatar: 'https://untitledui.com/images/avatars/loki-bright',
      lastStatus: '16',
    },
    {
      name: 'Kelly Williams',
      avatar: 'https://untitledui.com/images/avatars/kelly-williams',
      lastStatus: '16',
    },
    {
      name: 'Lyle Kaufman',
      avatar: 'https://untitledui.com/images/avatars/lyle-kauffman',
      lastStatus: '16',
    },
    {
      name: 'Eva Bond',
      avatar: 'https://untitledui.com/images/avatars/eva-bond',
      lastStatus: '16',
    },
    {
      name: 'Lana Steiner',
      avatar: 'https://untitledui.com/images/avatars/lana-steiner',
      lastStatus: '16',
    },
    {
      name: 'Katherine Moss',
      avatar: 'https://untitledui.com/images/avatars/katherine-moss',
      lastStatus: '12',
    },
    {
      name: 'Anaiah Whitten',
      avatar: 'https://untitledui.com/images/avatars/anaiah-whitten',
      lastStatus: '7',
    },
  ];

  return (
    <>
      <section className='sm:w-80 md:w-88 lg:w-100 flex-1 pt-2 bg-white dark:bg-zinc-900 dark:text-white border-x border-black/10 dark:border-white/10'>
        <header className='flex items-center justify-between p-1 px-3'>
          <h1 className='text-xl font-semibold'>Status</h1>
          <div className='inline-flex gap-2'>
            <button className='inline-flex p-2 rounded-full transition-colors duration-150 hover:bg-stone-100 dark:hover:bg-zinc-800'>
              <CirclePlus />
            </button>
            <div className='relative'>
              <button
                ref={listButtonRef}
                onClick={toggleList}
                className={`inline-flex p-2 rounded-full transition-colors duration-150 ${
                  isListOpen
                    ? 'bg-stone-100 dark:bg-zinc-700'
                    : 'hover:bg-stone-100 dark:hover:bg-zinc-800'
                }`}
                title='Status options'
              >
                <EllipsisVertical />
              </button>
              <Popover
                isOpen={isListOpen}
                onClose={closeList}
                anchorRef={listButtonRef}
                className='dark:bg-zinc-900 shadow-lg rounded-lg p-2 w-64'
              >
                <div className='space-y-1'>
                  <button className='flex items-center gap-3 w-full rounded-md px-3 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800'>
                    <LockKeyhole className='size-5 text-neutral-600 dark:text-neutral-300' />
                    <span className='text-sm font-medium text-neutral-700 dark:text-neutral-200'>
                      Status Privacy
                    </span>
                  </button>
                </div>
              </Popover>
            </div>
          </div>
        </header>
        <div className='py-2 px-3'>
          <div className='grid grid-cols-[40px_1fr] items-center relative gap-2 p-2 cursor-pointer group'>
            <div className='relative'>
              <img
                src='https://avatars.githubusercontent.com/u/3?v=4'
                alt='User Avatar'
                className='w-10 h-10 rounded-full'
              />

              <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full group-hover:scale-125 transition-scale duration-100 flex items-center justify-center border-2 border-white dark:border-zinc-800'>
                <Plus className='w-3 h-3 text-white' strokeWidth={2.5} />
              </div>
            </div>
            <div className='min-w-0'>
              <p className='dark:text-zinc-300 font-semibold'>My Status</p>
              <p className='text-sm text-zinc-500 dark:text-zinc-400 truncate'>
                Click to add status update
              </p>
            </div>
          </div>
        </div>
        <div className='flex gap-2 p-1.5 px-3'>
          <h2>Recent</h2>
        </div>
        <div className='space-y-2 py-2 px-3 h-[calc(100vh-10.35rem)] overflow-y-auto'>
          {mockStatus.map((user, idx) => (
            <div
              key={idx}
              className='grid grid-cols-[40px_1fr] items-center relative gap-2 p-3 rounded-lg hover:bg-stone-100 dark:hover:bg-zinc-800 cursor-pointer group'
            >
              <img
                src={user.avatar}
                alt={`${user.name} Avatar`}
                className='size-9 outline-2 outline-offset-3 outline-green-500 rounded-full'
              />
              <div className='min-w-0 pl-1 duration-150'>
                <p className='dark:text-zinc-300 font-semibold'>{user.name}</p>
                <p className='text-sm text-zinc-500 dark:text-zinc-400 truncate'>
                  {user.lastStatus} hours ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Status;
