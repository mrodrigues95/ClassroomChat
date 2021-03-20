import React, { MutableRefObject, useRef } from 'react';
import useIntersectionObserver from '../../shared/hooks/useIntersectionObserver';

type Props = {
  onIntersect: () => void;
  isFetching: boolean;
  enabled: boolean;
  rootRef?: MutableRefObject<HTMLElement | null>;
};

// TODO: Create skeleton component to use as a loading indicator.
const InfiniteScrolling = ({
  rootRef,
  onIntersect,
  enabled = false,
}: Props) => {
  const targetRef = useRef<HTMLSpanElement>(null);

  useIntersectionObserver({
    root: rootRef,
    target: targetRef,
    onIntersect: onIntersect,
    enabled: enabled,
  });

  return <span ref={targetRef} aria-hidden="true" />;
};

export default InfiniteScrolling;
