import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import { AppLayout, AccountLayout } from '@templates';

export const AccountsSettingsPage = (): ReactElement => (
  <AppLayout
    content={
      <AccountLayout>
        <Outlet />
      </AccountLayout>
    }
  />
);
