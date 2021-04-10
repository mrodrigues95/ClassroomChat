import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { ChevronIcon } from '../../../assets/icons';
import { Direction } from '../../../constants/common';
import LinkOrButton from '../LinkOrButton';

type IconSize = 'small' | 'medium' | 'large';

type Props = {
  to?: string;
  direction?: Direction;
  border?: boolean;
  size?: IconSize;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const NavigationButton = ({
  to,
  direction = 'left',
  border = false,
  size = 'small',
  className,
  ...props
}: Props) => {
  let iconSize = '';

  switch (size) {
    case 'small':
      iconSize = 'h-4 w-4';
      break;
    case 'medium':
      iconSize = 'h-5 w-5';
      break;
    case 'large':
      iconSize = 'h-6 w-6';
      break;
  }

  return (
    <LinkOrButton
      to={to}
      className={clsx(
        'flex-grow-0 inline-flex items-center p-3 rounded-full focus:outline-none hover:bg-gray-100 active:bg-gray-200 transition duration-150 ease-in-out',
        border &&
          'border border-gray-200 hover:border-gray-400 active:border-gray-500',
        className
      )}
      {...props}
    >
      {direction === 'right' ? (
        <ChevronIcon className={clsx('transform rotate-180', iconSize)} />
      ) : (
        <ChevronIcon className={iconSize} />
      )}
    </LinkOrButton>
  );
};

export default NavigationButton;
