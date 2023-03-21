import { BLANK_FIELD, LegalField, SelectField, StringField } from '../lib/template';
import { FC } from 'react';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import { isUsefulKey } from '../lib/form-processing';

type FormProps = {
    fields: LegalField[];
    flaggedFields: string[];
};
export const Form: FC<FormProps> = ({ fields, flaggedFields }) => {
    // TODO: better handling of StringField and SelectField typing
    return (
        <>
            {fields
                // don't display fields starting with _ or __
                .filter((f) => isUsefulKey(f.key))
                .map((field) => (
                    <div key={field.key}>
                        <label htmlFor={field.key}>{field.description ?? field.key}</label>
                        {field.default != BLANK_FIELD &&
                            (typeof field.default == 'string' ? (
                                <TextInput
                                    field={field as StringField}
                                    flagged={flaggedFields.includes(field.key)}
                                />
                            ) : Array.isArray(field.default) ? (
                                <SelectInput
                                    field={field as SelectField}
                                    flagged={flaggedFields.includes(field.key)}
                                />
                            ) : undefined)}
                    </div>
                ))}
        </>
    );
};

export default Form;
