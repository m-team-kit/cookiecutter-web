import { type FC } from 'react';
import SelectedTag from 'components/SelectedTag';
import clsx from 'clsx';

type SelectedTagsProps = {
    className?: string;
    tags: string[];
    onDelete: (tag: string) => void;
};
const SelectedTags: FC<SelectedTagsProps> = ({ className, tags, onDelete }) => (
    <div className={clsx('xs:hidden mb-2 ml-2 flex flex-row flex-wrap gap-1 md:block', className)}>
        {tags.map((tag) => (
            <SelectedTag key={tag} tag={tag} onDelete={(t) => onDelete(t)} />
        ))}
    </div>
);

export default SelectedTags;
