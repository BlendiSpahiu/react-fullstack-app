import { ReactElement } from 'react';
import { Post } from '@organisms';
import { AppLayout } from '@templates';

export const PostPage = (): ReactElement => <AppLayout content={<Post />} />;
