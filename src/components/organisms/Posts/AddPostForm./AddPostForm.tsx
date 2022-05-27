import { ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { PostInputs } from '../../../../interfaces/PostInputs';
import { AddPostFormSchema } from '../../../../validators/AddPost.validator';
import {
  useGetPostByPkSubscription,
  useInsertPostMutation,
  useUpdatePostMutation,
} from '../../../../graphql/gen/graphql';
import { AddPostFormFields } from './AddPostFormFields';
import { Button } from '@ornio-no/ds';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../../atoms/Loader/Loader';

export const AddPostForm = (): ReactElement => {
  // hooks
  const { id } = useParams();
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

  // constants
  const isEditing = pathname.includes('edit');

  // handlers
  const handleSubmitForm = ({
    authorEmail,
    authorName,
    title,
    content,
  }: PostInputs) => {
    !isEditing
      ? insertPost({
          variables: {
            data: {
              title,
              content,
              author: {
                data: {
                  name: authorName,
                  email: authorEmail,
                },
              },
            },
          },
        })
      : updatePost({
          variables: {
            id: Number(id),
            set: {
              title,
              content,
            },
          },
        });
  };

  useEffect(() => {
    isEditing &&
      reset({
        title: post?.title,
        content: post?.content,
        authorName: post?.author?.name || '',
        authorEmail: post?.author?.email || '',
      });
  }, [id, isEditing, post, reset]);

  if (loadingData) return <Loader />;

  return (
    <form className="mt-28" onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="shadow-xl sm:rounded-md sm:overflow-hidden">
        <div className="px-4 py-6 space-y-6 bg-white sm:p-6">
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
        <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
          <Button
            loading={!!insertLoading || !!updateLoading}
            disabled={!errors}
            type="submit"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};
