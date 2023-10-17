import { BLANK_FIELD, type LegalField, type SelectField, type StringField } from 'lib/template';
import React, { type FC } from 'react';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import { isUsefulKey } from 'lib/form-processing';
import Badge from './Badge';

type FormProps = {
    fields: LegalField[];
    flaggedFields: string[];
};
// TODO: better handling of StringField and SelectField typing
export const Form: FC<FormProps> = ({ fields, flaggedFields }) => (
    <div className="mt-3 flex flex-col gap-3">
        {fields
            // don't display fields starting with _ or __
            .filter((f) => isUsefulKey(f.key))
            .map((field) => {
                const flagged = flaggedFields.includes(field.key);
                return (
                    <div key={field.key} className={field.default === BLANK_FIELD ? '-mb-3' : ''}>
                        <label htmlFor={field.key}>{field.description ?? field.key}</label>{' '}
                        {flagged && <Badge type="warning">Missing</Badge>}
                        {field.default !== BLANK_FIELD &&
                            (typeof field.default == 'string' ? (
                                <TextInput
                                    field={field as StringField}
                                    flagged={flagged}
                                    className="mt-1"
                                />
                            ) : Array.isArray(field.default) ? (
                                <SelectInput
                                    field={field as SelectField}
                                    flagged={flagged}
                                    className="mt-1"
                                />
                            ) : undefined)}
                    </div>
                );
            })}
    </div>
);

export default Form;
