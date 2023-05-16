import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';

const AUPolicy: NextPage = () => {
    return (
        <Layout>
            <p>
                <h1 className="h4">Acceptable Use Policy and Conditions of Use</h1>
                This Acceptable Use Policy for AI4EOSC Templates service is effective from 2023-05-16
            </p>
            <p>
                This Acceptable Use Policy and Conditions of Use (&quot;AUP&quot;)
                {' '}<a id="footnote-1" href="#footnote-aup-ref">[1]</a> defines the rules and conditions 
                that govern your access to and use (including transmission, processing, and storage of data) 
                of the resources and services (&quot;Services&quot;) as granted by the department{' '}
                <a href="https://www.scc.kit.edu/en/aboutus/d3a.php">
                    Data Analytics, Access and Applications
                </a>{' '}
                (D3A) from the{' '}
                <a href="https://www.scc.kit.edu/en/">Steinbuch Centre for Computing</a> (SCC) of{' '}
                <a href="https://www.kit.edu/english/index.php">
                    Karlsruhe Institute of Technology
                </a>{' '}
                (KIT), located at Hermann-von-Helmholtz-Platz 1, 76344 Eggenstein-Leopoldshafen (the
                &quot;Provider&quot;) for the purpose of generating AI software projects based on the predefined templates.
            </p>
            <ol>
                <li>
                    You shall only use the Services in a manner consistent with the purposes and 
                    limitations described above; you shall show consideration towards other users 
                    including by not causing harm to the Services; you have an obligation to 
                    collaborate in the resolution of issues arising from your use of the Services.
                </li>
                <li>
                    You shall only use the Services for lawful purposes and not breach, attempt to 
                    breach, nor circumvent administrative or security controls.
                </li>
                <li>
                    You shall respect intellectual property and confidentiality agreements.
                </li>
                <li>
                    You shall protect your access credentials (e.g. passwords, private keys or 
                    multi-factor tokens); no intentional sharing is permitted.
                </li>
                <li>
                    You shall keep your registered information correct and up to date.
                </li>
                <li>
                    You shall promptly report known or suspected security breaches, credential compromise, 
                    or  misuse  to  the  security  contact  stated  below;  and  report  any  compromised  
                    credentials  to the relevant issuing authorities.
                </li>
                <li>
                    Reliance on the Services shall only be to the extent specified by any 
                    applicable service level agreements listed below. Use without such agreements is 
                    at your own risk.
                </li>
                <li>
                    Your personal data will be processed in accordance with the privacy 
                    statements referenced below.
                </li>
                <li>
                    Your use of the Services may be restricted or suspended, for administrative, operational, 
                    or security reasons, without prior notice and without compensation.
                </li>
                <li>
                    If you violate these rules, you may be liable for the consequences, which  may 
                    include your account being suspended and a report being made to your home organisation 
                    or to law enforcement.
                </li>
            </ol>


            <h2 className="h5">Contact information</h2>
            <p>
                The administrative contact for this AUP is:{' '}
                <a href="mailto:ai4eosc-support@listas.csic.es">ai4eosc-support@listas.csic.es</a>
            </p>
            <p>
                The security contact for this AUP is:{' '}
                <a href="mailto:scc-secteam@lists.kit.edu">scc-secteam@lists.kit.edu</a>
            </p>
            <p>
                The privacy statements (e.g. Privacy Notices) are located at:{' '}
                <Link href="/privacy-policy">Privacy Policy</Link>
            </p>
            <p>
                The KIT-SCC Impressum is found here: {' '}<a href="https://www.scc.kit.edu/en/legals.php">Legals</a>
            </p>
            <p></p>
            <p id="footnote-aup-ref">
            ----------------------<br/>
                <small>[1] This Acceptable Use Policy and Conditions of Use is based on {' '}<a href="https://wise-community.org/wise-baseline-aup/">WISE Baseline AUP</a>. 
                {' '}<a href="#footnote-1" title="back">&#8617;</a></small>
            </p>
        </Layout>
    );
};

export default AUPolicy;
