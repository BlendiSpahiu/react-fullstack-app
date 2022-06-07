import clsx from 'clsx';
import { NavLink as Link } from 'react-router-dom';
import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLinkProps } from '@molecules';

export const NavLink = ({
  to,
  children,
  className,
  activeClassname,
}: NavLinkProps): ReactElement => {
  // hooks
  const { pathname } = useLocation();

  return (
    <Link
      to={to}
      className={clsx(to === pathname && activeClassname, className)}
    >
      {children}
    </Link>
  );
};
