import { type FC } from 'react';
import styles from './Template.module.scss';
import clsx from 'clsx';
import { type Template as TemplateDto } from 'lib/client/models/template';
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
                ' text-black no-underline shadow transition-transform duration-75 hover:scale-105'
            )}
            href={`/template/${template.id}`}
        >
            <div className="flex flex-row flex-wrap">
                <div className="grow">
                    <div className="mb-2 flex flex-wrap items-center justify-center">
                        <h2 className="mb-0 mr-2">{template.title}</h2>{' '}
                        {template.score && <Rating score={template.score} />}
                    </div>
                    <p className={styles['summary']}>{template.summary}</p>
                </div>
                {template.picture && (
                    <div className="flex grow-0 items-center justify-center">
                        <img
                            src={resolveImage(template.picture)}
                            alt=""
                            className="max-w-[100px]"
                        />
                    </div>
                )}
            </div>
            {tags.length > 0 && (
                <span className="inline-flex flex-wrap gap-1">
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
