import { ReactElement } from 'react';
import { AddPostFormFieldsProps } from '../Post.props';

export const AddPostFormFields = ({
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
      {errors.title && <p className="text-red-500">{errors.title?.message}</p>}
    </div>

    <div className="col-span-6 row-start-2 sm:col-span-4">
      <label
        htmlFor="description"
        className="block text-sm font-medium text-gray-700"
      >
        Description
      </label>
      <input
        {...register('description')}
        type="text"
        name="description"
        id="description"
        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {errors.description && (
        <p className="text-red-500">{errors.description?.message}</p>
      )}
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
      {errors.content && (
        <p className="text-red-500">{errors.content?.message}</p>
      )}
    </div>
  </div>
);
