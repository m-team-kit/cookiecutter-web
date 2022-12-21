import { NextPage } from 'next';
import { useQuery } from 'react-query';
import {
    BACKEND_ROUTE,
    COOKIECUTTER_TEMPLATE_URL,
    GIT_BRANCH_NAME,
    GIT_REPO_URL,
} from 'lib/configuration';
import { LegalField } from 'lib/template';
import Form from '../components/Form';
import { useState } from 'react';

type Template = {
    templateUrl: string;
    helpUrl?: string;
    gitRepo: string;
    gitBranch: string;
    name: string;
};

const deepHdcMaster: Template = {
    templateUrl:
        'https://raw.githubusercontent.com/deephdc/cookiecutter-deep/master/cookiecutter.json',
    gitRepo: GIT_REPO_URL,
    gitBranch: 'master',
    name: 'deephdc/cookiecutter-deep:master',
};
const deepHdcAdvanced: Template = {
    templateUrl: COOKIECUTTER_TEMPLATE_URL,
    helpUrl:
        COOKIECUTTER_TEMPLATE_URL.substring(0, COOKIECUTTER_TEMPLATE_URL.lastIndexOf('.')) +
        '-help.json',
    gitRepo: GIT_REPO_URL,
    gitBranch: GIT_BRANCH_NAME,
    name: 'deephdc/cookiecutter-deep:advanced',
};

const Home: NextPage = () => {
    const [templateUrl, setTemplateUrl] = useState(deepHdcMaster.templateUrl);
    const [helpUrl, setHelpUrl] = useState<string | undefined>(undefined);
    const [gitRepo, setGitRepo] = useState(deepHdcMaster.gitRepo);
    const [gitBranch, setGitBranch] = useState(deepHdcMaster.gitBranch);

    const templates: Template[] = [deepHdcMaster, deepHdcAdvanced];

    const fields = useQuery(
        [templateUrl, gitRepo, gitBranch],
        async () => {
            const response = await fetch(
                '/api/template?' +
                    new URLSearchParams(
                        helpUrl
                            ? {
                                  url: templateUrl,
                                  helpUrl: helpUrl,
                              }
                            : { url: templateUrl }
                    )
            );
            // TODO: less dirty approach?
            return (response.json as () => Promise<LegalField[]>)();
        },
        { refetchOnWindowFocus: false }
    );

    return (
        <div className="container">
            <main>
                <select
                    onChange={(e) => {
                        const template = templates[parseInt(e.target.value)];
                        setTemplateUrl(template.templateUrl);
                        setGitRepo(template.gitRepo);
                        setGitBranch(template.gitBranch);
                        setHelpUrl(template.helpUrl);
                    }}
                >
                    {templates.map((t, i) => {
                        return (
                            <option key={t.gitRepo + t.gitBranch} value={i}>
                                {t.name}
                            </option>
                        );
                    })}
                </select>
                <form
                    action={
                        BACKEND_ROUTE +
                        '?' +
                        new URLSearchParams({
                            url: templateUrl,
                            git_repo: gitRepo,
                            git_branch: gitBranch,
                        })
                    }
                    method="post"
                >
                    <h1>Cookiecutter Webform</h1>
                    <p>
                        Filling this web-form will generate a .zip file with the folders generated
                        by the cookiecutter. It will contain everything necessary to start your
                        DEEP-Project.
                    </p>
                    <div>{fields.isSuccess && <Form fields={fields.data} />}</div>
                    <input className="button" type="submit" value="Generate" />
                </form>
            </main>
        </div>
    );
};

export default Home;
