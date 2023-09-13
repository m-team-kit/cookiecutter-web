import { FC } from 'react';
import type TemplateDto from './TemplateDto';
import styles from './Template.module.scss';

type TemplateProps = {
    template: TemplateDto;
};
const Template: FC<TemplateProps> = ({ template }) => {
    return (
        <div className={styles['card']}>
            <h2 className="h6">{template.title}</h2>
            <p className={styles['summary']}>{template.summary}</p>
        </div>
    );
};

export default Template;
