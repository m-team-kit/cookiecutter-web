const DEV_API_HOST = 'https://example.com/api/latest';
const PROD_API_HOST = 'https://example.com/api/latest';
const LOCAL_API_HOST = 'http://localhost:80/api/latest';

const getApiHost = (env = process.env['NEXT_PUBLIC_API_HOST']) => {
    let host = env;

    if (env === 'local_api') {
        host = LOCAL_API_HOST;
    } else if (env === 'production') {
        host = PROD_API_HOST;
    } else if (env === 'development') {
        host = DEV_API_HOST;
    }

    return host;
};

export default getApiHost;
