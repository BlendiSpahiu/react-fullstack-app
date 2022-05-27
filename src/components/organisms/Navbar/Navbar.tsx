import clsx from 'clsx';
import { ReactElement } from 'react';
import { navbarLinks } from '../../../static/navbarLinks';
import { NavLink } from '../../molecules/NavLink/NavLink';

export const Navbar = (): ReactElement => {
  return (
    <nav className="flex justify-between w-full px-12 py-6 bg-indigo-600 md:px-40">
      <ul className="flex items-center text-white sm:space-x-6">
        {navbarLinks.map((link) => (
          <li key={link.path}>
            <NavLink
              className={clsx('p-2 hover:bg-indigo-400 hover:rounded-xl')}
              to={`${link.path}`}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="space-x-4">
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-900 bg-white border border-transparent rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
        >
          Login
        </button>
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};
