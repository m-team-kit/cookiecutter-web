import Link from 'next/link';
import { useAuth } from 'react-oidc-context';
import { ISSUES_URL, REPOSITORY_URL } from '../lib/links';

const Navbar = () => {
    const auth = useAuth();

    return (
        <nav className="navbar flex justify-center">
            <div className="container h-full">
                <ul className="navbar-list flex">
                    <li className="navbar-item">
                        <Link className="navbar-link" href="/">
                            Home
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <a className="navbar-link" href={REPOSITORY_URL}>
                            Add Template
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a className="navbar-link" href={ISSUES_URL}>
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
