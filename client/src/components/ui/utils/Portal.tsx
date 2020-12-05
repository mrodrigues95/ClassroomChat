import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  if (!ref.current) {
    ref.current = document.createElement('div');
  }

  useEffect(() => {
    document.body.appendChild(ref.current!);
    return () => {
      document.body.removeChild(ref.current!);
    };
  }, []);

  return createPortal(children, ref.current);
};

export default Portal;
