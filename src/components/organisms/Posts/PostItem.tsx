import {
  TrashIcon,
  PencilIcon,
  EyeIcon,
  EyeOffIcon,
} from '@heroicons/react/solid';
import Tooltip from '@mui/material/Tooltip';
import { If, Button, Ternary } from '@ornio-no/ds';
import { formatDate, formatDateExtended } from '@utils';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { PostItemProps } from './Post.props';

export const PostItem = ({
  post,
  handleEditPost,
  handleSetModal,
}: PostItemProps): ReactElement => {
  return (
    <li
      key={post?.id}
      className="flex flex-col col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow-lg text-centeleftr"
    >
      <div className="flex flex-col flex-1 p-6">
        <NavLink
          to={`/post/${post?.id}`}
          className="text-lg font-semibold !leading-snug tracking-tight text-gray-900 "
        >
          {post?.title}
        </NavLink>
        <If condition={!!post?.imageUrl}>
          <img className="mt-2" src={post?.imageUrl || ''} alt="Post" />
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
              {post?.content}
            </NavLink>
          </dd>
        </dl>
        <div className="flex items-center justify-between mt-4">
          <div className="space-x-4">
            <Tooltip title="Delete" arrow>
              <Button
                color="none"
                className="p-0"
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
                className="p-0"
                link
                onClick={handleEditPost(post?.id || 0)}
                iconLeft={
                  <PencilIcon className="w-6 h-6 text-gray-400 hover:text-gray-600 hover:rounded-full focus:outline-none" />
                }
              />
            </Tooltip>
            <Ternary
              condition={!post?.published}
              fallback={
                <Tooltip title="Publish" arrow>
                  <Button
                    color="none"
                    className="p-0"
                    link
                    onClick={handleEditPost(post?.id || 0)}
                    iconLeft={
                      <EyeIcon className="w-6 h-6 text-gray-700 hover:text-gray-900 focus:outline-none" />
                    }
                  />
                </Tooltip>
              }
            >
              <Tooltip title="Unpublish" arrow>
                <Button
                  color="none"
                  className="p-0"
                  link
                  iconLeft={
                    <EyeOffIcon className="w-6 h-6 text-gray-700 hover:text-gray-900 focus:outline-none" />
                  }
                />
              </Tooltip>
            </Ternary>
          </div>

          <div className="text-sm text-gray-500">
            <p>Modified</p>
            <p className="font-medium">{formatDateExtended(post?.updatedAt)}</p>
          </div>
        </div>
      </div>
    </li>
  );
};
