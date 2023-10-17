import styles from './LoadingSpinner.module.scss';
import { type FC } from 'react';
import Center from 'components/Center';

const LoadingSpinner: FC = () => (
    <Center>
        <div className={styles.spinner}>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    </Center>
);

export default LoadingSpinner;
