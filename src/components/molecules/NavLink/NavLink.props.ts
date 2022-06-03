import { ReactNode } from 'react';

export interface NavLinkProps {
  to: string;
  children?: ReactNode;
  className?: string;
  activeClassname?: string;
}
