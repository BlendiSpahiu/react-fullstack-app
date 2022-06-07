import { ReactElement, ReactNode } from 'react';
import { Settings } from '@organisms';

export const AccountLayout = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => <Settings children={children} />;
