import { PlusIcon } from '@heroicons/react/solid';
import { ReactElement } from 'react';
import { PageHeaderProps } from '@molecules';

export const PageHeader = ({
  count,
  icon,
  hasData,
  title,
  emptyStateTitle,
  emptyStateDescription,
  emptyStateButtonLabel,
  onClick,
}: PageHeaderProps): ReactElement => {
  return (
    <>
      <div className="mt-28">
        <h1 className="text-4xl">
          {title}
          {!!count && (
            <sup className="ml-0.5 text-gray-400 text-xl">({count})</sup>
          )}
        </h1>
        {!hasData && (
          <div className="flex flex-col items-center justify-center mt-24">
            {icon}
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {emptyStateTitle}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {emptyStateDescription}
            </p>
            <div className="mt-6">
              <button
                onClick={onClick}
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
                {emptyStateButtonLabel}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
