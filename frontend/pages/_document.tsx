import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    href="images/ai4-dark.svg"
                    rel="icon"
                    media="(prefers-color-scheme: light)"
                    type="image/svg+xml"
                />
                <link
                    href="images/ai4-dark.svg"
                    rel="icon"
                    media="(prefers-color-scheme: light)"
                    type="image/png"
                />
                <link
                    href="images/ai4-white.png"
                    rel="icon"
                    media="(prefers-color-scheme: dark)"
                    type="image/svg+xml"
                />
                <link
                    href="images/ai4-white.png"
                    rel="icon"
                    media="(prefers-color-scheme: dark)"
                    type="image/png"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
