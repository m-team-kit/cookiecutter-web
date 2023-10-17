import { type FC } from 'react';
import { type StringField } from 'lib/template';
import clsx from 'clsx';

type TextInputProps = {
    field: StringField;
    flagged?: boolean;
    className?: string;
};
const TextInput: FC<TextInputProps> = ({ field, flagged = false, className }) => (
    <input
        className={clsx('input', flagged && 'border-warning', className)}
        type="text"
        name={field.key}
        id={field.key}
        placeholder={field.default}
    />
);

export default TextInput;
