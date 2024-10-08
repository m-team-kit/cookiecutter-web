import React from 'react';
import Head from 'next/head';
import { type NextPage } from 'next';

/**
 * Dummy page for oidc-redirect route.
 *
 * Once react-oidc-context is done, the user is redirected to the home page.
 *
 * @constructor
 */
const OidcRedirect: NextPage = () => (
    <>
        <Head>
            <title>Redirecting</title>
        </Head>
        <div className="container">Logging you in...</div>
    </>
);

export default OidcRedirect;
