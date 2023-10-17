import { type FC, useState } from 'react';
import clsx from 'clsx';
import styles from 'components/templates/Template.module.scss';
import { StarHalf } from 'lucide-react';

type RatingProps = { score: number; className?: string; onChange?: (score: number) => void };
const Rating: FC<RatingProps> = ({ score, className, onChange }) => {
    const doubleScore = score * 2;

    const [hoverScore, setHoverScore] = useState(doubleScore);
    const [hovering, setHovering] = useState(false);

    return (
        <span
            className={clsx('flex', className)}
            onMouseEnter={onChange ? () => setHovering(true) : undefined}
            onMouseLeave={onChange ? () => setHovering(false) : undefined}
        >
            {[...Array(10)].map((_, i) => {
                const classes = clsx(styles['star'], i % 2 === 1 ? styles['flipped'] : false);
                return (
                    <span
                        key={i}
                        className={clsx('text-yellow-500', 'text-xl', 'align-text-bottom')}
                        onMouseEnter={() => setHoverScore(i + (i % 2))}
                        onClick={() => onChange && onChange((i + (i % 2)) / 2)}
                    >
                        {i < (hovering ? hoverScore : doubleScore) ? (
                            <StarHalf fill="currentColor" className={classes} />
                        ) : (
                            <StarHalf className={classes} />
                        )}
                    </span>
                );
            })}
        </span>
    );
};

export default Rating;
