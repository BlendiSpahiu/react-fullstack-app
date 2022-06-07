import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { Button } from '@ornio-no/ds';
import clsx from 'clsx';
import { Fragment, ReactElement } from 'react';
import { useAuth } from '@hooks';
import { navbarLinks } from '@static';
import { NavLink } from '@molecules';

export const Navbar = (): ReactElement => {
  // hooks
  const { user, logout } = useAuth();

  // constants
  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <nav className="flex justify-between w-full px-12 py-6 bg-indigo-600 sm:px-40">
      <ul className="flex items-center text-white sm:space-x-6">
        {navbarLinks.map((link) => (
          <li key={link.path}>
            <NavLink
              className={clsx('p-2 hover:bg-indigo-400 hover:rounded-xl')}
              activeClassname="bg-indigo-500 rounded-lg"
              to={`${link.path}`}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-5">
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="flex items-center text-sm rounded-full focus:outline-none">
              <span className="sr-only">Open user menu</span>
              <p className="text-base font-semibold text-white">{user?.name}</p>
              <ChevronDownIcon className="w-5 h-5 ml-1 text-gray-400" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <NavLink
                    to="/account/settings"
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    )}
                    activeClassname="bg-gray-200"
                  >
                    Settings
                  </NavLink>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Button
                    onClick={logout}
                    link
                    color="none"
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'flex w-full px-4 py-2 text-sm text-gray-600 rounded-t-none'
                    )}
                  >
                    Sign out
                  </Button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
};
