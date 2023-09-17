import { useMemo } from 'react';
import { type AxiosRequestConfig, type AxiosInstance } from 'axios';
import getApiHost from 'lib/getApiHost';
import {
    Configuration,
    DatabaseApiFactory,
    ProjectApiFactory,
    TemplatesApiFactory,
} from './client';
import { useAuth } from 'react-oidc-context';

const DEFAULT_CONFIG = {
    basePath: getApiHost(),
};

const useConfiguration = (token?: string) =>
    useMemo(
        () =>
            new Configuration({
                ...DEFAULT_CONFIG,
                baseOptions: {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                } satisfies Pick<AxiosRequestConfig<never>, 'headers'>,
            }),
        [token]
    );

/**
 * Build API hook from API class object
 *
 * @param api api class object
 */
const buildApi =
    <T>(api: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => T) =>
    () => {
        const auth = useAuth();
        const configuration = useConfiguration(auth.user?.access_token);
        return useMemo(() => api(configuration), [configuration]);
    };

export const useDatabaseApi = buildApi(DatabaseApiFactory);
export const useProjectApi = buildApi(ProjectApiFactory);
export const useTemplateApi = buildApi(TemplatesApiFactory);
