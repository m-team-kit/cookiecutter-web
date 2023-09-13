import { NextPage } from 'next';
import Layout from '../components/Layout';
import TemplateDto from '../components/TemplateDto';
import Template from '../components/Template';

const MOCK_TEMPLATES: TemplateDto[] = [
    {
        id: 'cc4f0a67-c626-4778-8658-62835b9cf899',
        repoFile: 'cookiecutter.json',
        title: 'AI4OS template',
        summary:
            'Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        language: 'python',
        tags: ['foo'],
        picture:
            'https://images.unsplash.com/photo-1579168765467-3b235f938439?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80',
        gitLink: 'https://github.com/deephdc/cookiecutter-deep',
        gitCheckout: 'master',
        score: 5,
    },
    {
        id: '37aa2725-cca8-4216-824d-a2cd9da1ec06',
        repoFile: 'cookiecutter.json',
        title: 'AI4OS child-module',
        summary:
            'Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        language: 'python',
        tags: ['bar'],
        picture:
            'https://images.unsplash.com/photo-1579168765467-3b235f938439?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80',
        gitLink: 'https://github.com/deephdc/cookiecutter-deep',
        gitCheckout: 'child-module',
        score: 3,
    },
    {
        id: '82f76ca4-3f8a-49dd-9eba-0ac6a2f86e0d',
        repoFile: 'cookiecutter.json',
        title: 'AI4OS advanced',
        summary:
            'Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        language: 'python',
        tags: ['baz'],
        picture:
            'https://images.unsplash.com/photo-1579168765467-3b235f938439?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80',
        gitLink: 'https://github.com/deephdc/cookiecutter-deep',
        gitCheckout: 'advanced',
        score: 1,
    },
];

const Templates: NextPage = () => {
    return (
        <Layout>
            <h1 className="h5">Templates</h1>
            <div className="row">
                {MOCK_TEMPLATES.map((template) => (
                    <div className="four columns" key={template.id}>
                        <Template template={template} />
                    </div>
                ))}
            </div>
            <div
                style={{
                    height: '200px',
                    lineHeight: '20px',
                    display: 'inline',
                }}
            >
                foo
            </div>

            <div
                style={{
                    width: '200px',
                    height: '200px',
                }}
            >
                <div
                    style={{
                        margin: 'auto 0',
                        height: '100px',
                    }}
                >
                    aeio
                </div>
            </div>
        </Layout>
    );
};

export default Templates;
