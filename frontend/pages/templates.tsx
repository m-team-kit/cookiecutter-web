import { NextPage } from 'next';
import Layout from 'components/Layout';
import Template from 'components/Template';
import { useQuery } from '@tanstack/react-query';
import { useTemplateApi } from 'lib/useApi';
import LoadingSpinner from '../components/LoadingSpinner';

// TODO: SSR?
const Templates: NextPage = () => {
    const api = useTemplateApi();
    const templates = useQuery(['templates'], () => api.listTemplates());

    return (
        <Layout header>
            <h1 className="h5">Templates</h1>

            {templates.isLoading && <LoadingSpinner />}

            {templates.isSuccess && (
                <div className="grid grid-cols-3 gap-4">
                    {templates.data.data.map((template) => (
                        <Template template={template} key={template.id} />
                    ))}
                </div>
            )}
        </Layout>
    );
};

export default Templates;
