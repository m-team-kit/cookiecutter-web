import Navbar from './Navbar';
import Footer from './Footer';
import { FC, PropsWithChildren } from 'react';
import Header from './Header';

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>
            <Navbar />
            <Header />
            <div className="container" style={{ flexGrow: 1 }}>
                <main>{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
