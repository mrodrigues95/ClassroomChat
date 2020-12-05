import React, { useState } from 'react';
import clsx from 'clsx';
import { Direction } from '../../shared/constants/common';
import getTooltipStyle from './utils/getTooltipStyle';

const TooltipArrow = ({ direction }: { direction: Direction }) => {
  const { position } = getTooltipStyle(direction, true);

  return (
    <div
      className={clsx(
        'absolute z-50 h-2 w-2 bg-black transform rotate-45 mt-2',
        position
      )}
    />
  );
};

const TooltipWrapper = ({
  message,
  direction,
}: {
  message: string;
  direction: Direction;
}) => {
  const { position, margin } = getTooltipStyle(direction, false);

  return (
    <div
      className={clsx(
        'absolute z-50 flex items-center justify-center px-2 py-1 font-medium whitespace-no-wrap bg-black text-white text-xs rounded-md',
        position,
        margin
      )}
      aria-hidden="true"
      role="tooltip"
    >
      <TooltipArrow direction={direction} />
      {message}
    </div>
  );
};

type Props = {
  message: string;
  direction: Direction;
  delay?: number;
  children: React.ReactNode;
};

const Tooltip = ({ message, direction, delay, children }: Props) => {
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState(false);

  const showTooltip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 0);
  };

  const hideTooltip = () => {
    clearTimeout(timeout);
    setActive(false);
  };

  // TODO: Maybe this should be in a portal?
  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
        {active && <TooltipWrapper message={message} direction={direction} />}
      {children}
    </div>
  );
};

export default Tooltip;
