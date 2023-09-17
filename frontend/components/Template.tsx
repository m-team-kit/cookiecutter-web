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
            <div className="flex flex-row">
                <div className="flex-grow">
                    <h2 className="h6">{template.title}</h2>
                    <p className={styles['summary']}>{template.summary}</p>
                </div>
                {template.picture && (
                    <div className="flex-grow-0 flex justify-center items-center">
                        <img src={template.picture} alt="" className="max-w-[100px]" />
                    </div>
                )}
            </div>
        </Link>
    );
};

export default Template;
