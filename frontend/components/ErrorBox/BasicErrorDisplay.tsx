import { type AxiosResponse, isAxiosError } from 'axios';
import { type FC, type ReactNode, useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import { ISSUES_URL } from '../../lib/links';

type ResponseContentsProps = {
    response: AxiosResponse<unknown>;
};
const ResponseContents: FC<ResponseContentsProps> = ({ response }) => {
    const [message, setMessage] = useState<ReactNode>();

    useEffect(() => {
        (async () => {
            let text: string | null = null;
            if (typeof response.data === 'string') {
                text = response.data;
            } else if (response.data instanceof Blob) {
                try {
                    text = await response.data.text();
                } catch (e) {
                    if (e instanceof Error) {
                        setMessage(`(Failed to process server error blob text: "${e.toString()}")`);
                    } else {
                        setMessage('(Failed to process server error blob text)');
                    }
                }
            }

            if (text != null) {
                if (response.headers['content-type'] === 'application/json') {
                    try {
                        setMessage(<pre>{JSON.stringify(JSON.parse(text), null, 2)}</pre>);
                    } catch {
                        setMessage(text);
                    }
                } else {
                    setMessage(text);
                }
            } else {
                setMessage('(Failed to read server error message)');
            }
        })();
    }, [response]);

    return message ?? <LoadingSpinner />;
};

type BasicErrorDisplayProps = {
    error: unknown;
};
const BasicErrorDisplay = ({ error }: BasicErrorDisplayProps) =>
    isAxiosError(error) ? (
        <>
            {error.code !== undefined && (
                <>
                    <p>The server did not respond as expected:</p>
                    {error.response && (
                        <pre className="max-w-[80ch] overflow-x-scroll rounded-md bg-amber-200 p-2">
                            <ResponseContents response={error.response} />
                        </pre>
                    )}
                    {!error.response && <p>No server response.</p>}
                    <p className="mt-3">
                        If you believe this is a problem with the template, please report it under{' '}
                        <a href={ISSUES_URL}>the issues page and include the template name.</a>
                    </p>
                </>
            )}
            {error.code === undefined && <p>Could not reach the server.</p>}
        </>
    ) : (
        <p>An unknown error occured.</p>
    );

export default BasicErrorDisplay;
