import { ReactElement } from 'react';
import { Posts } from '@organisms';
import { AppLayout } from '@templates';

export const PostsPage = (): ReactElement => <AppLayout content={<Posts />} />;
