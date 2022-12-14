export const GIT_REPO_DOWNLOAD_URL =
    process.env.CC_GIT_REPO_DOWNLOAD_URL ??
    'https://raw.githubusercontent.com/deephdc/cookiecutter-deep/';
export const GIT_REPO_URL =
    process.env.CC_GIT_REPO_URL ?? 'https://github.com/deephdc/cookiecutter-deep/';
export const GIT_BRANCH_NAME = process.env.CC_GIT_BRANCH ?? 'advanced';

export const GIT_DOWNLOAD_ROOT = GIT_REPO_DOWNLOAD_URL + GIT_BRANCH_NAME + '/';

export const COOKIECUTTER_TEMPLATE = process.env.CC_TEMPLATE ?? 'cookiecutter.json';
export const COOKIECUTTER_TEMPLATE_URL = GIT_DOWNLOAD_ROOT + COOKIECUTTER_TEMPLATE;
export const COOKIECUTTER_HELP = COOKIECUTTER_TEMPLATE.split('.')[0] + '-help.json';
export const COOKIECUTTER_HELP_URL = GIT_DOWNLOAD_ROOT + COOKIECUTTER_HELP;

export const BACKEND_ROUTE = process.env.NEXT_PUBLIC_BACKEND_URL ?? '/api/v1';
