import React, { type FC } from 'react';
import clsx from 'clsx';
import { type CutterField } from 'lib/client';
import Badge from 'components/Badge';
import ClickableLinks from 'components/ClickableLinks';

type TextInputProps = {
    field: CutterField;
    flagged?: boolean;
    className?: string;
    disabled?: boolean;
};
const TextInput: FC<TextInputProps> = ({ field, flagged = false, className, disabled = false }) => (
    <>
        <label htmlFor={field.name}>
            <ClickableLinks text={field.prompt ?? field.name} />
        </label>{' '}
        {flagged && <Badge type="warning">Missing</Badge>}
        <input
            className={clsx('input rounded', flagged && 'border-warning', className)}
            type="text"
            name={field.name}
            id={field.name}
            // TODO: type assertion due to api typing not being good enough
            placeholder={field.default as string}
            disabled={disabled}
        />
    </>
);

export default TextInput;
