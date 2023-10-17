import { difference } from 'lodash';
import { type FC } from 'react';

type TagSelectorProps = {
    allTags: string[];
    selectedTags: string[];
    addTag: (tag: string) => void;
};

const TagSelector: FC<TagSelectorProps> = ({ allTags, selectedTags, addTag }) => (
    <div className="xs:w-full mb-2 flex flex-row items-center sm:w-auto">
        <label htmlFor="tag-select" className="mr-2 text-lg">
            Filter by tags:
        </label>
        <select
            onChange={(e) => addTag(e.currentTarget.value)}
            className="w-60 rounded-md disabled:opacity-50"
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
