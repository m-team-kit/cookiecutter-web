import { FC } from 'react';
import clsx from 'clsx';
import { CutterField } from 'lib/client';
import Badge from 'components/Badge';

type TextInputProps = {
    field: CutterField;
    flagged?: boolean;
    className?: string;
};
const TextInput: FC<TextInputProps> = ({ field, flagged = false, className }) => {
    return (
        <>
            <label htmlFor={field.name}>{field.prompt ?? field.name}</label>{' '}
            {flagged && <Badge type="warning">Missing</Badge>}
            <input
                className={clsx('rounded input', flagged && 'border-warning', className)}
                type="text"
                name={field.name}
                id={field.name}
                // TODO: type assertion due to api typing not being good enough
                placeholder={field.default as string}
            />
        </>
    );
};

export default TextInput;
