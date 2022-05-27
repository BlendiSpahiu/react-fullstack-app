import { ReactElement } from 'react';
import { Home } from '../components/organisms/Home';
import { AppLayout } from '../components/templates';

export const HomePage = (): ReactElement => <AppLayout content={<Home />} />;
