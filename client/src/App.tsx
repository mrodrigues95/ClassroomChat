import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Auth from './components/Auth';
import Layout from './components/Layout';
import useAuth, { AuthContext } from './shared/hooks/auth/useAuth';
import Home from './components/Home/index';
import ProtectedRoute from './components/ProtectedRoute';
import Discussion from './components/Discussion/index';
import FourOhFour from './components/Auth/404';

const App = () => {
  const auth = useAuth();
  const queryClient = new QueryClient();

  if (auth.waitingForToken) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={auth}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Routes>
              <ProtectedRoute path="/home" element={<Home />} />
              <ProtectedRoute
                path="/discussion/:uuid"
                element={<Discussion />}
              />
              <ProtectedRoute path="/auth/*" element={<Auth />} unprotected />
              <Route path="*" element={<FourOhFour />} />
            </Routes>
          </Layout>
        </QueryClientProvider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
