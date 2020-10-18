import React from 'react';

const Layout = ({ children }: { children: any }) => {
  return <div className="min-h-screen flex flex-col bg-white">{children}</div>;
};

export default Layout;
