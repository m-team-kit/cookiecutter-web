import { LegalField } from './template';

export const isUsefulKey = (key: string) => {
    return !key.startsWith('_');
};

export const hasDefaultValue = (field: LegalField) => {
    return field.default.length > 0;
};
