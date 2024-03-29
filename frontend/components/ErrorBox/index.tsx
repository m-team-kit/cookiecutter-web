import { type FC, type PropsWithChildren } from 'react';
import Center from 'components/Center';
import BasicErrorDisplay from './BasicErrorDisplay';

type ErrorBoxProps = {
    error: unknown;
};
const ErrorBox: FC<PropsWithChildren<ErrorBoxProps>> = ({ children, error }) => {
    return (
        <Center>
            <div className="rounded-md border border-red-500 p-2">
                {children}
                <BasicErrorDisplay error={error} />
            </div>
        </Center>
    );
};

export default ErrorBox;
