import { FC } from 'react';
import clsx from 'clsx';
import { CutterField } from 'lib/client';

type TextInputProps = {
    field: CutterField;
    flagged?: boolean;
    className?: string;
};
const TextInput: FC<TextInputProps> = ({ field, flagged = false, className }) => {
    return (
        <input
            className={clsx('input', flagged && 'border-warning', className)}
            type="text"
            name={field.name}
            id={field.name}
            // TODO: type assertion due to api typing not being good enough
            placeholder={field.default as string}
        />
    );
};

export default TextInput;
