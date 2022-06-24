import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
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
import { Button, ButtonGroup, Dropdown, If, Ternary } from '@ornio-no/ds';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth, usePreview } from '@hooks';
import { Loader } from '@atoms';
import { Modal, Notification } from '@molecules';
import { AddPostFormFields } from '@organisms';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { Upload } from 'upload-js';
import { PostStatusEnums } from '@enums';

export const AddPostForm = (): ReactElement => {
  // local state
  const [open, setOpen] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationTitle, setNotificationTitle] = useState<string>('');
  const [postImageUrl, setPostImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');
  const [filteredCategory, setFilteredCategory] = useState<string>('');

  // hooks
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { previewedPost, setPreviewedPost } = usePreview();

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    trigger,
    clearErrors,
    watch,
  } = useForm<PostInputs>({
    resolver: joiResolver(AddPostFormSchema()),
    mode: 'onChange',
  });

  // upload
  const upload = new Upload({ apiKey: 'free' });
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
  const { PUBLISHED } = PostStatusEnums;
  const isPublished = post?.status === PUBLISHED;

  // handlers
  const handleAddCategory = (value: string) => setSelected(value);
  const handleSearchCategory = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setFilteredCategory(value);
  const hanldeSetModal = () => {
    setOpen(!open);
    !isPublished
      ? navigate(`/edit/post/publish/${post?.id}`)
      : navigate(`/edit/post/unpublish/${post?.id}`);
  };
  const handlePublishPost = () => {
    publishPost({
      variables: {
        postId: post?.id || 0,
        set: {
          status: PUBLISHED,
        },
      },
    });
  };

  const handleDraftPost = (data: PostInputs) => () => {
    clearErrors && clearErrors();
    trigger('title');
    insertPost({
      variables: {
        object: {
          ...data,
          user_id: user?.id,
          image_url: postImageUrl,
          status: PostStatusEnums.DRAFT,
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
              status: PostStatusEnums.PUBLISHED,
              category: selected,
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
              category: selected,
            },
          },
        });
  };

  const handlePreviewPost = (data: PostInputs) => () => {
    trigger('title');
    setPreviewedPost({ ...data, imageUrl: postImageUrl, user });
    navigate('/post/preview');
  };

  const handleCancel = () => {
    setPreviewedPost(null);
    navigate('/posts');
  };

  useEffect(() => {
    (isEditing || previewedPost) &&
      reset({
        title: post?.title || previewedPost?.title,
        content: post?.content || previewedPost?.content || '',
        description: post?.description || previewedPost?.description || ' ',
      });
  }, [id, isEditing, post, previewedPost, reset]);

  useEffect(() => {
    if (post?.imageUrl) setPostImageUrl(post.imageUrl);
    if (post?.category) setSelected(post.category);
  }, [post?.category, post?.imageUrl, setPostImageUrl]);

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
                Add information about the post. Fields marked with * are
                required.
              </p>
            </div>

            <AddPostFormFields
              selected={selected}
              filteredCategory={filteredCategory}
              handleAddCategory={handleAddCategory}
              handleSearchCategory={handleSearchCategory}
              isEditing={isEditing}
              register={register}
              errors={errors}
              onChange={uploadFile}
              post={post}
            />
          </div>
          <div className="flex items-center justify-between px-4 py-3 space-x-4 bg-gray-50 sm:px-6">
            <Button
              className="disabled:cursor-not-allowed"
              type="button"
              onClick={handlePreviewPost({ ...watch() })}
              iconLeft={<EyeIcon className="w-5 h-5 text-gray-400" />}
              color="white"
            >
              Preview
            </Button>
            <div className="flex items-center space-x-4">
              <If condition={isEditing}>
                <Ternary
                  condition={isEditing && !isPublished}
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
              <ButtonGroup color="primary">
                <Button
                  disabled={
                    (insertLoading || loading || updateLoading || !isDirty) &&
                    !postImageUrl
                  }
                  loading={insertLoading || loading || updateLoading}
                  type="submit"
                  color="primary"
                  className="bg-indigo-600 disabled:cursor-not-allowed"
                >
                  {isEditing ? 'Save changes' : 'Add Post'}
                </Button>
                <Dropdown>
                  <Dropdown.Trigger
                    disabled={
                      (!isDirty || insertLoading || updateLoading) &&
                      !postImageUrl
                    }
                    className="text-white bg-indigo-600 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <Dropdown.Menu className="absolute bottom-[44px]">
                    <Dropdown.Group>
                      <Dropdown.Item
                        className="disabled:cursor-not-allowed"
                        id="add-post"
                        as="button"
                        role="button"
                        type="submit"
                        disabled={loading || insertLoading || updateLoading}
                      >
                        {isEditing ? 'Update' : 'Save and Publish'}
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="disabled:cursor-not-allowed"
                        id="draft"
                        as="button"
                        role="button"
                        type="button"
                        disabled={loading || insertLoading || updateLoading}
                        onClick={handleDraftPost({ ...watch() })}
                      >
                        Save as Draft
                      </Dropdown.Item>
                    </Dropdown.Group>
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </form>

      <Modal
        title={!isPublished ? 'Publish' : 'Unpublish'}
        description={
          !isPublished
            ? 'Are you sure you want to publish your post?'
            : 'Are you sure you want to unpublish your post?'
        }
        buttonLabel={!isPublished ? 'Publish' : 'Unpublish'}
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
