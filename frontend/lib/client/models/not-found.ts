/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 *  The OpenAPI 3.0 specification for the REST API of the Software Templates Hub: Create your project from cookiecutter templates via web interface: [https://templates.services.fedcloud.eu](https://templates.services.fedcloud.eu)  - [Templates Hub](https://templates.services.fedcloud.eu) - [How to add your template to the Hub](https://github.com/m-team-kit/templates-hub/blob/main/README.md) 
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { ErrorDetails } from './error-details.js';
// May contain unused imports in some cases
// @ts-ignore
import { Status404 } from './status404.js';

/**
 * 
 * @export
 * @interface NotFound
 */
export interface NotFound {
    /**
     * 
     * @type {Array<ErrorDetails>}
     * @memberof NotFound
     */
    'detail': Array<ErrorDetails>;
    /**
     * 
     * @type {Status404}
     * @memberof NotFound
     */
    'status_code'?: Status404;
}


