import { type FC, type PropsWithChildren } from 'react';
import clsx from 'clsx';

type BadgeProps = {
    type: 'warning' | 'error' | 'success' | 'info';
};
const Badge: FC<PropsWithChildren<BadgeProps>> = ({ children, type }) => {
    let colors = 'bg-red-100 text-red-800';
    switch (type) {
        case 'warning':
            colors = 'bg-yellow-100 text-yellow-800';
            break;
        case 'success':
            colors = 'bg-green-100 text-green-800';
            break;
        case 'info':
            colors = 'bg-blue-100 text-blue-800';
            break;
    }

    return (
        <span
            className={clsx(
                'inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-medium',
                colors
            )}
        >
            {children}
        </span>
    );
};

export default Badge;
