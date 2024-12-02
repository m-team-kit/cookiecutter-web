import React, { type FC } from 'react';
import clsx from 'clsx';
import { type CutterField } from 'lib/client';
import ClickableLinks from 'components/ClickableLinks';

type CheckboxInput = {
    field: CutterField;
    flagged?: boolean;
    className?: string;

    truthy?: string | boolean;
    falsy?: string | boolean;

    disabled?: boolean;
};
const CheckboxInput: FC<CheckboxInput> = ({
    field,
    flagged = false,
    className,
    truthy = true,
    falsy = false,
    disabled = false,
}) => (
    <div>
        <input type="hidden" name={field.name} value={falsy.toString()} />
        <input
            className={clsx('input mb-2 mr-2 mt-0 rounded', flagged && 'border-warning', className)}
            type="checkbox"
            name={field.name}
            id={field.name}
            defaultChecked={field.default === truthy}
            value={truthy.toString()}
            disabled={disabled}
        />
        <label htmlFor={field.name}>
            <ClickableLinks text={field.prompt ?? field.name} />
        </label>
    </div>
);

export default CheckboxInput;
