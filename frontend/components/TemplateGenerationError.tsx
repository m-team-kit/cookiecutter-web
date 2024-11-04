import { type FC, type PropsWithChildren, useEffect, useState } from 'react';
import Center from 'components/Center';
import { type AxiosResponse, isAxiosError } from 'axios';
import LoadingSpinner from './LoadingSpinner';
import { ISSUES_URL } from '../lib/links';
import { type Template as TemplateDto } from '../lib/client';

type ErrorReport =
    | {
          json: string;
      }
    | {
          content: string;
      }
    | {
          parseError: string;
      };
const analyzeError = async (response: AxiosResponse<unknown>): Promise<ErrorReport> => {
    let text: string | null = null;
    if (typeof response.data === 'string') {
        text = response.data;
    } else if (response.data instanceof Blob) {
        try {
            text = await response.data.text();
        } catch (e) {
            if (e instanceof Error) {
                return {
                    parseError: `Failed to process server error blob text: "${e.toString()}")`,
                };
            } else {
                return {
                    parseError: 'Failed to process server error blob text',
                };
            }
        }
    }

    if (text != null) {
        if (response.headers['content-type'] === 'application/json') {
            try {
                return { json: text };
            } catch {
                return { content: text };
            }
        } else {
            return { content: text };
        }
    } else {
        return { parseError: 'Failed to read server error message' };
    }
};

type ResponseDisplayErrorProps = {
    report: ErrorReport;
};
const ResponseDisplayError: FC<ResponseDisplayErrorProps> = ({ report }) => {
    if ('json' in report) {
        return <pre>{JSON.stringify(JSON.parse(report.json), null, 2)}</pre>;
    }
    if ('content' in report) {
        return report.content;
    }
    return report.parseError;
};

type ResponseDisplayProps = {
    response: AxiosResponse<unknown>;
    template?: TemplateDto;
};
const ResponseDisplay: FC<ResponseDisplayProps> = ({ response, template }) => {
    const [report, setReport] = useState<ErrorReport>();
    useEffect(() => {
        analyzeError(response).then(setReport);
    }, [response]);

    if (report === undefined) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <pre className="max-w-[80ch] overflow-x-scroll rounded-md bg-amber-200 p-2">
                <ResponseDisplayError report={report} />
            </pre>
            {template && (
                <p className="mt-3">
                    If you believe this is a problem with the template, please report it under{' '}
                    {ISSUES_URL.startsWith('https://github.com') ? (
                        <a
                            href={`${ISSUES_URL}/new?${new URLSearchParams({
                                title: `[${template.title.replace(' ', '+')}]`,
                                body: ('json' in report
                                    ? report.json
                                    : 'content' in report
                                    ? report.content
                                    : report.parseError
                                ).replace(' ', '+'),
                            })}`}
                        >
                            the issues page
                        </a>
                    ) : (
                        <a href={ISSUES_URL}>the issues page and include the template name.</a>
                    )}
                </p>
            )}
        </>
    );
};

type ErrorDisplayInnerProps = {
    error: unknown;
    template?: TemplateDto;
};
const ErrorDisplayInner: FC<ErrorDisplayInnerProps> = ({ template, error }) => {
    if (!isAxiosError(error)) {
        return <p>An unknown error occured.</p>;
    }

    if (error.code === undefined) {
        return <p>Could not reach the server.</p>;
    }

    return (
        <>
            <p>The server did not respond as expected:</p>
            {error.response ? (
                <ResponseDisplay response={error.response} template={template} />
            ) : (
                <p>No server response.</p>
            )}
        </>
    );
};

type ErrorBoxProps = {
    className?: string;
    error: unknown;
    template?: TemplateDto;
};
const TemplateGenerationError: FC<PropsWithChildren<ErrorBoxProps>> = ({
    children,
    className,
    error,
    template,
}) => (
    <Center className={className}>
        <div className="rounded-md border border-red-500 p-2">
            {children}
            <ErrorDisplayInner error={error} template={template} />
        </div>
    </Center>
);

export default TemplateGenerationError;
