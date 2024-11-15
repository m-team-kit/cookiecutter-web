import { type FC, type PropsWithChildren, useEffect, useRef, useState } from 'react';
import Center from 'components/Center';
import { type AxiosResponse, isAxiosError } from 'axios';
import LoadingSpinner from './LoadingSpinner';
import { ISSUES_URL } from '../lib/links';
import { type Template as TemplateDto } from '../lib/client';
import mustache from 'mustache';
import { useIssueTemplate } from './IssueTemplateContext';
import Button, { ButtonLink } from './Button';

type ErrorMetadata = {
    template?: TemplateDto;
    userInput?: Record<string, unknown>;
    emptyFields?: string[];
};

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
            }
            return {
                parseError: 'Failed to process server error blob text',
            };
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

const wrapCodeBlock = (content: string, lang: string = ''): string =>
    `\`\`\`${lang}\n${content}\n\`\`\``;

type ResponseDisplayProps = {
    response: AxiosResponse<unknown>;
    metadata?: ErrorMetadata;
};
const ResponseDisplay: FC<ResponseDisplayProps> = ({ response, metadata }) => {
    const [report, setReport] = useState<ErrorReport>();
    useEffect(() => {
        analyzeError(response).then(setReport);
    }, [response]);

    const { issueTemplate } = useIssueTemplate();

    const reportErrorModal = useRef<HTMLDialogElement>(null);

    if (report === undefined) {
        return <LoadingSpinner />;
    }

    return (
        <>
            {metadata?.template && (
                <dialog id="report" ref={reportErrorModal} className="modal p-3">
                    <h2>Submit report</h2>
                    <p>
                        You will be brought to a Github issue creation page. For reproducibility
                        reasons, your form input is included. If it contains personally identifiable
                        information, or you&apos;d wish to remove it, please redact it in the next
                        page.
                    </p>
                    <div className="buttons">
                        <Button
                            variant="secondary"
                            onClick={() => reportErrorModal.current?.close()}
                        >
                            Cancel
                        </Button>
                        <ButtonLink
                            variant="primary"
                            href={`${ISSUES_URL}/new?${new URLSearchParams({
                                title: `[${metadata?.template.title}] Generation issue`,
                                body: mustache.render(issueTemplate, {
                                    templateName: metadata.template.title,
                                    templateUrl: metadata.template.gitLink,
                                    gitRef: metadata.template.gitCheckout,
                                    report:
                                        'json' in report
                                            ? wrapCodeBlock(
                                                  JSON.stringify(JSON.parse(report.json), null, 2),
                                                  'json'
                                              )
                                            : 'content' in report
                                            ? wrapCodeBlock(report.content)
                                            : wrapCodeBlock(report.parseError),
                                    userInput:
                                        metadata.userInput != null
                                            ? wrapCodeBlock(
                                                  JSON.stringify(metadata.userInput, null, 2),
                                                  'json'
                                              )
                                            : 'unknown',
                                    emptyFields:
                                        metadata.emptyFields != null
                                            ? wrapCodeBlock(
                                                  JSON.stringify(metadata?.emptyFields, null, 2),
                                                  'json'
                                              )
                                            : 'N/A',
                                }),
                                labels: 'template issue',
                            })}`}
                        >
                            Continue
                        </ButtonLink>
                    </div>
                </dialog>
            )}

            <pre className="max-w-[80ch] overflow-x-scroll rounded-md bg-amber-200 p-2">
                <ResponseDisplayError report={report} />
            </pre>
            <p className="mt-3">
                If you believe this is a problem with the template, please report it under{' '}
                {metadata?.template && ISSUES_URL.startsWith('https://github.com') ? (
                    <a
                        href={ISSUES_URL}
                        onClick={(e) => {
                            e.preventDefault();
                            reportErrorModal.current?.showModal();
                        }}
                    >
                        the issues page.
                    </a>
                ) : (
                    <a href={ISSUES_URL}>the issues page and include the template name.</a>
                )}
            </p>
        </>
    );
};

type ErrorDisplayInnerProps = {
    error: unknown;
    metadata?: ErrorMetadata;
};
const ErrorDisplayInner: FC<ErrorDisplayInnerProps> = ({ metadata, error }) => {
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
                <ResponseDisplay response={error.response} metadata={metadata} />
            ) : (
                <p>No server response.</p>
            )}
        </>
    );
};

type ErrorBoxProps = {
    className?: string;
    error: unknown;
    metadata?: ErrorMetadata;
};
const TemplateGenerationError: FC<PropsWithChildren<ErrorBoxProps>> = ({
    children,
    className,
    error,
    metadata,
}) => (
    <Center className={className}>
        <div className="rounded-md border border-red-500 p-2">
            {children}
            <ErrorDisplayInner error={error} metadata={metadata} />
        </div>
    </Center>
);

export default TemplateGenerationError;
