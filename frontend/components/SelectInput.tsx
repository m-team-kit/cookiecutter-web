import { SelectField } from '../lib/template';
import { FC } from 'react';

type SelectInputProps = {
    field: SelectField;
};
const SelectInput: FC<SelectInputProps> = ({ field }) => {
    return (
        <>
            <select name={field.key} className="selectpicker form-control">
                {field.default.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </>
    );
};

export default SelectInput;
