import { FC, PropsWithChildren } from 'react';
import Center from 'components/Center';
import BasicErrorDisplay from './BasicErrorDisplay';

type ErrorBoxProps = {
    error: unknown;
};
const ErrorBox: FC<PropsWithChildren<ErrorBoxProps>> = ({ children, error }) => {
    return (
        <Center>
            <div className="border border-red-500 p-2 rounded-md">
                {children}
                <BasicErrorDisplay error={error} />
            </div>
        </Center>
    );
};

export default ErrorBox;
