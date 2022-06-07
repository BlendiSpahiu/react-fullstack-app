import { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { PostInputs } from '@interfaces';
import { AddPostFormSchema } from '@validators';
import {
  useGetPostByPkSubscription,
  useInsertPostMutation,
  usePublishPostMutation,
  useUpdatePostMutation,
} from '@graphql/gen/graphql';
import { Button, If, Ternary } from '@ornio-no/ds';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@hooks';
import { Loader } from '@atoms';
import { Modal, Notification } from '@molecules';
import { AddPostFormFields } from '@organisms';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { Upload } from 'upload-js';

export const AddPostForm = (): ReactElement => {
  // local state
  const [open, setOpen] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationTitle, setNotificationTitle] = useState<string>('');
  const [postImageUrl, setPostImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // hooks
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<PostInputs>({
    resolver: joiResolver(AddPostFormSchema()),
    mode: 'onChange',
  });

  // upload
  const upload = new Upload({ apiKey: 'public_FW25aqth2dBeCyy9JW8C1kdTnpZb' });
  const uploadFile = upload.createFileInputHandler({
    onProgress: () => setLoading(true),
    onUploaded: ({ fileUrl }) => {
      setLoading(false);
      setPostImageUrl(fileUrl);
    },
  });

  const isUnpublishing = notificationTitle !== 'Post successfully published';

  const handleShowNotification = () => {
    setShowNotification(!showNotification);
    const timeout = setTimeout(() => {
      setShowNotification(false);
    }, 2500);
    return () => {
      clearTimeout(timeout);
    };
  };

  // graphql hooks
  const { data: { post = null } = {}, loading: loadingData } =
    useGetPostByPkSubscription({
      variables: { id: Number(id) },
    });
  const [insertPost, { loading: insertLoading }] = useInsertPostMutation({
    onCompleted: ({ insertPost }) => {
      navigate(`/post/${insertPost?.id}`);
    },
    onError: () => console.log('Doesnt work'),
  });
  const [updatePost, { loading: updateLoading }] = useUpdatePostMutation({
    onCompleted: ({ updatePost }) => {
      navigate(`/post/${updatePost?.id}`);
    },
    onError: () => console.log('Doesnt work'),
  });
  const [publishPost, { loading: publishLoading }] = usePublishPostMutation({
    onCompleted: () => {
      !isUnpublishing
        ? setNotificationTitle('Post successfully unpublished')
        : setNotificationTitle('Post successfully published');
      setOpen(false);
      handleShowNotification();
    },
    onError: () => console.log("Couldn't be published"),
  });

  // constants
  const isEditing = pathname.includes('edit');

  // handlers
  const hanldeSetModal = () => {
    setOpen(!open);
    !post?.published
      ? navigate(`/edit/post/publish/${post?.id}`)
      : navigate(`/edit/post/unpublish/${post?.id}`);
  };
  const handlePublishPost = () => {
    publishPost({
      variables: {
        postId: post?.id || 0,
        set: {
          published: !post?.published ? true : false,
        },
      },
    });
  };

  const handleSubmitForm = ({ title, content, description }: PostInputs) => {
    !isEditing
      ? insertPost({
          variables: {
            object: {
              title,
              content,
              description,
              user_id: user?.id,
              image_url: postImageUrl,
            },
          },
        })
      : updatePost({
          variables: {
            id: Number(id),
            set: {
              title,
              content,
              description,
              image_url: postImageUrl || post?.imageUrl,
            },
          },
        });
  };

  const handleCancel = () => navigate('/posts');

  useEffect(() => {
    isEditing &&
      reset({
        title: post?.title,
        content: post?.content,
        description: post?.description || '',
      });
  }, [id, isEditing, post, reset]);

  if (loadingData) return <Loader />;

  return (
    <>
      <form className="mt-28" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="shadow-xl sm:rounded-md sm:overflow-hidden">
          <div className="px-6 py-6 space-y-6 bg-white sm:p-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Add Post
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Add information about the post.
              </p>
            </div>

            <AddPostFormFields
              isEditing={isEditing}
              register={register}
              errors={errors}
              onChange={uploadFile}
              post={post}
            />
          </div>
          <div className="flex items-center justify-end px-4 py-3 space-x-4 bg-gray-50 sm:px-6">
            <If condition={isEditing}>
              <Ternary
                condition={isEditing && !post?.published}
                fallback={
                  <Button
                    loading={publishLoading}
                    onClick={hanldeSetModal}
                    color="none"
                    type="button"
                    iconLeft={<EyeOffIcon className="w-6 h-6 " />}
                  >
                    Unpublish
                  </Button>
                }
              >
                <Button
                  loading={publishLoading}
                  onClick={hanldeSetModal}
                  color="none"
                  type="button"
                  iconLeft={<EyeIcon className="w-6 h-6 " />}
                >
                  Publish
                </Button>
              </Ternary>
            </If>

            <Button color="none" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              loading={!!insertLoading || !!updateLoading || loading}
              disabled={!errors || !isDirty}
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEditing ? 'Update' : 'Add Post'}
            </Button>
          </div>
        </div>
      </form>

      <Modal
        title={!post?.published ? 'Publish' : 'Unpublish'}
        description={
          !post?.published
            ? 'Are you sure you want to publish your post?'
            : 'Are you sure you want to unpublish your post?'
        }
        buttonLabel={!post?.published ? 'Publish' : 'Unpublish'}
        publish
        open={open}
        setOpen={setOpen}
        onClick={handlePublishPost}
      />

      <Notification
        title={notificationTitle}
        show={showNotification}
        setShow={setShowNotification}
      />
    </>
  );
};
