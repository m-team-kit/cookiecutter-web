import { NextPage } from 'next';
import { useQuery } from 'react-query';
import { LegalField } from 'lib/template';
import Form from '../components/Form';
import { FormEventHandler, useCallback, useLayoutEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from 'react-oidc-context';
import Footer from '../components/Footer';
import { TEMPLATES } from '../lib/templates';
import { buildTemplateUrl, postForm } from '../lib/api';
import { hasDefaultValue, isUsefulKey } from '../lib/form-processing';

const unpackResponse = async (r: Response) => {
    return {
        // file contents
        blob: await r.blob(),
        // get filename from headers if possible
        filename:
            r.headers.get('Content-Disposition')?.replace('attachment;filename=', '') ??
            'cookiecutter.zip',
    };
};

const saveFile = ({ blob, filename }: Awaited<ReturnType<typeof unpackResponse>>) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};

const TemplateForm = () => {
    const auth = useAuth();

    const formSubmitButton = useRef<HTMLInputElement>(null);
    const missingFieldsModal = useRef<HTMLDialogElement>(null);

    const [error, setError] = useState(false);

    const [templateUrl, setTemplateUrl] = useState(TEMPLATES[0].templateUrl);
    const [helpUrl, setHelpUrl] = useState<string | undefined>(undefined);
    const [gitRepo, setGitRepo] = useState(TEMPLATES[0].gitRepo);
    const [gitBranch, setGitBranch] = useState(TEMPLATES[0].gitBranch);

    const [overrideMissingFieldsWarning, setOverrideMissingFieldsWarning] = useState(false);
    const [emptyFields, setEmptyFields] = useState<string[]>([]);

    const fields = useQuery(
        [templateUrl, gitRepo, gitBranch],
        async () => {
            const response = await fetch(buildTemplateUrl(templateUrl, helpUrl));
            // TODO: less dirty approach?
            return (response.json as () => Promise<LegalField[]>)();
        },
        { refetchOnWindowFocus: false }
    );

    const findMissingFields = useCallback(
        (form: FormData) => {
            if (!fields.isSuccess) {
                throw new Error("Can't validate missing fields without fields");
            }

            // all fields that expect a value without default
            const keysToCheck = fields.data
                .filter((f) => isUsefulKey(f.key) && !hasDefaultValue(f))
                .map((f) => f.key);
            // all fields that are empty
            return Array.from(form.entries())
                .filter(([key, value]) => keysToCheck.includes(key) && value.length == 0)
                .map(([key, _]) => key);
        },
        [fields.isSuccess, fields.data]
    );

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!fields.isSuccess || auth.user?.access_token === undefined) {
            return;
        }
        const form = new FormData(e.currentTarget);

        if (!overrideMissingFieldsWarning) {
            const emptyFields = findMissingFields(form);
            if (emptyFields.length !== 0) {
                setEmptyFields(emptyFields);
                missingFieldsModal.current?.showModal();
                setOverrideMissingFieldsWarning(true);
                console.warn('Missing fields:', emptyFields);
                return;
            }
        }

        const response = await postForm(
            auth.user.access_token,
            {
                url: templateUrl,
                git_repo: gitRepo,
                git_branch: gitBranch,
            },
            form
        );
        if (!response.ok) {
            setError(true);
            return;
        }
        const file = await unpackResponse(response);
        saveFile(file);
        setEmptyFields([]);
    };

    useLayoutEffect(() => {
        if (error) {
            document.getElementById('something-went-wrong')?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [error]);

    return (
        <>
            {!fields.isSuccess || (auth.user?.access_token === undefined && '0')}
            <select
                onChange={(e) => {
                    const template = TEMPLATES[parseInt(e.target.value)];
                    setTemplateUrl(template.templateUrl);
                    setGitRepo(template.gitRepo);
                    setGitBranch(template.gitBranch);
                    setHelpUrl(template.helpUrl);
                }}
            >
                {TEMPLATES.map((t, i) => {
                    return (
                        <option key={t.gitRepo + t.gitBranch} value={i}>
                            {t.name}
                        </option>
                    );
                })}
            </select>
            <form onSubmit={handleSubmit} className="mb-0">
                <p>
                    Filling this web-form will generate a .zip file with the folders generated by
                    the cookiecutter. It will contain everything necessary to start your
                    DEEP-Project.
                </p>
                <div>
                    {fields.isSuccess && <Form fields={fields.data} flaggedFields={emptyFields} />}
                </div>
                <input
                    className="button-primary"
                    type="submit"
                    value="Generate"
                    ref={formSubmitButton}
                    onClick={() => setError(false)}
                />
                {error && (
                    <span className="text-error" id="something-went-wrong">
                        Something went wrong, please try again later.
                    </span>
                )}
            </form>
            <dialog id="missing-fields" ref={missingFieldsModal} className="modal">
                <p>
                    It looks like you haven&apos;t filled out all the fields. Are you sure you want
                    to submit the form?{' '}
                </p>
                <p>
                    Missing fields:
                    <ul>
                        {emptyFields.map((f) => (
                            <li key={f} style={{ marginBlock: '.1rem' }}>
                                {f}
                            </li>
                        ))}
                    </ul>
                </p>
                <div className="flex justify-end flex-gap">
                    <button
                        onClick={() => {
                            missingFieldsModal.current?.close();
                            setOverrideMissingFieldsWarning(false);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="button-warning"
                        onClick={() => {
                            missingFieldsModal.current?.close();
                            // HACK: manually retrigger submission here, find a more proper way?
                            formSubmitButton.current?.click();
                            setOverrideMissingFieldsWarning(false);
                        }}
                    >
                        Submit
                    </button>
                </div>
            </dialog>
        </>
    );
};

const Home: NextPage = () => {
    const auth = useAuth();

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar />
                <section className="header" style={{ paddingTop: '7em' }}></section>
                <div className="container" style={{ flexGrow: 1 }}>
                    <main>
                        {auth.isAuthenticated ? (
                            <TemplateForm />
                        ) : (
                            <>
                                <p>Please log in!</p>
                                <button onClick={() => auth.signinRedirect()}>Login</button>
                            </>
                        )}
                    </main>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Home;
