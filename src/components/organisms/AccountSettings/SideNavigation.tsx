import { KeyIcon, UserCircleIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { Link } from '@ornio-no/ds';
import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

export const SideNavigation = (): ReactElement => {
  // hooks
  const { pathname } = useLocation();

  // constants
  const activeClasses =
    'bg-indigo-50 border-indigo-500 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700';

  return (
    <aside className="py-6 md:w-[300px] w-[150px]">
      <nav className="space-y-1">
        <Link
          href="/account/settings"
          className={clsx(
            'group border-l-4 px-3 py-2 flex items-center text-sm font-medium',
            pathname === '/account/settings'
              ? activeClasses
              : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900'
          )}
        >
          <UserCircleIcon className="w-5 h-5 mr-2 text-gray-400" />
          <span className="truncate">Account</span>
        </Link>
        <Link
          href="/account/password"
          className={clsx(
            'group border-l-4 px-3 py-2 flex items-center text-sm font-medium',
            pathname === '/account/password'
              ? activeClasses
              : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900'
          )}
        >
          <KeyIcon className="w-5 h-5 mr-2 text-gray-400" />
          <span className="truncate">Password</span>
        </Link>
      </nav>
    </aside>
  );
};
