import { useMemo } from 'react';
import { FileUpload, Select } from '@ornio-no/ds';
import { ReactElement } from 'react';
import { FileTypeEnum } from '../../../../enums/FileTypes/FileType.enum';
import { AddPostFormFieldsProps } from '../Post.props';
import { categories } from '@static';

export const AddPostFormFields = ({
  post,
  errors,
  selected,
  register,
  onChange,
  filteredCategory,
  handleAddCategory,
  handleSearchCategory,
}: AddPostFormFieldsProps): ReactElement => {
  // constants
  const filteredCategories = useMemo(
    () =>
      categories.filter((category) =>
        category.toLowerCase().includes(filteredCategory.toLowerCase())
      ),
    [filteredCategory]
  );

  return (
    <div className="grid grid-cols-6 gap-6">
      <div className="grid items-end grid-cols-2 col-span-6">
        <div>
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
          {errors.title && (
            <p className="text-red-500">{errors.title?.message}</p>
          )}
        </div>

        <Select className="pl-14" value={selected} onChange={handleAddCategory}>
          <label
            htmlFor="title"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Category *
          </label>
          <Select.Trigger id="category" value={selected} className="z-10">
            {!selected
              ? 'Add category'
              : selected.charAt(0).toUpperCase() + selected.slice(1)}
          </Select.Trigger>
          <Select.Menu className="sm:w-[311px] mt-2">
            <Select.Search onChange={handleSearchCategory} />
            {filteredCategories.map((category, index) => (
              <Select.Option value={category} key={`${category}-${index}`}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Select.Option>
            ))}
          </Select.Menu>
        </Select>
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
          htmlFor="postImage"
          className="block text-sm font-medium text-gray-700"
        >
          Post Image
        </label>
        <FileUpload
          id="postImage"
          className="mt-1"
          accept="image/png,image/gif,image/jpeg"
          defaultPreview={{
            name: 'default image',
            src: post?.imageUrl ? post.imageUrl : '',
            type: FileTypeEnum.image,
          }}
          helptext="PNG, JPG, GIF up to 10MB"
          label="Upload a file or drag and drop"
          onRemoveFile={function noRefCheck() {}}
          onSelectFiles={function noRefCheck() {}}
          onChange={onChange}
        />
      </div>

      <div className="col-span-6">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content *
        </label>
        <textarea
          {...register('content')}
          defaultValue={''}
          rows={25}
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
};
