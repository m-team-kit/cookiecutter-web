import { BLANK_FIELD, LegalField, SelectField, StringField } from 'lib/template';
import React, { FC } from 'react';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import Badge from 'components/Badge';
import { CutterField } from 'lib/client';
import CheckboxInput from 'components/template/CheckboxInput';
import ErrorBox from 'components/ErrorBox';

type FormFieldProps = { field: CutterField; flagged: boolean };
const Formfield: FC<FormFieldProps> = ({ field, flagged }) => {
    return (
        <div className={field.default === BLANK_FIELD ? '-mb-3' : ''}>
            {field.default === BLANK_FIELD && <div>{field.prompt ?? field.name}</div>}
            {field.default != BLANK_FIELD && (
                <>
                    <label htmlFor={field.name}>{field.prompt ?? field.name}</label>{' '}
                    {flagged && <Badge type="warning">Missing</Badge>}
                    {field.type === 'text' ? (
                        <TextInput field={field} flagged={flagged} className="mt-1" />
                    ) : field.type === 'select' ? (
                        <SelectInput field={field} flagged={flagged} className="mt-1" />
                    ) : field.type === 'checkbox' ? (
                        <CheckboxInput field={field} className="mt-1" />
                    ) : (
                        <ErrorBox error={`Unknown field type ${field.type}`} />
                    )}
                </>
            )}
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
