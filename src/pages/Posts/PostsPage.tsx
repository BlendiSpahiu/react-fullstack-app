import { ReactElement } from 'react';
import { Posts } from '../../components/organisms/Posts/Posts';
import { AppLayout } from '../../components/templates';

export const PostsPage = (): ReactElement => <AppLayout content={<Posts />} />;
