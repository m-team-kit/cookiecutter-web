import { BLANK_FIELD, LegalField, SelectField, StringField } from '../lib/template';
import { FC } from 'react';
import SelectInput from './SelectInput';
import TextInput from './TextInput';

type FormProps = {
    fields: LegalField[];
};
export const Form: FC<FormProps> = ({ fields }) => {
    // TODO: better handling of StringField and SelectField typing
    return (
        <>
            {fields.map((field) => (
                <div key={field.key}>
                    <label htmlFor="">{field.description ?? field.key}</label>
                    {field.default != BLANK_FIELD &&
                        (typeof field.default == 'string' ? (
                            <TextInput field={field as StringField} />
                        ) : Array.isArray(field.default) ? (
                            <SelectInput field={field as SelectField} />
                        ) : undefined)}
                </div>
            ))}
        </>
    );
};

export default Form;
