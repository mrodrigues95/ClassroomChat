import { useRef } from 'react';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Toaster } from 'react-hot-toast';
import { PrimaryLayout, LoadingScreen } from '../common/components';
import { AuthContext, useAuth } from '../modules';
import '../css/styles.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<QueryClient | null>(null);
  const auth = useAuth();

  if (auth.waitingForToken) {
    return (
      <PrimaryLayout>
        <LoadingScreen />
      </PrimaryLayout>
    );
  }

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthContext.Provider value={auth}>
          <PrimaryLayout>
            <Component {...pageProps} />
          </PrimaryLayout>
        </AuthContext.Provider>
      </Hydrate>
      <Toaster toastOptions={{ className: 'font-bold' }} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default MyApp;
