import Navbar from './Navbar';
import Footer from './Footer';
import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

type LayoutProps = {
    className?: string;
};
const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, className }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="container mx-auto flex-grow">
                <main className={clsx('mt-32', className)}>{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
