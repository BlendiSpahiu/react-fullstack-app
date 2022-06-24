import { PlusIcon } from '@heroicons/react/solid';
import queryString from 'query-string';
import { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { PageHeaderProps } from '@molecules';
import { TextInput } from '@ornio-no/ds';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUrlSearchParams } from '@hooks';
import { useDebouncedCallback } from 'use-debounce';
import { SortEnums } from '@enums';

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
  // local state
  const [searchResult, setSearchResult] = useState<string | null>('');
  const [sort, setSort] = useState<string | null>('');

  // hooks
  const { search } = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const searchParams = useUrlSearchParams();

  // constants
  const queryParams = queryString.parse(search);
  const debouncedSearch = useDebouncedCallback((value) => {
    setSearchResult(value);
    navigate({
      search: `${queryString.stringify({
        ...queryParams,
        search: value,
      })}`,
    });
  }, 600);
  const { CATEGORY, RECENTLYADDED, STATUS } = SortEnums;

  // handlers
  const handleSearch = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(value);
  };

  const handleSort = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    setSort(value);
    navigate({
      search: `${queryString.stringify({
        ...queryParams,
        sort: value,
      })}`,
    });
  };

  useEffect(() => {
    if (searchParams.get('search')) {
      setSearchResult(searchParams.get('search'));
      searchInputRef.current?.focus();
      searchInputRef.current?.setSelectionRange(
        searchResult?.length || 0,
        searchResult?.length || 0
      );
    }
    if (searchParams.get('sort')) setSort(searchParams.get('sort'));
    if (!searchParams.get('search') && searchResult) setSearchResult(null);
  }, [navigate, searchParams, searchResult]);

  return (
    <>
      <div className="flex items-center justify-between mt-40">
        <h1 className="text-4xl">
          {title}
          {!!count && (
            <sup className="ml-0.5 text-gray-400 text-xl">({count})</sup>
          )}
        </h1>
        <TextInput
          ref={searchInputRef}
          className="w-1/2"
          placeholder="Search posts..."
          select
          selectPosition="right"
          options={[
            { value: RECENTLYADDED, label: 'Recently added' },
            { value: CATEGORY, label: 'Category' },
            { value: STATUS, label: 'Status' },
          ]}
          selectProps={{
            onChange: handleSort,
            ...(sort ? { value: sort } : { defaultValue: 'Recently added' }),
          }}
          onChange={handleSearch}
          defaultValue={searchResult || ''}
        />

        {/* empty state */}
      </div>
      {!hasData && (
        <div className="flex flex-col items-center justify-center mt-24">
          {icon}
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {emptyStateTitle}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{emptyStateDescription}</p>
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
    </>
  );
};
