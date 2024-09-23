import { difference } from 'lodash';
import { type FC } from 'react';
import clsx from 'clsx';

type TagSelectorProps = {
    allTags: string[];
    selectedTags: string[];
    addTag: (tag: string) => void;
    className?: string;
};

const TagSelector: FC<TagSelectorProps> = ({ allTags, selectedTags, addTag, className }) => (
    <div className={clsx('mb-2 flex w-full flex-row items-center sm:w-auto', className)}>
        <label htmlFor="tag-select" className="mr-2 min-w-[12ch] text-lg md:min-w-fit">
            Filter by tags:
        </label>
        <select
            onChange={(e) => addTag(e.currentTarget.value)}
            className="max-w-xs rounded-md disabled:opacity-50"
            id="tag-select"
            disabled={allTags.length === selectedTags.length}
            value=""
        >
            {allTags.length === selectedTags.length ? (
                <option>No more tags available.</option>
            ) : (
                <>
                    <option></option>
                    {difference(allTags, selectedTags)
                        .sort()
                        .map((tag) => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                </>
            )}
        </select>
    </div>
);

export default TagSelector;
