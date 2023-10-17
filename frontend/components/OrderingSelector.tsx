import { type ChangeEventHandler, type FC } from 'react';
import Ordering from 'lib/Ordering';

type OrderingSelectorProps = {
    onChange: (ordering: Ordering | undefined) => void;
};
const OrderingSelector: FC<OrderingSelectorProps> = ({ onChange }) => {
    const _onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        if (e.target.value.trim().length === 0) {
            onChange(undefined);
            return;
        }
        onChange(e.target.value as Ordering);
    };

    return (
        <div className="xs:w-full mb-2 flex flex-row items-center sm:w-auto">
            <label htmlFor="ordering" className="mr-2 text-lg">
                Ordering:
            </label>
            <select
                className="w-60 rounded-md disabled:opacity-50"
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
