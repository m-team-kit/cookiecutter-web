const Ordering = {
    ID_ASC: '+id',
    ID_DES: '-id',
    SCORE_ASC: '+score',
    SCORE_DES: '-score',
    TITLE_ASC: '+title',
    TITLE_DES: '-title',
} as const;
type Ordering = typeof Ordering[keyof typeof Ordering];

export default Ordering;
