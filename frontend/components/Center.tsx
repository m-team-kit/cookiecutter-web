import { type FC, type PropsWithChildren } from 'react';
import clsx from 'clsx';

type CenterProps = {
    className?: string;
    as?: keyof JSX.IntrinsicElements;
};
const Center: FC<PropsWithChildren<CenterProps>> = ({ children, className, as }) => {
    const Component = as || 'div';
    return (
        <Component className={clsx(className, 'flex items-center justify-center')}>
            {children}
        </Component>
    );
};

export default Center;
