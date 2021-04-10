import { forwardRef, HTMLAttributes } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import LinkOrButton from '../LinkOrButton';

type Props = {
  to?: string;
  classroomMenuButton?: boolean;
  icon: React.ReactElement;
  label: string;
} & HTMLAttributes<HTMLAnchorElement | HTMLButtonElement>;

export const VerticalNavItem = forwardRef<HTMLButtonElement, Props>(
  ({ to, classroomMenuButton = false, icon, label, ...props }, ref) => {
    const router = useRouter();
    const toLocation = to || '/_';

    let selected = false;

    // Set the classrooms menu button to a selected state if the user
    // is viewing a discussion.
    if (classroomMenuButton && !to) {
      selected = router.pathname.includes('/discussion/');
    } else {
      selected = router.pathname === toLocation;
    }

    return (
      <LinkOrButton to={to} selected={selected} ref={ref} {...props}>
        <span
          className={clsx(
            'mx-auto xl:mx-0',
            selected ? 'text-white' : 'text-gray-900'
          )}
        >
          {icon}
        </span>
        <span className="hidden xl:inline-block">{label}</span>
      </LinkOrButton>
    );
  }
);

const VerticalNav = ({ children }: { children: React.ReactNode }) => {
  return <nav className="flex flex-col w-full space-y-3">{children}</nav>;
};

export default VerticalNav;
