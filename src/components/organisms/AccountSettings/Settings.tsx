import { ReactNode } from 'react';
import { SideNavigation } from './SideNavigation';

interface SettingsProps {
  children: ReactNode;
}

export const Settings = ({ children }: SettingsProps) => {
  return (
    <div className="my-32 overflow-hidden bg-white border rounded-lg shadow ">
      <div className="flex divide-gray-200">
        <SideNavigation />
        {children}
      </div>
    </div>
  );
};
