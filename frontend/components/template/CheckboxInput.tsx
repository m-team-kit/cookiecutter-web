import { FC } from 'react';
import clsx from 'clsx';
import { CutterField } from 'lib/client';

type CheckboxInput = {
    field: CutterField;
    flagged?: boolean;
    className?: string;

    truthy?: string | boolean;
    falsy?: string | boolean;
};
const CheckboxInput: FC<CheckboxInput> = ({
    field,
    flagged = false,
    className,
    truthy = true,
    falsy = false,
}) => {
    const classes = clsx('rounded input mt-0 mb-2 mr-2', flagged && 'border-warning', className);

    return (
        <div>
            <input type="hidden" name={field.name} value={falsy.toString()} />
            <input
                className={classes}
                type="checkbox"
                name={field.name}
                id={field.name}
                defaultChecked={field.default === truthy}
                value={truthy.toString()}
            />
            <label htmlFor={field.name}>{field.prompt ?? field.name}</label>
        </div>
    );
};

export default CheckboxInput;
