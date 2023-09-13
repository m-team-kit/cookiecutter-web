import { SelectField } from '../lib/template';
import { FC } from 'react';
import clsx from 'clsx';

type SelectInputProps = {
    field: SelectField;
    flagged?: boolean;
    className?: string;
};
const SelectInput: FC<SelectInputProps> = ({ field, flagged = false, className }) => {
    return (
        <select
            name={field.key}
            id={field.key}
            className={clsx('selectpicker form-control', flagged && 'border-warning', className)}
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
