import { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { PostInputs } from '../../../../interfaces/PostInputs.types';
import { AddPostFormSchema } from '../../../../validators/AddPost.validator';
import {
  useGetPostByPkSubscription,
  useInsertPostMutation,
  usePublishPostMutation,
  useUpdatePostMutation,
} from '../../../../graphql/gen/graphql';
import { AddPostFormFields } from './AddPostFormFields';
import { Button, Ternary } from '@ornio-no/ds';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../../atoms/Loader/Loader';
import { useAuth } from '../../../../hooks/useAuth';
import { Modal } from '../../../molecules/Modal/Modal';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { ModalTypesEnum } from '../../../../enums/ModalTypes.enum';

export const AddPostForm = (): ReactElement => {
  // local state
  const [open, setOpen] = useState<boolean>(false);

  // hooks
  const { user } = useAuth();
  const { id, modal } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostInputs>({
    resolver: joiResolver(AddPostFormSchema()),
    mode: 'onChange',
  });

  // graphql hooks
  const { data: { post = null } = {}, loading: loadingData } =
    useGetPostByPkSubscription({
      variables: { id: Number(id) },
    });
  const [insertPost, { loading: insertLoading }] = useInsertPostMutation({
    onCompleted: ({ insertPost }) => navigate(`/post/${insertPost?.id}`),
    onError: () => console.log('Doesnt work'),
  });
  const [updatePost, { loading: updateLoading }] = useUpdatePostMutation({
    onCompleted: ({ updatePost }) => navigate(`/post/${updatePost?.id}`),
    onError: () => console.log('Doesnt work'),
  });
  const [publishPost, { loading: publishLoading }] = usePublishPostMutation({
    onCompleted: () => {
      setOpen(!open);
      const timeout = setTimeout(() => {
        setOpen(false);
      }, 2500);
      return () => {
        clearTimeout(timeout);
      };
    },
    onError: () => console.log("Couldn't be published"),
  });

  // constants
  const isEditing = pathname.includes('edit');
  const isUnpublishing = modal === ModalTypesEnum.UNPUBLISH;

  // handlers
  const hanldeSetModal = () => {
    setOpen(!open);
    !isUnpublishing
      ? navigate(`/edit/post/publish/${post?.id}`)
      : navigate(`/edit/post/unpublish/${post?.id}`);
  };
  const handlePublishPost = () => {
    publishPost({
      variables: {
        postId: post?.id || 0,
        set: {
          published: true,
        },
      },
    });
  };
  const handleUnPublishPost = () => {
    publishPost({
      variables: {
        postId: post?.id || 0,
        set: {
          published: false,
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
            },
          },
        });
  };

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
            />
          </div>
          <div className="flex items-center justify-end px-4 py-3 space-x-4 bg-gray-50 sm:px-6">
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
            <Button
              loading={!!insertLoading || !!updateLoading}
              disabled={!errors}
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEditing ? 'Update' : 'Add Post'}
            </Button>
          </div>
        </div>
      </form>

      <Modal
        title={!isUnpublishing ? 'Publish' : 'Unpublish'}
        description={
          !isUnpublishing
            ? 'Are you sure you want to publish your post?'
            : 'Are you sure you want to unpublish your post?'
        }
        buttonLabel={!isUnpublishing ? 'Publish' : 'Unpublish'}
        publish
        open={open}
        setOpen={setOpen}
        onClick={!isUnpublishing ? handlePublishPost : handleUnPublishPost}
      />
    </>
  );
};
