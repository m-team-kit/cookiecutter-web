import { COOKIECUTTER_TEMPLATE_URL, GIT_BRANCH_NAME, GIT_REPO_URL } from './configuration';

type Template = {
    templateUrl: string;
    helpUrl?: string;
    gitRepo: string;
    gitBranch: string;
    name: string;
};

const DEEPHDC_MASTER: Template = {
    templateUrl:
        'https://raw.githubusercontent.com/deephdc/cookiecutter-deep/master/cookiecutter.json',
    gitRepo: GIT_REPO_URL,
    gitBranch: 'master',
    name: 'deephdc/cookiecutter-deep:master',
};
const DEEPHDC_CHILD_MODULE: Template = {
    templateUrl:
        'https://raw.githubusercontent.com/deephdc/cookiecutter-deep/child-module/cookiecutter.json',
    gitRepo: GIT_REPO_URL,
    gitBranch: 'child-module',
    name: 'deephdc/cookiecutter-deep:child-module',
};
const DEEPHDC_ADVANCED: Template = {
    templateUrl: COOKIECUTTER_TEMPLATE_URL,
    helpUrl: `${COOKIECUTTER_TEMPLATE_URL.substring(
        0,
        COOKIECUTTER_TEMPLATE_URL.lastIndexOf('.')
    )}-help.json`,
    gitRepo: GIT_REPO_URL,
    gitBranch: GIT_BRANCH_NAME,
    name: 'deephdc/cookiecutter-deep:advanced',
};
export const TEMPLATES = [DEEPHDC_MASTER, DEEPHDC_CHILD_MODULE, DEEPHDC_ADVANCED];
