import React from 'react';
import Sidebar from './../Sidebar/index';

const Home = () => {
  return (
    <div className="flex flex-1 p-4 md:p-10">
      <Sidebar />
      <main className="flex-1 w-full">
        Test
      </main>
    </div>
  );
};

export default Home;
