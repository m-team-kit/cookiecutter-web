import { type AxiosResponse, isAxiosError } from 'axios';
import { type FC, type ReactNode, useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';

type ResponseContentsProps = {
    response: AxiosResponse<unknown>;
};
const ResponseContents: FC<ResponseContentsProps> = ({ response }) => {
    const [message, setMessage] = useState<ReactNode>();

    useEffect(() => {
        if (typeof response.data === 'string') {
            setMessage(response.data);
        } else if (response.data instanceof Blob) {
            response.data
                .text()
                .then((text) => setMessage(text))
                .catch((error) =>
                    setMessage(`(Failed to process server error blob text: "${error.toString()}")`)
                );
        } else {
            setMessage('(Failed to read server error message)');
        }
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
                </>
            )}
            {error.code === undefined && <p>Could not reach the server.</p>}
        </>
    ) : (
        <p>An unknown error occured.</p>
    );

export default BasicErrorDisplay;
