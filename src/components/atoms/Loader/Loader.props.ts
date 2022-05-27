import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface LoaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  fullHeight?: boolean;
  loaderSize?: 'sm' | 'base' | 'lg';
}
