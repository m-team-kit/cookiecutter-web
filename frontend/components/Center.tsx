import { CSSProperties, FC, PropsWithChildren } from 'react';

type CenterProps = {
    style?: CSSProperties;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
};
const Center: FC<PropsWithChildren<CenterProps>> = ({ children, style, className, as }) => {
    const Component = as || 'div';
    return (
        <Component
            style={{
                ...style,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            {...(className && { className })}
        >
            {children}
        </Component>
    );
};

export default Center;
