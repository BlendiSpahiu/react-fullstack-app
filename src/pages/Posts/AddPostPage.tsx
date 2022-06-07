import { ReactElement } from 'react';
import { AddPostForm } from '@organisms';
import { AppLayout } from '@templates';

export const AddPostPage = (): ReactElement => (
  <AppLayout content={<AddPostForm />} />
);
