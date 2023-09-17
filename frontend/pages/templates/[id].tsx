import { NextPage } from 'next';
import Layout from 'components/Layout';
import { useTemplateApi } from 'lib/useApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import LoadingSpinner from 'components/LoadingSpinner';
import { useEffect } from 'react';
import Button from 'components/Button';
import { useAuth } from 'react-oidc-context';
import { firstMatching } from 'lib/firstMatching';
import Badge from 'components/Badge';
import TemplateForm from 'pages/components/TemplateForm';
import { Rating } from 'components/Rating';

// TODO: SSR?
const Template: NextPage = () => {
    const router = useRouter();

    const templateId = firstMatching(router.query, 'id');

    const auth = useAuth();
    const api = useTemplateApi();
    const template = useQuery(['template', templateId], () => api.getTemplate(templateId ?? ''), {
        enabled: templateId !== undefined,
        keepPreviousData: true,
    });

    const rateTemplate = useMutation(
        ['rate', templateId],
        (score: number) => api.rateTemplate(templateId ?? '', score),
        {
            onSuccess: () => template.refetch(),
        }
    );

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
                    <div className="flex items-center">
                        <h1 className="">{template.data.data.title}</h1>
                        <Rating
                            score={template.data.data.score ?? 0}
                            onChange={(score) => rateTemplate.mutate(score)}
                            className="ml-2"
                        />
                        <div className="ml-2 flex gap-1 align-text-top">
                            {Array.from(template.data.data.tags).map((tag) => (
                                <Badge type="info" key={tag}>
                                    {tag}
                                </Badge>
                            ))}
                        </div>
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
