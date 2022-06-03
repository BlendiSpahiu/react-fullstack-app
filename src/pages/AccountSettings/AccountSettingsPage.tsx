import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import { AppLayout } from '../../components/templates';
import { AccountLayout } from '../../components/templates/Layout/AccountLayout';

export const AccountsSettingsPage = (): ReactElement => (
  <AppLayout
    content={
      <AccountLayout>
        <Outlet />
      </AccountLayout>
    }
  />
);
