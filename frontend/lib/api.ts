import { BACKEND_ROUTE } from './configuration';

type FormParameters = {
    url: string;
    git_repo: string;
    git_branch: string;
};

export const postForm = async (accessToken: string, parameters: FormParameters, body: BodyInit) =>
    fetch(BACKEND_ROUTE + '?' + new URLSearchParams(parameters), {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body,
    });

export const buildTemplateUrl = (templateUrl: string, helpUrl?: string) =>
    '/api/template?' +
    new URLSearchParams(
        helpUrl
            ? {
                  url: templateUrl,
                  helpUrl: helpUrl,
              }
            : { url: templateUrl }
    );
