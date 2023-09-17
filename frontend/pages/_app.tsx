import 'normalize.css/normalize.css';
//import 'styles/style.css';
import 'styles/screen.scss';
import 'styles/tailwind.css';
import 'styles/custom.scss';

import type { AppProps } from 'next/app';
import { FC, PropsWithChildren } from 'react';
import { AuthProvider, AuthProviderProps } from 'react-oidc-context';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const oidcConfig: AuthProviderProps = {
    authority:
        process.env.NEXT_PUBLIC_OAUTH_AUTHORITY ??
        (process.env.NODE_ENV === 'development'
            ? 'https://aai-dev.egi.eu/auth/realms/egi/'
            : 'https://aai.egi.eu/auth/realms/egi/'),
    client_id: process.env.NEXT_PUBLIC_OIDC_CLIENT_ID ?? 'ccweb',
    redirect_uri:
        (process.env.NEXT_PUBLIC_OIDC_REDIRECT_HOST ?? 'https://localhost') + '/oidc-redirect',
    //scope: 'openid email profile eduperson_entitlement offline_access',
    // reduce scope
    scope: 'openid email eduperson_entitlement offline_access',
    response_type: 'code',
};

const queryClient = new QueryClient();

const QueryClientWrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children} <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

const NextApp = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Cookiecutter-Web</title>
            </Head>
            <QueryClientWrapper>
                <AuthProvider
                    {...oidcConfig}
                    onSigninCallback={() => {
                        router.push('/');
                    }}
                >
                    <Component {...pageProps} />
                </AuthProvider>
            </QueryClientWrapper>
        </>
    );
};

export default NextApp;
