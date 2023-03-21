import { SelectField } from '../lib/template';
import { FC } from 'react';
import clsx from 'clsx';

type SelectInputProps = {
    field: SelectField;
    flagged?: boolean;
};
const SelectInput: FC<SelectInputProps> = ({ field, flagged = false }) => {
    return (
        <select
            name={field.key}
            id={field.key}
            className={clsx('selectpicker form-control', flagged && 'border-warning')}
        >
            {field.default.map((option) => (
                <option value={option} key={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default SelectInput;
