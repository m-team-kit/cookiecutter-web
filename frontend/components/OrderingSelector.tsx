import { type ChangeEventHandler, type FC } from 'react';
import Ordering from 'lib/Ordering';
import clsx from 'clsx';

type OrderingSelectorProps = {
    onChange: (ordering: Ordering | undefined) => void;
    className?: string;
};
const OrderingSelector: FC<OrderingSelectorProps> = ({ onChange, className }) => {
    const _onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        if (e.target.value.trim().length === 0) {
            onChange(undefined);
            return;
        }
        onChange(e.target.value as Ordering);
    };

    return (
        <div className={clsx('mb-2 flex w-full flex-row items-center sm:w-auto', className)}>
            <label htmlFor="ordering" className="mr-2 min-w-[12ch] text-lg md:ms-auto md:min-w-fit">
                Ordering:
            </label>
            <select
                className="max-w-xs rounded-md disabled:opacity-50"
                id="ordering"
                onChange={_onChange}
            >
                <option></option>
                <option value={Ordering.TITLE_ASC}>Title Ascending</option>
                <option value={Ordering.TITLE_DES}>Title Descending</option>
                <option value={Ordering.SCORE_ASC}>Score Ascending</option>
                <option value={Ordering.SCORE_DES}>Score Descending</option>
            </select>
        </div>
    );
};

export default OrderingSelector;
