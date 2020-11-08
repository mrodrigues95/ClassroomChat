import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Layout from './components/Layout';
import useAuth, { AuthContext } from './shared/hooks/useAuth';

const App = () => {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <AuthContext.Provider value={auth}>
        <Layout>
          <Routes>
            <Route path="/auth/*" element={<Auth />} />
          </Routes>
        </Layout>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
