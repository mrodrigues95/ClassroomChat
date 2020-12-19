import React, { forwardRef, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  to?: string;
} & HTMLAttributes<HTMLAnchorElement | HTMLButtonElement>;

const LinkOrButton = forwardRef<HTMLButtonElement, Props>(
  ({ to, ...props }, ref) => {
    if (to) {
      return <Link to={to} {...props} />;
    }

    return <button type="button" ref={ref} {...props} />;
  }
);

export default LinkOrButton;
