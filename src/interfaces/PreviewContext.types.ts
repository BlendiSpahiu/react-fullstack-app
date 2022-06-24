import { PostFieldsFragment } from '@graphql/gen/graphql';
import { Nullable } from './Nullable.types';

export type PostTypes = Pick<
  PostFieldsFragment,
  'content' | 'title' | 'description' | 'imageUrl' | 'user'
>;

export interface PreviewContextProps {
  previewedPost: Nullable<PostTypes>;
  setPreviewedPost: (post: Nullable<PostTypes>) => void;
}
