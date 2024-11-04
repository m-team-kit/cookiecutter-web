import { BLANK_FIELD } from 'lib/template';
import { type FC } from 'react';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import { type CutterField } from 'lib/client';
import CheckboxInput from 'components/template/CheckboxInput';
import TemplateGenerationError from 'components/TemplateGenerationError';
import ClickableLinks from 'components/ClickableLinks';

type FormFieldProps = { field: CutterField; flagged: boolean };
const Formfield: FC<FormFieldProps> = ({ field, flagged }) => (
    <div className={field.default === BLANK_FIELD ? '-mb-3' : ''}>
        {field.default === BLANK_FIELD && <ClickableLinks text={field.prompt ?? field.name} />}
        {field.default !== BLANK_FIELD &&
            (field.type === 'text' ? (
                <TextInput field={field} flagged={flagged} className="mt-1" />
            ) : field.type === 'select' ? (
                <SelectInput field={field} flagged={flagged} className="mt-1" />
            ) : field.type === 'checkbox' ? (
                <CheckboxInput field={field} className="mt-1" />
            ) : (
                <TemplateGenerationError error={`Unknown field type ${field.type}`} />
            ))}
    </div>
);

type FormProps = {
    fields: CutterField[];
    flaggedFields: string[];
};

// TODO: better handling of StringField and SelectField typing
export const Form: FC<FormProps> = ({ fields, flaggedFields }) => (
    <div className="mt-3 flex flex-col gap-3">
        {fields.map((field) => (
            <Formfield
                field={field}
                flagged={flaggedFields.includes(field.name)}
                key={field.name}
            />
        ))}
    </div>
);

export default Form;
