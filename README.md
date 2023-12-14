# Cookiecutter-Web

This application provides a 'marketplace' for commonly used cookiecutter templates, allowing the user to fill in the configuration online and download the generated project as a .zip.

The frontend is built in [next.js](https://nextjs.org/) and can be found in `/frontend`.

The backend source is hosted on the [backend repository](https://codebase.helmholtz.cloud/m-team/ai/cookiecutter-web-backend).

# Configuration

Copy `.env-example` to `.env` and refer to the comments to fill in desired configuration values.

# Running the application

Run `docker-compose -f docker-compose.base.yaml -f docker-compose.prod.yaml --build up` to deploy the application in production mode.

Run `docker-compose -f docker-compose.base.yaml -f docker-compose.dev.yaml --build up` to deploy the application in development mode for testing.
