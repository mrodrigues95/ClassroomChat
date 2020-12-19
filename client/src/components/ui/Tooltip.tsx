import React, { useState } from 'react';
import { Placement } from '@popperjs/core';
import usePopper from './../../shared/hooks/usePopper';
import Portal from './utils/Portal';

type Props = {
  message: string;
  placement: Placement;
  delay?: number;
  children: React.ReactNode;
};

const Tooltip = ({ message, placement, delay, children }: Props) => {
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState(false);
  const [trigger, container] = usePopper({
    placement: placement,
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  });

  const showTooltip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 0);
  };

  const hideTooltip = () => {
    clearTimeout(timeout);
    setActive(false);
  };

  return (
    <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip} ref={trigger}>
      {active && (
        <Portal>
          <div
            id="tooltip"
            className="flex items-center justify-center px-2 py-1 font-medium whitespace-no-wrap bg-black text-white text-xs rounded-md"
            ref={container}
          >
            <div id="arrow" data-popper-arrow></div>
            <span id="tooltip-label" role="tooltip">
              {message}
            </span>
          </div>
        </Portal>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
