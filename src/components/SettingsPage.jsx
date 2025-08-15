import {
  LogOut,
  CircleQuestionMark,
  Bell,
  KeyRound,
  Search,
  LockKeyhole,
} from 'lucide-react';
import Popover from './ui/Popover';
import { useRef, useState } from 'react';
import { DarkModeToggle } from '../utils/DM';

function SettingsPage() {
  return (
    <>
      <section className='sm:w-80 md:w-88 lg:w-100 flex-1 pt-2 bg-white dark:bg-zinc-900 dark:text-white border-x border-black/10 dark:border-white/10'>
        <header className='flex items-center justify-between p-1 px-3'>
          <h1 className='text-xl font-semibold'>Settings</h1>
        </header>
        <div className='py-2 px-3'>
          <div className='group flex items-center px-2 py-1.5 gap-2.5 rounded-full border border-transparent hover:border-black/15 dark:hover:border-white/15 bg-stone-100 dark:bg-zinc-700'>
            <Search className='size-5 text-zinc-500 dark:text-zinc-400' />
            <input
              type='text'
              placeholder='Search Settings'
              className='focus:outline-none placeholder:text-zinc-500 dark:placeholder:text-zinc-400 text-sm bg-transparent w-full'
            />
          </div>
        </div>
        <div className='h-[calc(100vh-5.85rem)] px-3 overflow-y-auto'>
          <div className='py-3'>
            <div className='flex items-center relative gap-2 p-3 cursor-pointer group hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded-xl'>
              <img
                src='https://avatars.githubusercontent.com/u/3?v=4'
                alt='User Avatar'
                className='size-12 rounded-full'
              />
              <div className='min-w-0'>
                <p className='dark:text-zinc-300 font-semibold'>WhatsApp Business</p>
                <p className='text-[0.75em] sm:text-xs md:text-sm text-zinc-500 dark:text-zinc-400 '>
                  cat lover, coffee enthusiast, and aspiring coder.
                </p>
              </div>
            </div>
          </div>

          <div className='border-t border-neutral-200 dark:border-neutral-600 my-3'></div>

          <div className='space-y-1 pb-3'>
            <button className='inline-flex items-center gap-5 w-full rounded-md p-4 text-left transition-colors duration-100 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-zinc-800'>
              <KeyRound className='size-5 rotate-45' />
              <div className='flex flex-col'>
                <span className='text-sm font-medium'>Account</span>
                <span className='text-[0.7em] sm:text-xs text-neutral-500 dark:text-white/75'>
                  account information
                </span>
              </div>
            </button>

            <DarkModeToggle />

            <button className='inline-flex items-center gap-5 w-full rounded-md p-4 text-left transition-colors duration-100 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-zinc-800'>
              <LockKeyhole className='size-5' />
              <div className='flex flex-col'>
                <span className='text-sm font-medium'>Privacy</span>
                <span className='text-[0.7em] text-xs text-neutral-500 dark:text-white/75'>
                  Block, report, and more
                </span>
              </div>
            </button>

            <button className='inline-flex items-center gap-5 w-full rounded-md p-4 text-left transition-colors duration-100 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-zinc-800'>
              <Bell className='size-5' />
              <div className='flex flex-col'>
                <span className='text-sm font-medium'>Notifications</span>
                <span className='text-[0.7em] text-xs text-neutral-500 dark:text-white/75'>
                  Message Notifications
                </span>
              </div>
            </button>
       

            <button className='inline-flex items-center gap-5 w-full rounded-md p-4 text-left transition-colors duration-100 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-zinc-800'>
              <CircleQuestionMark className='size-5' />
              <div className='flex flex-col'>
                <span className='text-sm font-medium'>Help</span>
                <span className='text-[0.7em] text-xs text-neutral-500 dark:text-white/75'>
                  Help center, FAQs, and more
                </span>
              </div>
            </button>

            <div className='border-t border-neutral-200 dark:border-neutral-600 my-2'></div>

            <button className='inline-flex items-center gap-5 w-full rounded-md p-4 text-left transition-colors duration-100 text-red-700 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/25'>
              <LogOut className='size-5' />
              <span className='text-sm font-medium'>Log Out</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default SettingsPage;
