import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByPkSubscription } from '@graphql/gen/graphql';
import { replaceURLs } from '@utils';
import { Loader } from '@atoms';
import { Alert, If } from '@ornio-no/ds';
import { PostStatusEnums } from '@enums';
import { usePreview } from '@hooks';

export const Post = (): ReactElement => {
  // hooks
  const { id } = useParams();
  const { previewedPost } = usePreview();

  // graphql hooks
  const { data: { post = null } = {}, loading } = useGetPostByPkSubscription({
    variables: {
      id: Number(id),
    },
  });

  if (loading) return <Loader />;

  return (
    <div className="relative py-16 mt-24 overflow-hidden bg-white">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <If condition={post?.status === PostStatusEnums.DRAFT}>
          <Alert variant="warning" className="mb-6">
            <Alert.Body>You're viewing a draft post.</Alert.Body>
          </Alert>
        </If>
        <div className="mx-auto text-lg max-w-prose">
          <If condition={!!post?.imageUrl}>
            <img
              src={post?.imageUrl || '' || previewedPost?.imageUrl || ''}
              alt="Post"
              className="my-4"
            />
          </If>
        </div>
        <h1 className="mt-10">
          <span className="block text-base font-semibold tracking-wide text-indigo-600 uppercase">
            Introducing
          </span>
          <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            {post?.title || previewedPost?.title}
          </span>
        </h1>
        <p className="mt-8 text-xl leading-8 text-gray-500">
          {post?.description || previewedPost?.description}
        </p>
        <div
          className="mx-auto mt-6 prose prose-lg text-gray-500 whitespace-pre-wrap prose-indigo"
          dangerouslySetInnerHTML={{
            __html: replaceURLs(
              post?.content || '' || previewedPost?.content || ''
            ),
          }}
        />
      </div>
    </div>
  );
};
