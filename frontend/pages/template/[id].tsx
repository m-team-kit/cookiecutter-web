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
import TemplateForm from 'components/TemplateForm';
import Rating from 'components/Rating';
import { Code2 } from 'lucide-react';
import ErrorBox from 'components/ErrorBox';
import resolveImage from 'lib/resolveImage';
import Center from 'components/Center';

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
            <Layout>
                <LoadingSpinner />
            </Layout>
        );
    }

    if (template.isError) {
        return (
            <Layout>
                <ErrorBox error={template.error}>
                    <p>An error occurred while loading the template:</p>{' '}
                </ErrorBox>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="block lg:hidden">
                <Center>
                    {template.data.data.picture && (
                        <img
                            src={resolveImage(template.data.data.picture)}
                            className="max-w-[min(300px,90svw)]"
                            alt="template picture"
                        />
                    )}
                </Center>
            </div>
            <div className="flex flex-row w-100 wrap">
                <div className="flex-grow">
                    <div className="flex items-center">
                        <h1 className="flex-grow flex-shrink-0">{template.data.data.title}</h1>
                        <Rating
                            score={template.data.data.score ?? 0}
                            onChange={(score) => rateTemplate.mutate(score)}
                            className="ml-2"
                        />
                        <a
                            href={`${template.data.data.gitLink}/tree/${template.data.data.gitCheckout}`}
                            className="ml-2 flex items-center"
                        >
                            <Code2 className="text-blue-500 inline" />
                            Source
                        </a>
                        <div className="ml-2 flex gap-1 align-text-top flex-wrap">
                            {Array.from(template.data.data.tags).map((tag) => (
                                <Badge type="info" key={tag}>
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <p>{template.data.data.summary}</p>
                </div>
                <div className="flex-grow-0 hidden lg:block">
                    {template.data.data.picture && (
                        <img
                            src={resolveImage(template.data.data.picture)}
                            alt="template picture"
                        />
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
