import { BLANK_FIELD, LegalField, SelectField, StringField } from '../lib/template';
import React, { FC } from 'react';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import { isUsefulKey } from '../lib/form-processing';
import Badge from './Badge';

type FormProps = {
    fields: LegalField[];
    flaggedFields: string[];
};
export const Form: FC<FormProps> = ({ fields, flaggedFields }) => {
    // TODO: better handling of StringField and SelectField typing
    return (
        <div className="flex gap-3 flex-col mt-3">
            {fields
                // don't display fields starting with _ or __
                .filter((f) => isUsefulKey(f.key))
                .map((field) => {
                    const flagged = flaggedFields.includes(field.key);
                    return (
                        <div
                            key={field.key}
                            className={field.default === BLANK_FIELD ? '-mb-3' : ''}
                        >
                            <label htmlFor={field.key}>{field.description ?? field.key}</label>{' '}
                            {flagged && <Badge type="warning">Missing</Badge>}
                            {field.default != BLANK_FIELD &&
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
};

export default Form;
