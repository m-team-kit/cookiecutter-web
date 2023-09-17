import { FC } from 'react';

import styles from './Footer.module.scss';
import Link from 'next/link';

const Footer: FC = () => {
    return (
        <footer className="footer flex items-center justify-center">
            <div className="container flex items-center justify-center flex-wrap">
                <div className="flex items-center w-full xl:w-[33%]">
                    <img
                        src="/images/ec-logo.png"
                        alt="european commission logo"
                        className="mr-3"
                    />
                    <span>
                        This Service is powered by the AI4OS software, provided by KIT, co-funded by
                        the{' '}
                        <a href="https://ai4eosc.eu/" rel="noreferrer">
                            AI4EOSC project
                        </a>
                        .
                    </span>
                </div>
                <div className="h-full flex items-center w-full xl:w-[33%]">
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
                <div className="flex items-center justify-center w-full xl:w-[33%]">
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
};

export default Footer;
