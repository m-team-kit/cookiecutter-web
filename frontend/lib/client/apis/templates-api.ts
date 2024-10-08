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


import type { Configuration } from '../configuration.js';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common.js';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base.js';
// @ts-ignore
import { NotFound } from '../models/index.js';
// @ts-ignore
import { ServerError } from '../models/index.js';
// @ts-ignore
import { Template } from '../models/index.js';
// @ts-ignore
import { Unauthorized } from '../models/index.js';
// @ts-ignore
import { Unprocessable } from '../models/index.js';
/**
 * TemplatesApi - axios parameter creator
 * @export
 */
export const TemplatesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Use this method to retrieve details about the specific template.
         * @summary (Public) Finds template by UUID and shows its details.
         * @param {string} uuid UUID of the template to be used for generating a new software project.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTemplate: async (uuid: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'uuid' is not null or undefined
            assertParamExists('getTemplate', 'uuid', uuid)
            const localVarPath = `/templates/{uuid}`
                .replace(`{${"uuid"}}`, encodeURIComponent(String(uuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Use this method to get a list of available templates. The response returns a pagination object with the templates.
         * @summary (Public) Lists available templates.
         * @param {string} [language] Programming language used in the project template (i.e. in the code generated by the template).
         * @param {Array<string>} [tags]  Tags to filter by, return templates should include all tags.
         * @param {Array<string>} [keywords] List of keywords (string subsets).
         * @param {string} [sortBy] Order to return the results (comma separated). Generic fields are [\&#39;±id\&#39;, \&#39;±score\&#39;, \&#39;±title\&#39;, \&#39;±language\&#39;].
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listTemplates: async (language?: string, tags?: Array<string>, keywords?: Array<string>, sortBy?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/templates/`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (language !== undefined) {
                localVarQueryParameter['language'] = language;
            }

            if (tags) {
                localVarQueryParameter['tags'] = tags;
            }

            if (keywords) {
                localVarQueryParameter['keywords'] = keywords;
            }

            if (sortBy !== undefined) {
                localVarQueryParameter['sort_by'] = sortBy;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Use this method to update the score/rating of the specific template.
         * @summary (User) Rates specific template.
         * @param {string} uuid UUID of the template to be used for generating a new software project.
         * @param {number} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        rateTemplate: async (uuid: string, body: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'uuid' is not null or undefined
            assertParamExists('rateTemplate', 'uuid', uuid)
            // verify required parameter 'body' is not null or undefined
            assertParamExists('rateTemplate', 'body', body)
            const localVarPath = `/templates/{uuid}/score`
                .replace(`{${"uuid"}}`, encodeURIComponent(String(uuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication HTTPBearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TemplatesApi - functional programming interface
 * @export
 */
export const TemplatesApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TemplatesApiAxiosParamCreator(configuration)
    return {
        /**
         * Use this method to retrieve details about the specific template.
         * @summary (Public) Finds template by UUID and shows its details.
         * @param {string} uuid UUID of the template to be used for generating a new software project.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTemplate(uuid: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Template>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getTemplate(uuid, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Use this method to get a list of available templates. The response returns a pagination object with the templates.
         * @summary (Public) Lists available templates.
         * @param {string} [language] Programming language used in the project template (i.e. in the code generated by the template).
         * @param {Array<string>} [tags]  Tags to filter by, return templates should include all tags.
         * @param {Array<string>} [keywords] List of keywords (string subsets).
         * @param {string} [sortBy] Order to return the results (comma separated). Generic fields are [\&#39;±id\&#39;, \&#39;±score\&#39;, \&#39;±title\&#39;, \&#39;±language\&#39;].
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listTemplates(language?: string, tags?: Array<string>, keywords?: Array<string>, sortBy?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Template>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listTemplates(language, tags, keywords, sortBy, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Use this method to update the score/rating of the specific template.
         * @summary (User) Rates specific template.
         * @param {string} uuid UUID of the template to be used for generating a new software project.
         * @param {number} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async rateTemplate(uuid: string, body: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Template>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.rateTemplate(uuid, body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * TemplatesApi - factory interface
 * @export
 */
export const TemplatesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TemplatesApiFp(configuration)
    return {
        /**
         * Use this method to retrieve details about the specific template.
         * @summary (Public) Finds template by UUID and shows its details.
         * @param {string} uuid UUID of the template to be used for generating a new software project.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTemplate(uuid: string, options?: any): AxiosPromise<Template> {
            return localVarFp.getTemplate(uuid, options).then((request) => request(axios, basePath));
        },
        /**
         * Use this method to get a list of available templates. The response returns a pagination object with the templates.
         * @summary (Public) Lists available templates.
         * @param {string} [language] Programming language used in the project template (i.e. in the code generated by the template).
         * @param {Array<string>} [tags]  Tags to filter by, return templates should include all tags.
         * @param {Array<string>} [keywords] List of keywords (string subsets).
         * @param {string} [sortBy] Order to return the results (comma separated). Generic fields are [\&#39;±id\&#39;, \&#39;±score\&#39;, \&#39;±title\&#39;, \&#39;±language\&#39;].
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listTemplates(language?: string, tags?: Array<string>, keywords?: Array<string>, sortBy?: string, options?: any): AxiosPromise<Array<Template>> {
            return localVarFp.listTemplates(language, tags, keywords, sortBy, options).then((request) => request(axios, basePath));
        },
        /**
         * Use this method to update the score/rating of the specific template.
         * @summary (User) Rates specific template.
         * @param {string} uuid UUID of the template to be used for generating a new software project.
         * @param {number} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        rateTemplate(uuid: string, body: number, options?: any): AxiosPromise<Template> {
            return localVarFp.rateTemplate(uuid, body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TemplatesApi - object-oriented interface
 * @export
 * @class TemplatesApi
 * @extends {BaseAPI}
 */
export class TemplatesApi extends BaseAPI {
    /**
     * Use this method to retrieve details about the specific template.
     * @summary (Public) Finds template by UUID and shows its details.
     * @param {string} uuid UUID of the template to be used for generating a new software project.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TemplatesApi
     */
    public getTemplate(uuid: string, options?: AxiosRequestConfig) {
        return TemplatesApiFp(this.configuration).getTemplate(uuid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Use this method to get a list of available templates. The response returns a pagination object with the templates.
     * @summary (Public) Lists available templates.
     * @param {string} [language] Programming language used in the project template (i.e. in the code generated by the template).
     * @param {Array<string>} [tags]  Tags to filter by, return templates should include all tags.
     * @param {Array<string>} [keywords] List of keywords (string subsets).
     * @param {string} [sortBy] Order to return the results (comma separated). Generic fields are [\&#39;±id\&#39;, \&#39;±score\&#39;, \&#39;±title\&#39;, \&#39;±language\&#39;].
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TemplatesApi
     */
    public listTemplates(language?: string, tags?: Array<string>, keywords?: Array<string>, sortBy?: string, options?: AxiosRequestConfig) {
        return TemplatesApiFp(this.configuration).listTemplates(language, tags, keywords, sortBy, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Use this method to update the score/rating of the specific template.
     * @summary (User) Rates specific template.
     * @param {string} uuid UUID of the template to be used for generating a new software project.
     * @param {number} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TemplatesApi
     */
    public rateTemplate(uuid: string, body: number, options?: AxiosRequestConfig) {
        return TemplatesApiFp(this.configuration).rateTemplate(uuid, body, options).then((request) => request(this.axios, this.basePath));
    }
}

