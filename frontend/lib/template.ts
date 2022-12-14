export const BLANK_FIELD = 'Press Enter and configure';

export type Field<T> = {
    key: string;
    description?: string;
    default: T;
};
export type StringField = Field<string>;
export type SelectField = Field<Array<number>> | Field<Array<string>>;
export type LegalField = StringField | SelectField;
