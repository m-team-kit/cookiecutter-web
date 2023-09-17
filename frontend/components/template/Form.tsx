import { BLANK_FIELD, LegalField, SelectField, StringField } from 'lib/template';
import React, { FC } from 'react';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import Badge from 'components/Badge';
import { CutterField } from 'lib/client';

type FormFieldProps = { field: CutterField; flagged: boolean };
const Formfield: FC<FormFieldProps> = ({ field, flagged }) => {
    // TODO: type assertion because API schema issues
    const defaultValue = field.default as string | boolean;

    return (
        <div className={field.default === BLANK_FIELD ? '-mb-3' : ''}>
            <label htmlFor={field.name}>{field.prompt ?? field.name}</label>{' '}
            {flagged && <Badge type="warning">Missing</Badge>}
            {field.default != BLANK_FIELD &&
                (typeof defaultValue == 'string' ? (
                    <TextInput field={field} flagged={flagged} className="mt-1" />
                ) : Array.isArray(defaultValue) ? (
                    <SelectInput field={field} flagged={flagged} className="mt-1" />
                ) : undefined)}
        </div>
    );
};

type FormProps = {
    fields: CutterField[];
    flaggedFields: string[];
};

export const Form: FC<FormProps> = ({ fields, flaggedFields }) => {
    // TODO: better handling of StringField and SelectField typing
    return (
        <div className="flex gap-3 flex-col mt-3">
            {fields.map((field) => (
                <Formfield
                    field={field}
                    flagged={flaggedFields.includes(field.name)}
                    key={field.name}
                />
            ))}
        </div>
    );
};

export default Form;
