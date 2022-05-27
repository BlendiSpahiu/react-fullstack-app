import { ReactElement } from 'react';
import { Post } from '../../components/organisms/Posts/Post';
import { AppLayout } from '../../components/templates';

export const PostPage = (): ReactElement => <AppLayout content={<Post />} />;
