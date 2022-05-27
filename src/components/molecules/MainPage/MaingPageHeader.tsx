import { ReactElement } from 'react';
export const MaingPageHeader = (): ReactElement => (
  <div className="bg-white">
    <div className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">
          Pricing
        </h2>
        <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Take control of your team.
        </p>
        <p className="max-w-xl mx-auto mt-5 text-xl text-gray-500">
          Start building for free, then add a site plan to go live. Account
          plans unlock additional features.
        </p>
      </div>
    </div>
  </div>
);
