import { ReactElement } from 'react';
import { Home } from '@organisms';
import { AppLayout } from '@templates';

export const HomePage = (): ReactElement => <AppLayout content={<Home />} />;
