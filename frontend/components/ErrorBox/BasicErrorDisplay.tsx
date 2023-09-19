import { isAxiosError } from 'axios';
import { FC } from 'react';

type BasicErrorDisplayProps = {
    error: unknown;
};
const BasicErrorDisplay: FC<BasicErrorDisplayProps> = ({ error }) => {
    return isAxiosError(error) ? (
        <>
            {error.code !== undefined && (
                <p>
                    The server did not respond as expected.
                    <pre className="bg-amber-200 rounded-md p-2">
                        {JSON.stringify(error.response?.data, null, 2)}
                    </pre>
                </p>
            )}
            {error.code === undefined && <p>Could not reach the server.</p>}
        </>
    ) : (
        <>
            <p>An unknown error occured.</p>
        </>
    );
};

export default BasicErrorDisplay;
