// react
import { FC, ReactElement } from 'react';

// className
import clsx from 'clsx';

// types
import { LoaderProps } from './Loader.props';

export const Loader: FC<LoaderProps> = ({
  loaderSize = 'base',
  className = 'h-screen',
  ...rest
}): ReactElement => (
  <div
    className={clsx(
      'left-0 top-0 absolute flex justify-center items-center w-full',
      className
    )}
    {...rest}
  >
    <div className="w-12 h-12 m-0 bg-transparent border-t-2 border-r-2 border-indigo-600 border-solid rounded-full animate-spin" />
  </div>
);
