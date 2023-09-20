import { FC } from 'react';
import styles from './Template.module.scss';
import clsx from 'clsx';
import { Template as TemplateDto } from 'lib/client/models/template';
import Link from 'next/link';
import Badge from 'components/Badge';
import Rating from 'components/Rating';
import resolveImage from 'lib/resolveImage';

type TemplateProps = {
    template: TemplateDto;
};
const Template: FC<TemplateProps> = ({ template }) => {
    const tags = Array.from(template.tags);

    return (
        <Link
            className={clsx(
                styles['card'],
                'hover:scale-105 shadow transition-transform duration-75 no-underline text-black'
            )}
            href={`/template/${template.id}`}
        >
            <div className="flex flex-row">
                <div className="flex-grow">
                    <div className="flex items-center mb-2">
                        <h2 className="mb-0">{template.title}</h2>{' '}
                        {template.score && <Rating score={template.score} className="ml-2" />}
                    </div>
                    <p className={styles['summary']}>{template.summary}</p>
                </div>
                {template.picture && (
                    <div className="flex-grow-0 flex justify-center items-center">
                        <img
                            src={resolveImage(template.picture)}
                            alt=""
                            className="max-w-[100px]"
                        />
                    </div>
                )}
            </div>
            {tags.length > 0 && (
                <span className="inline-flex gap-1 flex-wrap">
                    {tags.map((tag) => (
                        <Badge type="info" key={tag}>
                            {tag}
                        </Badge>
                    ))}
                </span>
            )}
        </Link>
    );
};

export default Template;
