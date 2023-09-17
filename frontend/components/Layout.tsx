import Navbar from './Navbar';
import Footer from './Footer';
import { FC, PropsWithChildren } from 'react';
import Header from './Header';

type LayoutProps = {
    header?: boolean;
    className?: string;
};
const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, header = false, className }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {header && <Header />}
            <div className="container mx-auto flex-grow">
                <main className={className}>{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
