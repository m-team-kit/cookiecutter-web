import { NextPage } from 'next';
import Layout from 'components/Layout';
import Template from 'components/templates/Template';
import { useQuery } from '@tanstack/react-query';
import { useTemplateApi } from 'lib/useApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBox from 'components/ErrorBox';
import { useMemo, useState } from 'react';
import { difference } from 'lodash';
import SelectedTag from 'components/SelectedTag';

// TODO: SSR?
const Templates: NextPage = () => {
    const api = useTemplateApi();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const templates = useQuery(
        ['templates', selectedTags],
        () => api.listTemplates(undefined, selectedTags),
        {
            keepPreviousData: true,
        }
    );

    const availableTags = useMemo<string[]>(
        () =>
            templates.data
                ? Array.from(
                      new Set(
                          templates.data.data.flatMap(
                              // TODO: type assert due to API typing
                              (template) => template.tags as unknown as string[]
                          )
                      )
                  )
                : [],
        [templates.data]
    );

    const select = (tag: string) => {
        if (tag.length === 0) {
            return;
        }
        setSelectedTags([...selectedTags, tag]);
    };
    const unselect = (tag: string) => {
        if (tag.length === 0) {
            return;
        }
        setSelectedTags(selectedTags.filter((otherTag) => otherTag !== tag));
    };

    return (
        <Layout>
            <h1 className="h5">Templates</h1>

            {templates.isLoading && <LoadingSpinner />}

            {templates.data && (
                <>
                    <div className="flex flex-row items-center mb-2">
                        <label htmlFor="tag-select" className="mr-2 text-lg">
                            Filter by tags:
                        </label>
                        <select
                            onChange={(e) => select(e.currentTarget.value)}
                            className="rounded-md w-60 disabled:opacity-50"
                            id="tag-select"
                            disabled={availableTags.length === selectedTags.length}
                            value={''}
                        >
                            {availableTags.length === selectedTags.length ? (
                                <option>No more tags available.</option>
                            ) : (
                                <>
                                    <option selected></option>
                                    {difference(availableTags, selectedTags)
                                        .sort()
                                        .map((tag) => (
                                            <option key={tag} value={tag}>
                                                {tag}
                                            </option>
                                        ))}
                                </>
                            )}
                        </select>
                        <div className="ml-2 flex flex-row flex-wrap gap-1">
                            {selectedTags.map((tag) => (
                                <SelectedTag
                                    key={tag}
                                    tag={tag}
                                    onDelete={(tag) => unselect(tag)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
                        {templates.data.data.map((template) => (
                            <Template template={template} key={template.id} />
                        ))}
                    </div>
                </>
            )}

            {templates.isError && (
                <ErrorBox error={templates.error}>
                    <p>An error occurred while loading the templates:</p>
                </ErrorBox>
            )}
        </Layout>
    );
};

export default Templates;
