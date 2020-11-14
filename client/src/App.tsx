import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Layout from './components/Layout';
import useAuth, { AuthContext } from './shared/hooks/useAuth';
import Home from './components/Home/index';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <AuthContext.Provider value={auth}>
        <Layout>
          <Routes>
            <ProtectedRoute path="/home" element={<Home />} />
            <Route path="/auth/*" element={<Auth />} />
          </Routes>
        </Layout>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
