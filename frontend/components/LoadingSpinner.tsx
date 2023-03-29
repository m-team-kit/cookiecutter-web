import styles from './LoadingSpinner.module.scss';
import { FC } from 'react';

const LoadingSpinner: FC = () => {
    return (
        <div className={styles.spinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default LoadingSpinner;
