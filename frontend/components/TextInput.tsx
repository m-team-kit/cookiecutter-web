import { FC } from 'react';
import { StringField } from '../lib/template';
import clsx from 'clsx';

type TextInputProps = {
    field: StringField;
    flagged?: boolean;
};
const TextInput: FC<TextInputProps> = ({ field, flagged = false }) => {
    return (
        <input
            className={clsx('input', flagged && 'border-warning')}
            type="text"
            name={field.key}
            id={field.key}
            placeholder={field.default}
        />
    );
};

export default TextInput;
