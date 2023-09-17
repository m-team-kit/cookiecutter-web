import { FC } from 'react';
import Center from './Center';

const Header: FC = () => {
    return (
        <section className="header center-contents">
            <div className="container">
                <div className="w-full">
                    <span className="h1">Create AI projects from templates</span>
                    <div className="flex justify-around flex-wrap ">
                        <Center>
                            <a href="https://deep-hybrid-datacloud.eu/">
                                <img
                                    src="/images/deephdc-logo.png"
                                    className="header-logo"
                                    alt="Deep Hybrid DataCloud logo"
                                    style={{
                                        height: '4rem',
                                    }}
                                />
                            </a>
                        </Center>
                        <Center>
                            <a href="https://ai4eosc.eu/">
                                <img
                                    src="/images/ai4eosc-white-no-bg.svg"
                                    alt="AI4EOSC logo"
                                    className="header-logo"
                                />
                            </a>
                        </Center>
                        <Center>
                            <a href="https://www.imagine-ai.eu/">
                                <img
                                    src="/images/logo-imagine-horizontal-white.png"
                                    className="header-logo"
                                    alt="iMagine project logo"
                                    style={{
                                        height: '3.75rem',
                                    }}
                                />
                            </a>
                        </Center>
                        <Center>
                            <a href="https://eosc.eu/">
                                <img
                                    src="/images/eosc-white-no-bg.svg"
                                    alt="EOSC logo"
                                    className="header-logo"
                                />
                            </a>
                        </Center>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;
