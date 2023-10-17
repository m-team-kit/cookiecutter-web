import { type NextPage } from 'next';
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
            <div className="w-100 flex flex-row">
                <div className="mb-2 grow">
                    <div className="mb-2 flex flex-wrap items-center">
                        <h1 className="max-w-[95svw] shrink-0 flex-wrap">
                            {template.data.data.title}
                        </h1>
                        <Rating
                            score={template.data.data.score ?? 0}
                            onChange={(score) => rateTemplate.mutate(score)}
                            className="ml-2"
                        />
                        <a
                            href={`${template.data.data.gitLink}/tree/${template.data.data.gitCheckout}`}
                            className="ml-2 flex items-center"
                        >
                            <Code2 className="inline text-blue-500" />
                            Source
                        </a>
                        <div className="ml-2 flex flex-wrap gap-1 align-text-top">
                            {Array.from(template.data.data.tags).map((tag) => (
                                <Badge type="info" key={tag}>
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <p>{template.data.data.summary}</p>
                </div>
                <div className="hidden grow-0 lg:block">
                    {template.data.data.picture && (
                        <img
                            src={resolveImage(template.data.data.picture)}
                            alt="template picture"
                            className="max-w-[300px]"
                        />
                    )}
                </div>
            </div>

            <div className="mt-2" />

            {!auth.isAuthenticated && (
                <div className="my-2 flex justify-center">
                    <div className="rounded border-4 border-amber-300 bg-neutral-100 p-2 text-center">
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
