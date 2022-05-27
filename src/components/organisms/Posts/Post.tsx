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
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div
          className="relative h-full mx-auto text-lg max-w-prose"
          aria-hidden="true"
        >
          <svg
            className="absolute transform translate-x-32 top-12 left-full"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
            />
          </svg>
          <svg
            className="absolute transform -translate-x-32 -translate-y-1/2 top-1/2 right-full"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
          <svg
            className="absolute transform translate-x-32 bottom-12 left-full"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="d3eb07ae-5182-43e6-857d-35c643af9034"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
            />
          </svg>
        </div>
      </div>
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
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At
            arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae
            feugiat egestas ac.
          </p>
        </div>
        <div
          className="mx-auto mt-6 prose prose-lg text-gray-500 whitespace-pre-wrap prose-indigo"
          dangerouslySetInnerHTML={{ __html: replaceURLs(post?.content || '') }}
        />
      </div>

      <div className="fixed bottom-0 left-0 p-6 text-gray-700 bg-white border border-gray-400 rounded-tr-md">
        A post by - {post?.author?.name}
      </div>
    </div>
  );
};
