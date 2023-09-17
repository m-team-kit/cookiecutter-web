import { FC } from 'react';
import styles from './Template.module.scss';
import clsx from 'clsx';
import { Template as TemplateDto } from 'lib/client/dist/models/template';
import Link from 'next/link';

type TemplateProps = {
    template: TemplateDto;
};
const Template: FC<TemplateProps> = ({ template }) => {
    return (
        <Link
            className={clsx(
                styles['card'],
                'hover:scale-105 shadow transition-transform duration-75 no-underline text-black'
            )}
            href={`/templates/${template.id}`}
        >
            <h2 className="h6">{template.title}</h2>
            <p className={styles['summary']}>{template.summary}</p>
        </Link>
    );
};

export default Template;
