import Link from 'next/link';
import { useAuth } from 'react-oidc-context';

const Navbar = () => {
    const auth = useAuth();

    return (
        <nav className="navbar flex justify-center">
            <div className="container">
                <ul className="navbar-list flex">
                    <li className="navbar-item">
                        <Link className="navbar-link" href="/">
                            Home
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <a
                            className="navbar-link"
                            href="https://github.com/m-team-kit/templates-hub"
                        >
                            Add Template
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a
                            className="navbar-link"
                            href="https://github.com/m-team-kit/templates-hub/issues"
                        >
                            Support
                        </a>
                    </li>
                    <li className="navbar-item ml-auto">
                        {auth.isAuthenticated ? (
                            <button
                                className="navbar-button"
                                onClick={() => auth.signoutRedirect()}
                            >
                                Logout
                            </button>
                        ) : (
                            <button className="navbar-button" onClick={() => auth.signinRedirect()}>
                                Login
                            </button>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
