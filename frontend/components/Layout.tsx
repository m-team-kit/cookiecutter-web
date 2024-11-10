import Navbar from './Navbar';
import Footer from './Footer';
import { type FC, type PropsWithChildren } from 'react';

type LayoutProps = {
    className?: string;
};
const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, className }) => (
    <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="bg-white">
            <div className="container mx-auto grow">
                <main className={className}>{children}</main>
            </div>
        </div>
        <Footer />
    </div>
);

export default Layout;
