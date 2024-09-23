import { type FC } from 'react';

import styles from './Footer.module.scss';
import Link from 'next/link';

const Footer: FC = () => (
    <footer className="footer flex items-center justify-center">
        <div className="container flex flex-wrap items-center justify-center">
            <div className="flex w-full content-center items-center justify-center md:w-1/3 xl:w-1/4">
                <img
                    src="/images/funded_by_eu.png"
                    alt="european commission logo"
                    className="my-4 mr-3"
                />
            </div>
            <div className="text-center md:w-1/2 xl:w-1/4">
                This Service is provided by KIT, co-funded by the{' '}
                <a href="https://ai4eosc.eu/" rel="noreferrer">
                    AI4EOSC project
                </a>
                .
            </div>
            <div className="flex h-full w-full items-center md:w-1/3 xl:w-1/4">
                <ul className={styles['legals']}>
                    <li>
                        <a href="https://www.scc.kit.edu/en/legals.php" title="Documentation">
                            Legals
                        </a>
                    </li>
                    <li>
                        <Link href="/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link href="/aupolicy">Acceptable Use Policy</Link>
                    </li>
                </ul>
            </div>
            <div className="flex w-full items-center justify-center md:w-1/3 xl:w-1/4">
                <a href="https://ai4eosc.eu/" rel="noreferrer">
                    <img
                        className="logo"
                        //src="/images/logo-deep-solid-white.png"
                        src="/images/ai4eosc-white-no-bg.svg"
                        alt="ai4eosc logo"
                    />
                </a>
            </div>
        </div>
    </footer>
);

export default Footer;
