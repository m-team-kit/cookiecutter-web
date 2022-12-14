import type { NextApiRequest, NextApiResponse } from 'next';
import { LegalField } from '../../lib/template';
import { COOKIECUTTER_HELP_URL, COOKIECUTTER_TEMPLATE_URL } from '../../lib/configuration';

const joinFields = (cookieCutterJson: any, helpJson: any = null): LegalField[] => {
    if (helpJson) {
        return Object.keys(helpJson).map((key): LegalField => {
            return {
                key,
                description: helpJson[key],
                default: cookieCutterJson[key],
            };
        });
    }
    return Object.keys(cookieCutterJson).map((key): LegalField => {
        return {
            key,
            default: cookieCutterJson[key],
        };
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<LegalField[]>) {
    const {
        url = COOKIECUTTER_TEMPLATE_URL,
        helpUrl = req.query.url == COOKIECUTTER_TEMPLATE_URL ? COOKIECUTTER_HELP_URL : null,
    } = req.query;
    if (Array.isArray(url) || Array.isArray(helpUrl)) {
        res.status(400);
        return;
    }
    const cookieCutterJson = await (await fetch(url)).json();
    let helpJson = helpUrl ? await (await fetch(helpUrl)).json() : null;
    res.status(200).json(joinFields(cookieCutterJson, helpJson));
}
