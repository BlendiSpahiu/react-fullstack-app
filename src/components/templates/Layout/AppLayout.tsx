import { ReactElement } from 'react';
import { Navbar } from '../../organisms/Navbar/Navbar';
import { AppLayoutProps } from './AppLayout.props';

export const AppLayout = ({ content }: AppLayoutProps): ReactElement => (
  <>
    <Navbar />
    <main className="mx-12 md:mx-40">{content}</main>
  </>
);
