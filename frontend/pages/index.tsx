import { NextPage } from 'next';
import { useQuery } from 'react-query';
import {
    BACKEND_ROUTE,
    COOKIECUTTER_HELP_URL,
    COOKIECUTTER_TEMPLATE_URL,
} from '../lib/configuration';
import { LegalField } from '../lib/template';
import Form from '../components/Form';

const Home: NextPage = () => {
    const fields = useQuery(
        COOKIECUTTER_TEMPLATE_URL,
        async () => {
            const response = await fetch(
                '/api/template?' +
                    new URLSearchParams({
                        url: COOKIECUTTER_TEMPLATE_URL,
                        helpUrl: COOKIECUTTER_HELP_URL,
                    })
            );
            // TODO: less dirty approach?
            return (response.json as () => Promise<LegalField[]>)();
        },
        { refetchOnWindowFocus: false }
    );

    return (
        <main>
            <div className="testbox">
                <form action={BACKEND_ROUTE} method="post">
                    <h1>Cookiecutter Webform</h1>
                    <p>
                        Filling this web-form will generate a .zip file with the folders generated
                        by the cookiecutter. It will contain everything necessary to start your
                        DEEP-Project.
                    </p>
                    <div style={{ padding: '0.25em' }}>
                        {fields.isSuccess && <Form fields={fields.data} />}
                    </div>
                    <input className="button" type="submit" />
                </form>
            </div>
        </main>
    );
};

export default Home;
