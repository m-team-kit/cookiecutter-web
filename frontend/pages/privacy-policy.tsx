import { type NextPage } from 'next';
import Layout from 'components/Layout';

const PrivacyPolicy: NextPage = () => (
    <Layout>
        <h1>Privacy Policy</h1>
        <p>This privacy policy for Templates Hub service is effective from 2023-09-20</p>
        <br />
        <h2>Service</h2>
        <p>
            Templates Hub provides a Hub to collect software templates based on{' '}
            <a href="https://github.com/cookiecutter/cookiecutter">cookiecuters</a> and to generate
            software projects from them. Users can add new templates, search, list them, choose a
            template of their preference, fill out the corresponding web form and, when submitted,
            receive a zip file containing a customized startup software project. The Templates Hub
            service consists of the Python backend compliant with the OpenAPI specification and the
            frontend to provide the web GUI. The template records are collected in the github
            repository and cached in the database local to the service.
        </p>
        <p>
            The service is provided by the <a href="https://www.scc.kit.edu/en/">Scientific Computing Center</a> (SCC){' '}
            of the <a href="https://www.kit.edu/english/index.php">Karlsruhe Institute of Technology</a> (KIT).
        </p>
        <br />
        <h2>Jurisdiction And Supervisory Authority</h2>
        <ul className="ml-6 list-disc">
            <li>
                <a href="https://www.bfdi.bund.de/DE/Home/home_node.html">German DPA</a>.{' '}
                Details for raising concerns for the German DPA can be {' '}
                <a href="https://www.bfdi.bund.de/DE/Meta/Datenschutz/datenschutz_node.html">found here</a>
                .
            </li>
            <li>
                <a href="https://www.baden-wuerttemberg.datenschutz.de/">Baden-Württemberg DPA</a>.{' '}
                To file a complaint, please, {' '}
                <a href="https://www.baden-wuerttemberg.datenschutz.de/beschwerde/">go here</a>
                .
            </li>
        </ul>
        <br />
        <h2>User Personal Information</h2>
        <p>
            The Service collects personal information necessary for normal operation and security,
            that are:
        </p>
        <ul className="ml-6 list-disc">
            <li>IP address.</li>
            <li>Service activity (URL calls) in the form of log files.</li>
            <li>User Identifier (sub claim in the OIDC token)</li>
        </ul>
        <p>
            Personal information obtained during the login is processed only to verify the existence
            of the user and to avoid multiple ratings of the same templates but it is not shared with
            third parties. These <strong>non-stored</strong> user details include:
        </p>
        <ul className="ml-6 list-disc">
            <li>User Name</li>
            <li>Email</li>
            <li>Affiliation</li>
            <li>User Identifier</li>
        </ul>
        <p>
            Log entries (i.e. only IP addresses and URLs called) may be shared internally with the
            KIT Security Incident Response Team at SCC to investigate attacks to the service or the
            infrastructure provider at KIT.
        </p>
        <br />
        <h2>Purposes For Processing Data</h2>
        <p>
            Logs are retained and processed for the purposes of processing security incidents, error
            resolution as well as performance evaluation.
        </p>
        <br />
        <h2>Access, Correction And Deletion Of Data</h2>
        <p>
            Templates Hub does not store direct personal information, if you wish to have your data
            collected by the service deleted, please contact the Data controller at
            m-privacy@lists.kit.edu.
        </p>
        <br />
        <h2>Data Retention</h2>
        <p>
            We retain and use your information as necessary to comply with our legal obligations,
            resolve disputes, and enforce our agreements. Templates Hub retains User Personal
            Information for as long as your account is active or as needed to provide you services.
            The user may ask to be removed from the service by interacting with the Contact
            information for the service. Access logs are deleted after 180 days.
        </p>
        <br />
        <h2>Data Protection Code of Conduct</h2>
        <p>
            Personal data will be protected according to the{' '}
            <a href="https://geant3plus.archive.geant.net/Pages/uri/V1.html">
                Code of Conduct for Service Providers
            </a>
            , a common standard for the research and higher education sector to protect the
            user&apos;s privacy. Personal data will be protected according to the Code of Conduct
            for Service Providers, a common standard for the research and higher education sector to
            protect the user&apos;s privacy.
        </p>
        <br />
        <h2>Contact Information</h2>
        <p>
            Service managers: <a href="mailto:m-ops@lists.kit.edu">m-ops@lists.kit.edu</a>.
            <br /> Data controller: <a href="mailto:m-privacy@lists.kit.edu">m-privacy@lists.kit.edu</a>.
        </p>
    </Layout>
);

export default PrivacyPolicy;
