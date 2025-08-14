import {
  MessageSquarePlus,
  EllipsisVertical,
  Search,
  ChevronDown,
  CirclePlus,
  Plus,
  LockKeyhole,
  Pencil,
} from 'lucide-react';
import Popover from './ui/Popover';
import { useRef, useState } from 'react';

function Profile() {
  const [isListOpen, setIsListOpen] = useState(false);
  const listButtonRef = useRef(null);

  const toggleList = () => {
    setIsListOpen((prev) => !prev);
  };

  const closeList = () => {
    setIsListOpen(false);
  };
  return (
    <>
      <section className='sm:w-80 md:w-88 lg:w-100 flex-1 px-3 py-2 bg-white dark:bg-zinc-900 dark:text-white border-x border-black/10 dark:border-white/10'>
        <header className='flex items-center justify-between p-1'>
          <h1 className='text-xl font-semibold'>Profile</h1>
          {/* <div className='inline-flex gap-2'>
            <button className='inline-flex p-2 rounded-full hover:bg-stone-100 dark:hover:bg-zinc-700'>
              <CirclePlus />
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
                  <button className='flex items-center gap-3 w-full rounded-md px-3 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-700'>
                    <LockKeyhole className='size-5 text-neutral-600 dark:text-neutral-300' />
                    <span className='text-sm font-medium text-neutral-700 dark:text-neutral-200'>
                      Profile Privacy
                    </span>
                  </button>
                </div>
              </Popover>
            </div>
          </div> */}
        </header>
        <div className='flex flex-col items-center space-y-3 h-[calc(100vh-3.25rem)] gap-5 p-1.5'>
          <div className='p-2.5'>
            <img
              src='https://avatars.githubusercontent.com/u/3?v=4'
              alt='User Avatar'
              className='size-30 rounded-full'
            />
          </div>
          <div className='flex flex-col gap-3 w-full'>
            <span className='dark:text-neutral-400 text-sm'>Your name</span>
            <div className='flex items-center justify-between gap-2 mb-2'>
              <h3 className='text-md font-medium text-zinc-800 dark:text-zinc-200'>
                WhatsApp Business
              </h3>
              <button className='inline-flex p-2 rounded-full hover:bg-stone-100 dark:hover:bg-zinc-700'>
                <Pencil className='size-4' />
              </button>
            </div>
            <p className='text-[0.75rem] sm:text-xs md:text-sm text-zinc-500 dark:text-zinc-400 text-left'>
              This is a short bio about the user. It can include interests,
              hobbies, or any other relevant information.
            </p>
          </div>
          <div className='flex flex-col gap-3 w-full'>
            <span className='dark:text-neutral-400 text-sm'>About</span>
            <div className='flex items-center justify-between gap-2 mb-2'>
              <p className='text-md text-zinc-500 dark:text-zinc-400'>
                😉
              </p>
              <button className='inline-flex p-2 rounded-full hover:bg-stone-100 dark:hover:bg-zinc-700'>
                <Pencil className='size-4' />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
