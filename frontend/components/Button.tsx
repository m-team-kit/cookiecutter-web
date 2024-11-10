import { type ComponentProps, forwardRef } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
const styling = (variant: Variant) => {
    let color = 'bg-blue-600 hover:bg-blue-800 text-white';
    switch (variant) {
        case 'secondary':
            color = 'bg-gray-400 hover:bg-gray-600 text-white';
            break;
        case 'success':
            color = 'bg-green-400 hover:bg-green-600 text-white';
            break;
        case 'danger':
            color = 'bg-red-400 hover:bg-red-600 text-white';
            break;
        case 'warning':
            color = 'bg-yellow-400 hover:bg-yellow-600 text-black';
            break;
    }

    return [color, 'rounded px-4 py-2 font-bold'];
};

type ButtonProps = {
    variant?: Variant;
    className?: string;
};
const Button = forwardRef<HTMLButtonElement, ComponentProps<'button'> & ButtonProps>(
    ({ children, variant = 'primary', className, ...props }, ref) => (
        <button className={clsx(...styling(variant), className)} {...props} ref={ref}>
            {children}
        </button>
    )
);
Button.displayName = 'Button';

// seperate classes because typing for generic 'as' with forwardRef is difficult
type ButtonLinkProps = {
    variant?: Variant;
    className?: string;
    href: string;
};
export const ButtonLink = forwardRef<HTMLAnchorElement, ComponentProps<'a'> & ButtonLinkProps>(
    ({ children, variant = 'primary', className, href, ...props }, ref) => (
        <a href={href} className={clsx(...styling(variant), className)} {...props} ref={ref}>
            {children}
        </a>
    )
);
ButtonLink.displayName = 'ButtonLink';

export default Button;
