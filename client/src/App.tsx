import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Layout from './components/Layout';
import useAuth, { AuthContext } from './shared/hooks/useAuth';
import Home from './components/Home/index';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const auth = useAuth();

  if (auth.waitingForToken) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={auth}>
        <Layout>
          <Routes>
            <ProtectedRoute path="/home" element={<Home />} />
            <ProtectedRoute path="/auth/*" element={<Auth />} unprotected />
          </Routes>
        </Layout>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
