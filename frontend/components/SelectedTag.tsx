import { FC } from 'react';

type SelectedTagProps = {
    tag: string;
    onDelete: (tag: string) => void;
};

const SelectedTag: FC<SelectedTagProps> = ({ tag, onDelete }) => {
    return (
        <div className="bg-gray-200 rounded-md p-2 mr-2">
            <span className="mr-2">{tag}</span>
            <button onClick={() => onDelete(tag)} className="text-red-500">
                ×
            </button>
        </div>
    );
};

export default SelectedTag;
