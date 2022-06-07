import { ReactElement } from 'react';
import { Navbar } from '@organisms';
import { AppLayoutProps } from '@templates';

export const AppLayout = ({ content }: AppLayoutProps): ReactElement => (
  <>
    <Navbar />
    <main className="pb-20 mx-12 md:mx-40">{content}</main>
  </>
);
