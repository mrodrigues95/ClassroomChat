import { ReactNode, useState } from 'react';
import { Arrow, useLayer } from 'react-laag';
import { PlacementType } from 'react-laag/dist/PlacementType';
import ResizeObserver from 'resize-observer-polyfill';

type Props = {
  message: string;
  placement: PlacementType;
  children: ReactNode;
  delay?: number;
};

const Tooltip = ({ message, placement, delay, children }: Props) => {
  const [active, setActive] = useState(false);
  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen: active,
    placement: placement,
    triggerOffset: 15,
    ResizeObserver,
  });

  let timeout: NodeJS.Timeout;

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
    <div
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      {...triggerProps}
    >
      {children}
      {active &&
        renderLayer(
          <div
            id="cc-tooltip"
            role="tooltip"
            className="flex items-center justify-center px-2 py-1 font-medium whitespace-nowrap bg-black text-white text-xs rounded-md"
            {...layerProps}
          >
            {message}
            <Arrow size={5} backgroundColor="#000000" {...arrowProps} />
          </div>
        )}
    </div>
  );
};

export default Tooltip;
