import { ReactElement, ReactNode } from 'react';
import { Settings } from '../../organisms/AccountSettings/Settings';

export const AccountLayout = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => <Settings children={children} />;
