import { FC } from 'react';

const Footer: FC = () => {
    return (
        <footer id="contentinfo" className="body">
            <div className="footer">
                <div className="container" style={{ maxWidth: '1600px' }}>
                    <div className="row">
                        <div className="one column">
                            <img src="images/ec-logo.png" />
                        </div>
                        <div className="four columns">
                            This project has received funding from the European Union’s Horizon 2020
                            research and innovation programme under grant agreement No 777435.
                        </div>
                        <div className="four columns">
                            <ul className="">
                                <li>
                                    <a
                                        href="https://docs.deep-hybrid-datacloud.eu"
                                        title="Documentation"
                                    >
                                        <span className="fas fa-book"></span>
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/deephdc/" title="Github Profile">
                                        <span className="fab fa-github"></span>
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://hub.docker.com/u/deephdc/"
                                        title="DockerHub organization"
                                    >
                                        <span className="fab fa-docker"></span>
                                        DockerHub
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/DEEP_eu" title="Twitter Profile">
                                        <span className="fab fa-twitter"></span>
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.researchgate.net/project/DEEP-Hybrid-DataCloud"
                                        title="ResearchGate Project page"
                                    >
                                        <span className="fab fa-researchgate"></span>
                                        ResearchGate
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="one column">
                            <img className="logo" src="/images/logo-deep-solid-white.png" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
