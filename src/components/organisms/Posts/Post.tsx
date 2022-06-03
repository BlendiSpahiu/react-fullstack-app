import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByPkSubscription } from '../../../graphql/gen/graphql';
import { replaceURLs } from '../../../utils/string/replaceURLs';
import { Loader } from '../../atoms/Loader/Loader';

export const Post = (): ReactElement => {
  // hooks
  const { id } = useParams();

  // graphql hooks
  const { data: { post = null } = {}, loading } = useGetPostByPkSubscription({
    variables: {
      id: Number(id),
    },
  });

  if (loading) return <Loader />;

  return (
    <div className="relative py-16 overflow-hidden bg-white">
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full"></div>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto text-lg max-w-prose">
          <h1>
            <span className="block text-base font-semibold tracking-wide text-center text-indigo-600 uppercase">
              Introducing
            </span>
            <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
              {post?.title}
            </span>
          </h1>
          <p className="mt-8 text-xl leading-8 text-gray-500">
            {post?.description}
          </p>
        </div>
        <div
          className="mx-auto mt-6 prose prose-lg text-gray-500 whitespace-pre-wrap prose-indigo"
          dangerouslySetInnerHTML={{ __html: replaceURLs(post?.content || '') }}
        />
      </div>

      <div className="fixed bottom-0 left-0 p-6 text-gray-700 bg-white border border-gray-400 rounded-tr-md">
        A post by - {post?.user?.name}
      </div>
    </div>
  );
};
