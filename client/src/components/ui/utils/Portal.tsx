import { createPortal } from 'react-dom';
import useMounted from '../../../shared/hooks/useMounted';

const Portal = ({ children }: { children: React.ReactNode }) => {
  const mounted = useMounted();
  if (!mounted) return null;
  return createPortal(children, document.body);
};

export default Portal;
