import React from 'react';

const Layout = ({ children }: { children: any }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex flex-1 sm:p-3 lg:p-10">{children}</div>
    </div>
  );
};

export default Layout;
