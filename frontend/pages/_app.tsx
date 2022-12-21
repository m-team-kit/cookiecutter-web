import 'normalize.css/normalize.css';
import 'styles/skeleton.css';
import 'styles/style.css';

import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { FC, PropsWithChildren } from 'react';

const QueryClientWrapper: FC<PropsWithChildren> = ({ children }) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children} <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

const NextApp = ({ Component, pageProps }: AppProps) => {
    return (
        <QueryClientWrapper>
            <Component {...pageProps} />
        </QueryClientWrapper>
    );
};

export default NextApp;
