/* This example requires Tailwind CSS v2.0+ */
import { AnnotationIcon } from '@heroicons/react/outline';
import {
  EyeIcon,
  EyeOffIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { Button, Ternary } from '@ornio-no/ds';
import { ReactElement, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  useDeletePostMutation,
  useGetPostsSubscription,
  usePostsCountSubscription,
} from '../../../graphql/gen/graphql';
import { Loader } from '../../atoms/Loader/Loader';
import { Modal } from '../../molecules/Modal/Modal';
import { Notification } from '../../molecules/Notification/Notification';
import { PageHeader } from '../../molecules/PageHeader/PageHeader';

export const Posts = (): ReactElement => {
  // local state
  const [postId, setPostId] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  // hooks
  const navigate = useNavigate();

  // graphql hooks
  const { data: { posts = [] } = {}, loading } = useGetPostsSubscription();
  const [deletePost] = useDeletePostMutation({
    onCompleted: () => {
      setShowNotification(!showNotification);
      const timeout = setTimeout(() => {
        setShowNotification(false);
      }, 2500);
      return () => {
        clearTimeout(timeout);
      };
    },
    onError: () => console.log("Couldn't be deleted"),
  });

  const { data: { postsAggregate = null } = {} } = usePostsCountSubscription();

  // constants
  const count = postsAggregate?.aggregate?.count || 0;

  // handlers
  const handleDeletePost = () => deletePost({ variables: { id: postId } });
  const handleSetModal = (id: number) => () => {
    setPostId(id);
    setOpen(!open);
  };
  const handleEditPost = (id: number) => () => navigate(`/edit/post/${id}`);
  const handleAddNewPost = () => navigate('/add-post');

  if (loading) return <Loader />;

  return (
    <>
      <PageHeader
        count={count}
        title="Posts"
        onClick={handleAddNewPost}
        emptyStateTitle="No posts"
        hasData={posts.length !== 0}
        emptyStateButtonLabel="New Post"
        emptyStateDescription="Get started by creating a new post."
        icon={<AnnotationIcon className="w-12 h-12 text-gray-400" />}
      />
      <ul className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-3">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex flex-col col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow-lg text-centeleftr"
          >
            <div className="flex flex-col flex-1 p-6">
              <NavLink
                to={`/post/${post.id}`}
                className="text-lg font-semibold !leading-snug tracking-tight text-gray-900 "
              >
                {post.title}
              </NavLink>
              <dl className="flex flex-col justify-between flex-grow mt-1">
                <dd className="mt-4 text-sm text-gray-500">
                  {post.user?.name}
                </dd>
                <dd className="mt-3">
                  <NavLink
                    to={`/post/${post.id}`}
                    className="text-xs font-medium text-green-800 line-clamp-4 text-ellipsis"
                  >
                    {post.content}
                  </NavLink>
                </dd>
              </dl>
              <div className="flex items-center mt-4 space-x-4">
                <Button
                  color="none"
                  link
                  onClick={handleSetModal(post.id)}
                  iconLeft={
                    <TrashIcon className="w-6 h-6 text-red-400 hover:text-red-600 hover:rounded-full" />
                  }
                />
                <Button
                  color="none"
                  link
                  onClick={handleEditPost(post.id)}
                  iconLeft={
                    <PencilIcon className="w-6 h-6 text-gray-400 hover:text-gray-600 hover:rounded-full focus:outline-none" />
                  }
                />
                <Ternary
                  condition={!post.published}
                  fallback={
                    <Button
                      color="none"
                      link
                      onClick={handleEditPost(post.id)}
                      iconLeft={
                        <EyeIcon className="w-6 h-6 text-gray-700 hover:text-gray-900 focus:outline-none" />
                      }
                    />
                  }
                >
                  <Button
                    color="none"
                    link
                    iconLeft={
                      <EyeOffIcon className="w-6 h-6 text-gray-700 hover:text-gray-900 focus:outline-none" />
                    }
                  />
                </Ternary>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        title="Delete"
        description="Are you sure you want to delete this post. This process cannot be undone"
        buttonLabel="Delete"
        open={open}
        setOpen={setOpen}
        onClick={handleDeletePost}
      />
      <Notification
        show={showNotification}
        setShow={setShowNotification}
        title="Post successfully deleted!"
      />
    </>
  );
};
