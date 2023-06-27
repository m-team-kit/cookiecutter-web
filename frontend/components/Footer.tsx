import { FC } from 'react';

import styles from './Footer.module.scss';
import Link from 'next/link';

const Footer: FC = () => {
    return (
        <footer id="contentinfo" className="body">
            <div className="footer">
                <div className="container" style={{ maxWidth: '1600px' }}>
                    <div
                        className="row"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            className="two columns"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <img src="images/ec-logo.png" alt="european commisison logo" />
                        </div>
                        <div className="four columns">
                            This Service is powered by the AI4OS software, provided by KIT,
                            supported by the AI4EOSC project with funding from the European Union’s
                            Horizon Europe research and innovation programme under grant agreement
                            No. 101058593.
                        </div>
                        <div
                            className="four columns"
                            style={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <ul className={styles['legals']}>
                                <li>
                                    <a
                                        href="https://www.scc.kit.edu/en/legals.php"
                                        title="Documentation"
                                    >
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
                        <div
                            className="two columns"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <img
                                className="logo"
                                //src="/images/logo-deep-solid-white.png"
                                src="/images/ai4eosc-white-no-bg.svg"
                                alt="ai4eosc logo"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
