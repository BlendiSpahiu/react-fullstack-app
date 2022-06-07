import { ReactElement } from 'react';
import { AddPostForm } from '@organisms';
import { AppLayout } from '@templates';

export const EditPostPage = (): ReactElement => (
  <AppLayout content={<AddPostForm />} />
);
