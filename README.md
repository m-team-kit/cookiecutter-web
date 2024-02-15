[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-1.4-4baaaa.svg)](code_of_conduct.md)
# Cookiecutter-Web or Templates Hub

This application provides a 'marketplace' for commonly used [cookiecutter](https://cookiecutter.readthedocs.io/) templates, allowing the user to fill in the configuration online and download the generated project as a .zip file.

The frontend is built in [next.js](https://nextjs.org/) and can be found in `/frontend`.

The backend source is hosted on the [backend repository](https://codebase.helmholtz.cloud/m-team/ai/cookiecutter-web-backend).

# Configuration

Copy `.env-example` to `.env` and refer to the comments to fill in desired configuration values.

# Running the application

Run `docker compose -f docker-compose.base.yaml -f docker-compose.prod.yaml up --build` to deploy the application in production mode.

Run `docker-compose -f docker-compose.base.yaml -f docker-compose.dev.yaml up --build` to deploy the application in development mode for testing.

# Deployed service
Deployed service can be found in [https://templates.services.fedcloud.eu/](https://templates.services.fedcloud.eu/)

In order to add a new template, please, follow the instructions at [https://github.com/m-team-kit/templates-hub](https://github.com/m-team-kit/templates-hub)


# Contributing
Please, see our [CONTRIBUTING](CONTRIBUTING.md) description and the [CODE OF CONDUCT](CODE_OF_CONDUCT.md).

# License
This code is distributed under the Apache 2.0 License. Please, see the [LICENSE](LICENSE) file

# Authors and acknowledgment

@Authors: Borja Esteban, Christophe Laures, Valentin Kozlov (KIT)
Copyright (c) 2023 - 2024 Karlsruhe Institute of Technology - Scientific Computing Center.