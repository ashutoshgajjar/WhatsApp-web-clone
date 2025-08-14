import {
  MessageSquarePlus,
  EllipsisVertical,
  Search,
  ChevronDown,
  CirclePlus,
} from 'lucide-react';

function Communities() {
  return (
    <>
      <section className='sm:w-80 md:w-88 lg:w-100 flex-1 px-3 py-2 bg-white dark:bg-zinc-900 dark:text-white border-x border-black/10 dark:border-white/10'>
        <header className='flex items-center justify-between p-1'>
          <h1 className='text-xl font-semibold'>Communities</h1>
          <div className='inline-flex gap-2'>
            <button className='inline-flex p-2 rounded-full hover:bg-stone-100 dark:hover:bg-zinc-700'>
              <CirclePlus />
            </button>
            {/* <button className='inline-flex p-2 rounded-full hover:bg-stone-100 dark:hover:bg-zinc-700'>
              <EllipsisVertical />
            </button> */}
          </div>
        </header>
        <div className='flex flex-col items-center justify-center h-[calc(100vh-3.85rem)] gap-5 p-1.5'>
          <div className='inline-flex flex-col items-center gap-3 select-none'>
            <div className='size-fit md:w-69 rounded-xl dark:bg-green-500/50 p-2.5'>
              <img src='/workchat.svg' alt='community' className='pointer-events-none'/>
            </div>
            <h3 className='md:text-xl font-bold text-zinc-800 dark:text-zinc-200 text-center'>
              Stay connected with your communities. Join groups that matter to
              you and share updates, events, and more.
            </h3>
          </div>
          <p className='text-[0.8rem] md:text-sm text-zinc-500 dark:text-zinc-400 text-center'>
            Where neighbors actually connect through this one app - it's pretty
            amazing how it builds real community together. Your community app
            basically connects hearts and homes right where you live, you know?
            Just download it, discover what's going on, connect with people -
            your local community is literally just a tap away.
          </p>
        </div>
        {/* <div className='space-y-2 pr-1 h-[calc(100vh-7rem)] overflow-y-auto'></div> */}
      </section>
    </>
  );
}

export default Communities;
