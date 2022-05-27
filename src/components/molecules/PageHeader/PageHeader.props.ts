import { ReactNode } from 'react';

export interface PageHeaderProps {
  icon?: ReactNode;
  count: number;
  hasData: boolean;
  title: string;
  emptyStateTitle: string;
  emptyStateDescription: string;
  emptyStateButtonLabel: string;
  onClick: () => void;
}
