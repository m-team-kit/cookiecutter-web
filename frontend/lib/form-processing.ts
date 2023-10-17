import { type LegalField } from './template';

export const isUsefulKey = (key: string) => !key.startsWith('_');

export const hasDefaultValue = (field: LegalField) => field.default.length > 0;
