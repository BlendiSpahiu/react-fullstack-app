import { ReactElement } from 'react';
import { AddPostForm } from '../../components/organisms/Posts/AddPostForm./AddPostForm';
import { AppLayout } from '../../components/templates';

export const AddPostPage = (): ReactElement => (
  <AppLayout content={<AddPostForm />} />
);
