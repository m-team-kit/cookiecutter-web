import { FC } from 'react';
import clsx from 'clsx';
import { CutterField } from 'lib/client';

type SelectInputProps = {
    field: CutterField;
    flagged?: boolean;
    className?: string;
};
const SelectInput: FC<SelectInputProps> = ({ field, flagged = false, className }) => {
    return (
        <select
            name={field.name}
            id={field.name}
            className={clsx('selectpicker form-control', flagged && 'border-warning', className)}
        >
            {field.options?.map((option) => (
                <option value={option.name} key={option.name}>
                    {option.prompt ?? option.name}
                </option>
            ))}
        </select>
    );
};

export default SelectInput;
