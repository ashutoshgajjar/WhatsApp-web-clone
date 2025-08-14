import {
  MessageSquarePlus,
  EllipsisVertical,
  Search,
  ChevronDown,
  CirclePlus,
} from 'lucide-react';

function Channel() {
  const mockChannels1 = [
    {
      name: 'Gaming Hub',
      avatar: 'https://logo.clearbit.com/nvidia.com',
      followers: '16',
    },
    {
      name: 'Book Club Central',
      avatar: 'https://logo.clearbit.com/amazon.com',
      followers: '12',
    },
    {
      name: 'Photography Tips',
      avatar: 'https://logo.clearbit.com/canon.com',
      followers: '7',
    },
  ];

  const mockChannels2 = [
    {
      name: 'Tech News Daily',
      avatar: 'https://logo.clearbit.com/google.com',
      followers: '100',
    },
    {
      name: 'Ride Share Enthusiasts',
      avatar: 'https://logo.clearbit.com/uber.com',
      followers: '350',
    },
    {
      name: 'Travel Adventures',
      avatar: 'https://logo.clearbit.com/airbnb.com',
      followers: '523',
    },
    {
      name: 'Fitness Zone',
      avatar: 'https://logo.clearbit.com/nike.com',
      followers: '645',
    },
    {
      name: 'Music Lovers',
      avatar: 'https://logo.clearbit.com/spotify.com',
      followers: '192',
    },
  ];

  return (
    <>
      <section className='sm:w-80 md:w-88 lg:w-100 flex-1 py-2 bg-white dark:bg-zinc-900 dark:text-white border-x border-black/10 dark:border-white/10'>
        <header className='flex items-center justify-between p-1 px-3'>
          <h1 className='text-xl font-semibold'>Channels</h1>
          <div className='inline-flex gap-2'>
            <button className='inline-flex p-2 rounded-full hover:bg-stone-100 dark:hover:bg-zinc-700'>
              <CirclePlus />
            </button>
            {/* <button className='inline-flex p-2 rounded-full hover:bg-stone-100 dark:hover:bg-zinc-700'>
              <EllipsisVertical />
            </button> */}
          </div>
        </header>
        <div className='py-2 px-3'>
          <div className='group flex items-center px-2 py-1.5 gap-2.5 rounded-full border border-transparent hover:border-black/15 dark:hover:border-white/15 bg-stone-100 dark:bg-zinc-700'>
            <Search className='size-4 text-zinc-500 dark:text-zinc-400' />
            <input
              type='text'
              placeholder='Search channels'
              className='focus:outline-none placeholder:text-zinc-500 dark:placeholder:text-zinc-400 text-sm bg-transparent w-full'
            />
          </div>
        </div>
        {/* <div id='tab' className='flex gap-2 p-1.5'>
          <button className='text-sm px-2.5 py-1 rounded-full text-black/50 dark:text-zinc-300 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-black/10 hover:border-black/15 dark:border-zinc-700 dark:hover:border-zinc-600'>
            All
          </button>
          <button className='text-sm px-2.5 py-1 rounded-full text-black/50 dark:text-zinc-300 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-black/10 hover:border-black/15 dark:border-zinc-700 dark:hover:border-zinc-600'>
            Unread
          </button>
          <button className='text-sm px-2.5 py-1 rounded-full text-black/50 dark:text-zinc-300 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-black/10 hover:border-black/15 dark:border-zinc-700 dark:hover:border-zinc-600'>
            Groups
          </button>
        </div> */}
        <div className='space-y-2 px-3 h-[calc(100vh-6.94rem)] overflow-y-auto'>
          {mockChannels1.map((channel, idx) => (
            <div
              key={idx}
              className='grid grid-cols-[50px_1fr] items-center relative gap-2 p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-zinc-700 cursor-pointer group'
            >
              <img
                src={channel.avatar}
                alt={`${channel.name} Avatar`}
                className='w-10 h-10 rounded-full'
              />
              <div className='min-w-0 group-hover:pr-6 duration-150'>
                <p className='dark:text-zinc-300 font-semibold'>
                  {channel.name}
                </p>
                <p className='text-sm text-zinc-500 dark:text-zinc-400 truncate'>
                  {channel.followers}M followers
                </p>
              </div>
              <div className='absolute bottom-2 right-2 opacity-0 dark:text-zinc-300 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-250 '>
                <ChevronDown />
              </div>
            </div>
          ))}
          <div className='text-zinc-600 dark:text-zinc-400 my-3'>
            Find channels to follow
          </div>
          <div className='space-y-1'>
            {mockChannels2.map((channel, idx) => (
              <div
                key={idx}
                className='grid grid-cols-[50px_1fr] items-center relative gap-2 p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-zinc-700 cursor-pointer group'
              >
                <img
                  src={channel.avatar}
                  alt={`${channel.name} Avatar`}
                  className='w-10 h-10 rounded-full object-cover'
                />
                <div className='min-w-0 group-hover:pr-6 duration-150'>
                  <p className='dark:text-zinc-300 font-semibold'>
                    {channel.name}
                  </p>
                  <p className='text-sm text-zinc-500 dark:text-zinc-400 truncate'>
                    {channel.followers}K followers
                  </p>
                </div>
                <div className='absolute bottom-2 right-2 opacity-0 dark:text-zinc-300 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-250 '>
                  <ChevronDown />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Channel;
