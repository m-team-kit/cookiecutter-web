import { NextPage } from 'next';
import Layout from '../components/Layout';

const PrivacyPolicy: NextPage = () => {
    return (
        <Layout>
            <p>
                <h1 className="h4">Privacy Policy</h1>
                This privacy policy for AI4EOSC Templates service is effective from 2023-05-02
            </p>
            <p>
                <h2 className="h5">SERVICE</h2>
                AI4EOSC Templates provides a web form to generate software projects based on
                cookiecuter templates for the AI4EOSC platform. Users fill in the requirements and,
                when submitted, receive a zip file containing a customised AI4EOSC startup software
                project. The AI4EOSC Templates application has a Python backend compliant with the
                OpenAPI specification and a frontend to provide the web GUI. The service is provided
                by the Computer Centre SCC of the Karlsruhe Institute of Technology (KIT).
            </p>
            <p>
                <h2 className="h5">JURISDICTION AND SUPERVISORY AUTHORITY</h2>
                German DPA. Details for raising concerns for the German DPA can be found here.
                Baden-Württemberg DPA. Link to file a complaint.
            </p>
            <p>
                <h2 className="h5">USER PERSONAL INFORMATION</h2>
                The Service collects personal information necessary for normal operation and
                security, that are:
                <ul>
                    <li>IP address.</li>
                    <li>service activity (URL calls) in the form of log files.</li>
                </ul>
                Personal information obtained during the login is processed only to verify the
                existence of the user but not recorded nor shared with third parties. These
                non-stored user details include:{' '}
                <ul>
                    <li>User Name</li>
                    <li>Email</li>
                    <li>Affiliation</li>
                    <li>User Identifier</li>
                </ul>
                Log entries (i.e. only IP addresses and URLs called) may be shared internally with
                the KIT Security Incident Response Team at SCC to investigate attacks to the service
                or the infrastructure provider at KIT.
            </p>
            <p>
                <h2 className="h5">PURPOSES FOR PROCESSING DATA</h2>
                Logs are retained and processed for the purposes of processing security incidents,
                error resolution as well as performance evaluation.
            </p>
            <p>
                <h2 className="h5">ACCESS, CORRECTION AND DELETION OF DATA</h2>
                AI4EOSC Templates do not store direct personal information, if you wish to have your
                data collected by the service deleted, please contact the Data controller at
                m-privacy@lists.kit.edu.
            </p>
            <p>
                <h2 className="h5">DATA RETENTION</h2> We retain and use your information as
                necessary to comply with our legal obligations, resolve disputes, and enforce our
                agreements. AI4EOSC Templates retains User Personal Information for as long as your
                account is active or as needed to provide you services. The user may ask to be
                removed from the service by interacting with the Contact information for the
                service. Access logs are deleted after 180 days.
            </p>
            <p>
                <h2 className="h5">DATA PROTECTION CODE OF CONDUCT</h2>
                Personal data will be protected according to the Code of Conduct for Service
                Providers, a common standard for the research and higher education sector to protect
                the user&apos;s privacy.
            </p>
            <p>
                <h2 className="h5">CONTACT INFORMATION</h2>
                Service managers: m-ops@lists.kit.edu.
                <br /> Data controller: m-privacy@lists.kit.edu.
            </p>
        </Layout>
    );
};

export default PrivacyPolicy;
