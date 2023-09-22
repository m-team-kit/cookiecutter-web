import { NextPage } from 'next';
import Layout from 'components/Layout';

const PrivacyPolicy: NextPage = () => {
    return (
        <Layout>
            <h1>Privacy Policy</h1>
            <p>This privacy policy for AI4EOSC Templates service is effective from 2023-05-02</p>
            <h2>SERVICE</h2>
            <p>
                Templates Hub provides a Hub to collect software templates based on{' '}
                <a href="https://github.com/cookiecutter/cookiecutter">cookiecuters</a> and to
                generate software projects from them. Users can add new templates, search, list
                them, choose a template of their preference, fill out the corresponding web form
                and, when submitted, receive a zip file containing a customized startup software
                project. The Templates Hub service consists of the Python backend compliant with the
                OpenAPI specification and the frontend to provide the web GUI. The template records
                are collected in the github repository and cached in the database local to the
                service.
            </p>
            <p>
                The service is provided by the Computer Centre SCC of the Karlsruhe Institute of
                Technology (KIT).
            </p>
            <h2>JURISDICTION AND SUPERVISORY AUTHORITY</h2>
            <ul className="list-disc ml-6">
                <li>
                    <a href="https://www.bfdi.bund.de/DE/Home/home_node.html">German DPA</a>.
                    <a href="https://www.bfdi.bund.de/DE/Meta/Datenschutz/datenschutz_node.html">
                        Details for raising concerns for the German DPA
                    </a>
                    .
                </li>
                <li>
                    <a href="https://www.baden-wuerttemberg.datenschutz.de/">
                        Baden-Württemberg DPA
                    </a>
                    .{' '}
                    <a href="https://www.baden-wuerttemberg.datenschutz.de/beschwerde/">
                        File a complaint
                    </a>
                    .
                </li>
            </ul>
            <h2>USER PERSONAL INFORMATION</h2>
            <p>
                The Service collects personal information necessary for normal operation and
                security, that are:
            </p>
            <ul className="list-disc ml-6">
                <li>IP address.</li>
                <li>sservice activity (URL calls) in the form of log files.</li>
                <li>User Identifier (sub claim in the OIDC token)</li>
            </ul>
            <p>
                Personal information obtained during the login is processed only to verify the
                existence of the user and to avoid multiple ratings of the same templates but not
                shared with third parties. These <strong>non-stored</strong> user details include:
            </p>
            <ul className="list-disc ml-6">
                <li>User Name</li>
                <li>Email</li>
                <li>Affiliation</li>
                <li>User Identifier</li>
            </ul>
            <p>
                Log entries (i.e. only IP addresses and URLs called) may be shared internally with
                the KIT Security Incident Response Team at SCC to investigate attacks to the service
                or the infrastructure provider at KIT.
            </p>
            <h2>PURPOSES FOR PROCESSING DATA</h2>
            <p>
                Logs are retained and processed for the purposes of processing security incidents,
                error resolution as well as performance evaluation.
            </p>
            <h2>ACCESS, CORRECTION AND DELETION OF DATA</h2>
            <p>
                Templates Hub does not store direct personal information, if you wish to have your
                data collected by the service deleted, please contact the Data controller at
                m-privacy@lists.kit.edu.
            </p>
            <h2>DATA RETENTION</h2>
            <p>
                We retain and use your information as necessary to comply with our legal
                obligations, resolve disputes, and enforce our agreements. Templates Hub retains
                User Personal Information for as long as your account is active or as needed to
                provide you services. The user may ask to be removed from the service by interacting
                with the Contact information for the service. Access logs are deleted after 180
                days.
            </p>
            <h2>DATA PROTECTION CODE OF CONDUCT</h2>
            <p>
                Personal data will be protected according to the{' '}
                <a href="https://geant3plus.archive.geant.net/Pages/uri/V1.html">
                    Code of Conduct for Service Providers
                </a>
                , a common standard for the research and higher education sector to protect the
                user&apos;s privacy. Personal data will be protected according to the Code of
                Conduct for Service Providers, a common standard for the research and higher
                education sector to protect the user&apos;s privacy.
            </p>
            <h2>CONTACT INFORMATION</h2>
            <p>
                Service managers: m-ops@lists.kit.edu.
                <br /> Data controller: m-privacy@lists.kit.edu.
            </p>
        </Layout>
    );
};

export default PrivacyPolicy;
