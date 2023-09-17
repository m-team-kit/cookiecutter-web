import { FC } from 'react';
import styles from './Template.module.scss';
import clsx from 'clsx';
import { Template as TemplateDto } from 'lib/client/models/template';
import Link from 'next/link';
import { faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStarHalf as faStarHalfBorder } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type RatingProps = { score: number; className?: string };
const Rating: FC<RatingProps> = ({ score, className }) => {
    const doubleScore = score * 2;

    return (
        <span className={className}>
            {[...Array(10)].map((_, i) => (
                <span
                    key={i}
                    className={clsx('text-yellow-500', 'text-xl', 'inline', 'align-text-bottom')}
                >
                    {i < doubleScore ? (
                        <FontAwesomeIcon
                            icon={faStarHalf}
                            className={clsx(styles['star'], i % 2 == 1 ? styles['flipped'] : false)}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faStarHalfBorder}
                            className={clsx(styles['star'], i % 2 == 1 ? styles['flipped'] : false)}
                        />
                    )}
                </span>
            ))}
        </span>
    );
};

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
                    <h2 className="h6 inline">{template.title}</h2>{' '}
                    {template.score && <Rating score={template.score} className="ml-2" />}
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
