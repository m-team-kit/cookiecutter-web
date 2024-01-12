import { type NextPage } from 'next';
import Layout from 'components/Layout';
import Template from 'components/templates/Template';
import { useQuery } from '@tanstack/react-query';
import { useTemplateApi } from 'lib/useApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBox from 'components/ErrorBox';
import { useMemo, useState } from 'react';
import type Ordering from 'lib/Ordering';
import OrderingSelector from 'components/OrderingSelector';
import TagSelector from 'components/TagSelector';
import SelectedTags from 'components/SelectedTags';

const FORCED_TAGS =
    process.env['NEXT_PUBLIC_FORCED_TAGS']?.split(',').filter((t) => t.length > 0) ?? [];

// TODO: SSR?
const Templates: NextPage = () => {
    const api = useTemplateApi();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [ordering, setOrdering] = useState<Ordering | undefined>(undefined);

    const templates = useQuery(
        ['templates', selectedTags, FORCED_TAGS, ordering],
        () => api.listTemplates(undefined, [...FORCED_TAGS, ...selectedTags], undefined, ordering),
        {
            keepPreviousData: true,
        }
    );

    const allTags = useMemo<string[]>(
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
                    <div className="flex flex-row flex-wrap">
                        <TagSelector
                            allTags={allTags}
                            selectedTags={selectedTags}
                            addTag={select}
                        />
                        <SelectedTags tags={selectedTags} onDelete={unselect} className="grow" />
                        <OrderingSelector onChange={setOrdering} />
                    </div>
                    <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
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
