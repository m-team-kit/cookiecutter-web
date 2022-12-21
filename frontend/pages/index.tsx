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
    configUrl: string;
    gitRepo: string;
    gitBranch: string;
    name: string;
};

const Home: NextPage = () => {
    const [templateUrl, setTemplateUrl] = useState(COOKIECUTTER_TEMPLATE_URL);
    const [gitRepo, setGitRepo] = useState(GIT_REPO_URL);
    const [gitBranch, setGitBranch] = useState(GIT_BRANCH_NAME);

    const templates: Template[] = [
        {
            configUrl: COOKIECUTTER_TEMPLATE_URL,
            gitRepo: GIT_REPO_URL,
            gitBranch: GIT_BRANCH_NAME,
            name: 'deephdc/cookiecutter-deep:advanced',
        },
    ];

    // TODO: url-safe appending
    const helpUrl = templateUrl.substring(0, templateUrl.lastIndexOf('.')) + '-help.json';

    const fields = useQuery(
        [templateUrl, gitRepo, gitBranch],
        async () => {
            const response = await fetch(
                '/api/template?' +
                    new URLSearchParams({
                        url: templateUrl,
                        helpUrl: helpUrl,
                    })
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
                        setTemplateUrl(template.configUrl);
                        setGitRepo(template.gitRepo);
                        setGitBranch(template.gitBranch);
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
