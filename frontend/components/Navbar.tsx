import Link from 'next/link';
import { useAuth } from 'react-oidc-context';

const Navbar = () => {
    const auth = useAuth();

    return (
        <nav className="navbar">
            <div className="container" style={{ maxWidth: '1600px' }}>
                <div className="row">
                    <ul className="navbar-list" style={{ display: 'flex' }}>
                        <li className="navbar-item">
                            <Link className="navbar-link" href="/">
                                Home
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <a className="navbar-link" href="https://deep-hybrid-datacloud.eu/">
                                Project page
                            </a>
                        </li>
                        <li className="navbar-item">
                            <a
                                className="navbar-link"
                                href="https://docs.deep-hybrid-datacloud.eu/"
                            >
                                Help
                            </a>
                        </li>

                        <li className="navbar-item" style={{ marginLeft: 'auto' }}>
                            {auth.isAuthenticated ? (
                                <button
                                    className="navbar-button"
                                    onClick={() => auth.signoutRedirect()}
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    className="navbar-button"
                                    onClick={() => auth.signinRedirect()}
                                >
                                    Login
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
