import {
  TrashIcon,
  PencilIcon,
  EyeIcon,
  EyeOffIcon,
} from '@heroicons/react/solid';
import Tooltip from '@mui/material/Tooltip';
import { If, Button, Badge } from '@ornio-no/ds';
import { formatDate } from '@utils';
import { PostStatusEnums } from '@enums';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { PostItemProps } from './Post.props';
import { HighlightText } from '@atoms';
import { useUrlSearchParams } from '@hooks';

export const PostItem = ({
  post,
  handleEditPost,
  handleSetModal,
}: PostItemProps): ReactElement => {
  // hooks
  const search = useUrlSearchParams();

  // constants
  const searchParam = search.get('search');
  const { PUBLISHED } = PostStatusEnums;
  const isDraft = post?.status === PostStatusEnums.DRAFT;

  return (
    <li
      key={post?.id}
      className="flex flex-col col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow-lg text-centeleftr"
    >
      <div className="flex flex-col flex-1 p-6">
        <NavLink
          to={`/post/${post?.id}`}
          className="text-lg flex items-center font-semibold !leading-snug tracking-tight text-gray-900"
        >
          {HighlightText(post?.title || '', searchParam)} {isDraft && '- '}
          {isDraft && (
            <Badge className="ml-1" variant="warning">
              Draft
            </Badge>
          )}
        </NavLink>
        <If condition={!!post?.imageUrl}>
          <img
            className="object-cover w-full h-48 mt-2"
            src={post?.imageUrl || ''}
            alt="Post"
          />
        </If>
        <dl className="flex flex-col justify-between flex-grow mt-1">
          <div className="flex text-gray-500">
            <p className="mt-4 text-sm">{post?.user?.name} -</p>
            <p className="mt-4 ml-1 text-sm font-medium">
              {formatDate(post?.createdAt)}
            </p>
          </div>

          <dd className="mt-3">
            <NavLink
              to={`/post/${post?.id}`}
              className="text-xs font-medium text-green-800 line-clamp-4 text-ellipsis"
            >
              {HighlightText(post?.content || '', searchParam)}
            </NavLink>
          </dd>
        </dl>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <Tooltip title="Delete" arrow>
              <Button
                color="none"
                className="p-0 focus:outline-none"
                link
                onClick={handleSetModal(post?.id || 0)}
                iconLeft={
                  <TrashIcon className="w-6 h-6 text-red-400 hover:text-red-600 hover:rounded-full" />
                }
              />
            </Tooltip>

            <Tooltip title="Edit" arrow>
              <Button
                color="none"
                className="p-0 focus:outline-none"
                link
                onClick={handleEditPost(post?.id || 0)}
                iconLeft={
                  <PencilIcon className="w-6 h-6 text-gray-400 hover:text-gray-600 hover:rounded-full" />
                }
              />
            </Tooltip>

            <Tooltip
              title={post?.status === PUBLISHED ? 'Published' : 'Unpublished'}
              arrow
            >
              <Button
                color="none"
                className="p-0 focus:outline-none"
                link
                onClick={handleEditPost(post?.id || 0)}
                iconLeft={
                  post?.status === PUBLISHED ? (
                    <EyeIcon className="w-6 h-6 text-gray-700 hover:text-gray-900" />
                  ) : (
                    <EyeOffIcon className="w-6 h-6 text-gray-700 hover:text-gray-900" />
                  )
                }
              />
            </Tooltip>
          </div>

          <If condition={!!post?.category}>
            <div className="text-sm text-gray-500">
              <span className="p-2 text-white bg-gray-600 rounded-md">
                {HighlightText(
                  (post?.category?.charAt(0)?.toUpperCase() || '') +
                    post?.category?.slice(1),
                  searchParam
                )}
              </span>
            </div>
          </If>
        </div>
      </div>
    </li>
  );
};
