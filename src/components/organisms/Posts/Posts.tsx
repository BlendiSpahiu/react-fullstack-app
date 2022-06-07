/* This example requires Tailwind CSS v2.0+ */
import { AnnotationIcon } from '@heroicons/react/outline';
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useDeletePostMutation,
  useGetPostsSubscription,
  usePostsCountSubscription,
} from '@graphql/gen/graphql';
import { Loader } from '@atoms';
import { Modal, PageHeader, Notification } from '@molecules';
import { PostItem } from './PostItem';

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
    navigate(`/posts/delete/${id}`);
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
          <PostItem
            key={post.id}
            post={post}
            handleSetModal={handleSetModal}
            handleEditPost={handleEditPost}
          />
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
