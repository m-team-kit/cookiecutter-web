import { NextPage } from 'next';
import Layout from 'components/Layout';
import Template from 'components/templates/Template';
import { useQuery } from '@tanstack/react-query';
import { useTemplateApi } from 'lib/useApi';
import LoadingSpinner from '../components/LoadingSpinner';
import { isAxiosError } from 'axios';
import Center from 'components/Center';
import BasicErrorDisplay from 'components/ErrorBox/BasicErrorDisplay';
import ErrorBox from 'components/ErrorBox';

// TODO: SSR?
const Templates: NextPage = () => {
    const api = useTemplateApi();
    const templates = useQuery(['templates'], () => api.listTemplates());

    return (
        <Layout>
            <h1 className="h5">Templates</h1>

            {templates.isLoading && <LoadingSpinner />}

            {templates.isSuccess && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
                    {templates.data.data.map((template) => (
                        <Template template={template} key={template.id} />
                    ))}
                </div>
            )}

            {templates.isError && (
                <ErrorBox error={templates.error}>
                    <p>An error occurred while loading the templates:</p>{' '}
                </ErrorBox>
            )}
        </Layout>
    );
};

export default Templates;
