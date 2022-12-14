import { FC } from 'react';
import { StringField } from '../lib/template';

type TextInputProps = {
    field: StringField;
};
const TextInput: FC<TextInputProps> = ({ field }) => {
    return (
        <>
            <input className="input" type="text" name={field.key} placeholder={field.default} />
        </>
    );
};

export default TextInput;
