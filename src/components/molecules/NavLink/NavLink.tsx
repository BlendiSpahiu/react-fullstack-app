import clsx from 'clsx';
import { ReactElement } from 'react';
import { NavLink as Link, useLocation } from 'react-router-dom';
import { NavLinkProps } from './NavLink.props';

export const NavLink = ({
  to,
  children,
  className,
}: NavLinkProps): ReactElement => {
  // hooks
  const { pathname } = useLocation();

  return (
    <Link
      to={to}
      className={clsx(to === pathname && 'bg-indigo-400 rounded-xl', className)}
    >
      {children}
    </Link>
  );
};
