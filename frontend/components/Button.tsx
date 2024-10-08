import { type ComponentProps, forwardRef } from 'react';
import clsx from 'clsx';

type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
    className?: string;
};
const Button = forwardRef<HTMLButtonElement, ComponentProps<'button'> & ButtonProps>(
    ({ children, variant = 'primary', className, ...props }, ref) => {
        let color = 'bg-blue-400 hover:bg-blue-600';
        switch (variant) {
            case 'secondary':
                color = 'bg-gray-400 hover:bg-gray-600';
                break;
            case 'success':
                color = 'bg-green-400 hover:bg-green-600';
                break;
            case 'danger':
                color = 'bg-red-400 hover:bg-red-600';
                break;
            case 'warning':
                color = 'bg-yellow-400 hover:bg-yellow-600 text-black';
                break;
        }

        return (
            <button
                className={clsx(
                    color,
                    'rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-800',
                    className
                )}
                {...props}
                ref={ref}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
