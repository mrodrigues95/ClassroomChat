import { useAuth } from '../../../../modules';
import Sidebar from './Sidebar';

const Primary = ({ children }: { children: any }) => {
  const { hasUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex flex-1">
        <>
          {hasUser && <Sidebar />}
          {children}
        </>
      </div>
    </div>
  );
};

export default Primary;
