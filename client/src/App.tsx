import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import useAuth, { AuthContext } from './shared/hooks/auth/useAuth';
import Home from './components/Home/index';
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './components/Auth';
import Profile from './components/Profile';
import Discussion from './components/Discussion/index';
import FourOhFour from './components/Auth/404';
import Loading from './components/Loading';

const App = () => {
  const auth = useAuth();
  const queryClient = new QueryClient();

  if (auth.waitingForToken) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={auth}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <Layout>
            <Routes>
              <ProtectedRoute path="/home" element={<Home />} />
              <ProtectedRoute
                path="/discussion/:uuid"
                element={<Discussion />}
              />
              <ProtectedRoute path="/profile/*" element={<Profile />} />
              <ProtectedRoute path="/auth/*" element={<Auth />} unprotected />
              <Route path="*" element={<FourOhFour />} />
            </Routes>
          </Layout>
          <Toaster toastOptions={{ className: 'font-bold' }} />
        </QueryClientProvider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
