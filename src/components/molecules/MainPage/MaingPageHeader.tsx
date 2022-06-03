import { Link } from '@ornio-no/ds';
import { ReactElement } from 'react';
export const MaingPageHeader = (): ReactElement => (
  <div className="mt-24 bg-white">
    <div className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">
          Poster
        </h2>
        <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Build posts the way you want.
        </p>
        <p className="max-w-xl mx-auto mt-5 text-xl text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
    <div className="flex items-center justify-center px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <p className="mr-2 text-2xl text-gray-900">Start posting</p>
      <Link color="primary" className="text-2xl hover:text-indigo-400">
        now!
      </Link>
    </div>
  </div>
);
