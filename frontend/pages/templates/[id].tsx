import { NextPage } from 'next';
import Layout from 'components/Layout';
import { useTemplateApi } from 'lib/useApi';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import LoadingSpinner from 'components/LoadingSpinner';
import { useEffect } from 'react';
import Button from 'components/Button';
import { useAuth } from 'react-oidc-context';
import { firstMatching } from 'lib/firstMatching';
import Badge from 'components/Badge';
import { CutterField } from 'lib/client';
import TemplateForm from 'pages/components/TemplateForm';

export const hasDefaultValue = (field: CutterField) => {
    // TODO: type assertion because of api spec/generator issue
    const defaultValue = field.default as string;

    return defaultValue.length > 0;
};

// TODO: SSR?
const Template: NextPage = () => {
    const router = useRouter();

    const templateId = firstMatching(router.query, 'id');

    const auth = useAuth();
    const api = useTemplateApi();
    const template = useQuery(['template', templateId], () => api.getTemplate(templateId ?? ''), {
        enabled: templateId !== undefined,
    });

    useEffect(() => {
        if (router.isReady && templateId === undefined) {
            router.push('/templates');
        }
    }, [router.isReady, templateId]);

    if (!router.isReady || template.isLoading || (router.isReady && templateId === undefined)) {
        return (
            <Layout className="mt-32">
                <LoadingSpinner />
            </Layout>
        );
    }

    if (template.isError) {
        return (
            <Layout className="mt-32">
                <p>An error occured while loading the template:</p>
                <code>
                    <pre>{JSON.stringify(template.error, null, 2)}</pre>
                </code>
            </Layout>
        );
    }

    return (
        <Layout className="mt-32">
            <div className="flex flex-row w-100">
                <div className="flex-grow">
                    <h1 className="inline">{template.data.data.title}</h1>
                    <div className="ml-2 inline-flex gap-1 align-text-top">
                        {Array.from(template.data.data.tags).map((tag) => (
                            <Badge type="info" key={tag}>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <p>{template.data.data.summary}</p>
                    <p>
                        <a href={template.data.data.gitLink}>Repository</a> (
                        <span>Commit/Branch/Tag: {template.data.data.gitCheckout}</span>)
                    </p>
                </div>
                <div className="flex-grow-0">
                    {template.data.data.picture && (
                        <img src={template.data.data.picture} alt="template picture" />
                    )}
                </div>
            </div>

            <div className="mt-2" />

            {!auth.isAuthenticated && (
                <div className="flex justify-center my-2">
                    <div className="p-2 bg-neutral-100 rounded border-amber-300 border-4 text-center">
                        <span className="mr-4">To generate projects, please authenticate!</span>
                        <Button onClick={() => auth.signinRedirect()}>Login</Button>
                    </div>
                </div>
            )}

            <TemplateForm template={template.data.data} />
        </Layout>
    );
};

export default Template;
