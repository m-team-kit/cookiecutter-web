import { type FC } from 'react';
import clsx from 'clsx';
import { type CutterField } from 'lib/client';
import CheckboxInput from 'components/template/CheckboxInput';
import { attemptDetermineYesNoOptions } from 'components/template/yesOrNo';
import Badge from 'components/Badge';
import ClickableLinks from 'components/ClickableLinks';

type SelectInputProps = {
    field: CutterField;
    flagged?: boolean;
    className?: string;
};
const SelectInput: FC<SelectInputProps> = ({ field, flagged = false, className }) => {
    const yesNoOptions = field.options != null && attemptDetermineYesNoOptions(field.options);

    if (yesNoOptions !== false) {
        return (
            <CheckboxInput
                field={field}
                className="mt-1"
                truthy={yesNoOptions.truthy}
                falsy={yesNoOptions.falsy}
            />
        );
    }

    return (
        <>
            <label htmlFor={field.name}>
                <ClickableLinks text={field.prompt ?? field.name} />
            </label>{' '}
            {flagged && <Badge type="warning">Missing</Badge>}
            <select
                name={field.name}
                id={field.name}
                className={clsx('rounded', flagged && 'border-warning', className)}
            >
                {field.options?.map((option) => (
                    <option value={option.name} key={option.name}>
                        {option.prompt ?? option.name}
                    </option>
                ))}
            </select>
        </>
    );
};

export default SelectInput;
