import { HeartIcon } from '@heroicons/react/24/outline';

function Logo() {
  return (
    <div className="mb-2 border-b border-blue-400">
      <div className="mx-auto my-1 flex justify-between items-center py-4 md:px-4 px-0 text-xl font-bold uppercase text-white">
        <a className="flex items-center" href="/">
          <span className="hidden md:block">
            <HeartIcon className="h-6 w-6" strokeWidth={2}></HeartIcon>
          </span>
          <span className="px-2">Ammu</span>
        </a>
      </div>
    </div>
  );
}

export default Logo;
