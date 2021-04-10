import { MutableRefObject, useEffect } from 'react';

type Props = {
  root?: MutableRefObject<HTMLElement | null>;
  target: MutableRefObject<HTMLElement | null>;
  onIntersect: () => void;
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
};

const useIntersectionObserver = ({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true,
}: Props) => {
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        // Note: May need to change this if we end up memoizing the onIntersect cb.
        // If so, then you need to check for the .current in the parent component.
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;
    if (!el) return;

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [target, enabled, root, rootMargin, threshold, onIntersect]);
};

export default useIntersectionObserver;
