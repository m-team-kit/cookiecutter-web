import Navbar from './Navbar';
import Footer from './Footer';
import { type FC, type PropsWithChildren } from 'react';
import clsx from 'clsx';

type LayoutProps = {
    className?: string;
};
const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, className }) => (
    <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="container mx-auto grow">
            <main className={clsx('mt-32', className)}>{children}</main>
        </div>
        <Footer />
    </div>
);

export default Layout;
