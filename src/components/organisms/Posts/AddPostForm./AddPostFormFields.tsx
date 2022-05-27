import clsx from 'clsx';
import { ReactElement } from 'react';
import { AddPostFormFieldsProps } from '../Post.props';

export const AddPostFormFields = ({
  isEditing,
  register,
  errors,
}: AddPostFormFieldsProps): ReactElement => (
  <div className="grid grid-cols-6 gap-6">
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor="title"
        className="block text-sm font-medium text-gray-700"
      >
        Title *
      </label>
      <input
        {...register('title')}
        type="text"
        name="title"
        id="title"
        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <p className="text-red-500">{errors.title?.message}</p>
    </div>

    <div className="col-span-6 sm:col-span-4">
      <label
        htmlFor="content"
        className="block text-sm font-medium text-gray-700"
      >
        Content *
      </label>
      <textarea
        {...register('content')}
        defaultValue={''}
        rows={10}
        name="content"
        id="content"
        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <p className="text-red-500">{errors.content?.message}</p>
    </div>

    <div className="col-span-3">
      <label
        htmlFor="authorName"
        className="block text-sm font-medium text-gray-700"
      >
        Author Name *
      </label>
      <input
        {...register('authorName')}
        disabled={isEditing}
        type="text"
        name="authorName"
        id="authorName"
        autoComplete="authorName"
        className={clsx(
          'block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
          isEditing && 'hover:cursor-not-allowed'
        )}
      />
      <p className="text-red-500">{errors.authorName?.message}</p>
    </div>
    <div className="col-span-3">
      <label
        htmlFor="authorEmail"
        className="block text-sm font-medium text-gray-700"
      >
        Author Email
      </label>
      <input
        {...register('authorEmail')}
        disabled={isEditing}
        type="text"
        name="authorEmail"
        id="authorEmail"
        autoComplete="authorEmail"
        className={clsx(
          'block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
          isEditing && 'hover:cursor-not-allowed'
        )}
      />
      <p className="text-red-500">{errors.authorEmail?.message}</p>
    </div>
  </div>
);
