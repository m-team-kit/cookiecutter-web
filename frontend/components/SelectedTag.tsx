import { type FC } from 'react';

type SelectedTagProps = {
    tag: string;
    onDelete: (tag: string) => void;
};

const SelectedTag: FC<SelectedTagProps> = ({ tag, onDelete }) => (
    <div className="mr-2 rounded-md bg-gray-200 p-2">
        <span className="mr-2">{tag}</span>
        <button onClick={() => onDelete(tag)} className="text-red-500">
            ×
        </button>
    </div>
);

export default SelectedTag;
