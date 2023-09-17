import { FC } from 'react';
import clsx from 'clsx';
import { CutterField } from 'lib/client';

type CheckboxInput = {
    field: CutterField;
    flagged?: boolean;
    className?: string;
};
const CheckboxInput: FC<CheckboxInput> = ({ field, flagged = false, className }) => {
    return (
        <div>
            <input
                className={clsx(
                    'rounded input mt-0 mb-1 mr-2',
                    flagged && 'border-warning',
                    className
                )}
                type="checkbox"
                name={field.name}
                id={field.name}
                // TODO: type assertion due to api typing not being good enough
                defaultChecked={field.default as boolean}
            />
            <label htmlFor={field.name}>{field.prompt ?? field.name}</label>
        </div>
    );
};

export default CheckboxInput;
