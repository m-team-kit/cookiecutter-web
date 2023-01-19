"""This is the application configuration module. It is used to load
from the system environment and files the configuration to use
when deploying an application instance.

For local development, it is recommended to use a .env file
containing the environment variables definitions. Sensible information
can be loaded directly from the environment or from a configuration/secret
file. In the last case, ensure the application has access to read such files.
"""
import functools
from urllib.parse import urljoin

from environs import Env, EnvError
from marshmallow.validate import OneOf

env = Env()
env.read_env()

# Application environment
ENV = env.str("FLASK_ENV", "production", validate=OneOf(
    ["production", "development"],
    error="FLASK_ENV must be one of: {choices}"
))
""" Defines in which mode the application is launched.
There are 2 options:

- `production`: Normal functionality including all security and
  performance checks. Do not use it with `flask.run()`.
- `development`: Bypass authentication and other modules which
  might slow down the development process. Do not use it when
  deployed into the open world.

By default it is set to `production`.

:meta hide-value:
"""


# Overload of environs functions with dev_default
def development_defaults(func):
    """Decoration function to add "dev_default" input.
    If ENV == 'development' and dev_default, default is replaced
    """

    @functools.wraps(func)
    def decorated(*args, dev_default=None, **kwargs):
        if ENV == 'development' and dev_default is not None:
            kwargs['default'] = dev_default
        return func(*args, **kwargs)

    return decorated


bool = development_defaults(env.bool)
int = development_defaults(env.int)
str = development_defaults(env.str)
list = development_defaults(env.list)

# Secret key for security and cookie encryption
SECRET_KEY = str("SECRET_KEY", default="", dev_default="not-so-secret")
"""| Secret key to use on flask configuration.

| When ENV is set to `production`, a configuration value is required.
| When ENV is `development`, the default value stands to: "not-so-secret".
| See: https://flask.palletsprojects.com/en/2.0.x/config/#SECRET_KEY

:meta hide-value:
"""

SECRET_KEY_FILE = str("SECRET_KEY_FILE", default="")
"""| Path to a secret file to define `SECRET_KEY`.

| The secret inside the file overwrites the environment SECRET_KEY therefore
| the configuration requirement `SECRET_KEY` does not apply.

:meta hide-value:
"""
if SECRET_KEY_FILE:
    SECRET_KEY = open(SECRET_KEY_FILE).read().rstrip('\n')
if not SECRET_KEY:
    raise EnvError("Environment variable 'SECRET_KEY' empty")

# Crypt configuration
BCRYPT_LOG_ROUNDS = int("BCRYPT_LOG_ROUNDS", default=12)
"""| Value to determine the complexity of the encryption.
| See bcrypt for more details; default value is 12.

:meta hide-value:
"""

GIT_REPO_DOWNLOAD_URL = str("CC_GIT_REPO_DOWNLOAD_URL",
                            default="https://raw.githubusercontent.com/deephdc/cookiecutter-deep/")
"""
"""

GIT_REPO_URL = str("CC_GIT_REPO_URL",
                   default="https://github.com/deephdc/cookiecutter-deep/")
"""
"""

GIT_BRANCH_NAME = str("CC_GIT_BRANCH", default="advanced")
"""
"""

GIT_DOWNLOAD_URL = GIT_REPO_DOWNLOAD_URL + GIT_BRANCH_NAME + "/"
"""
"""

COOKIECUTTER_TEMPLATE = "cookiecutter.json"
COOKIECUTTER_TEMPLATE_URL = GIT_DOWNLOAD_URL + COOKIECUTTER_TEMPLATE
COOKIECUTTER_HELP = COOKIECUTTER_TEMPLATE.split('.')[0] + "-help.json"
COOKIECUTTER_HELP_URL = GIT_DOWNLOAD_URL + COOKIECUTTER_HELP

ZIP_NAME = "deep_project"

LOG_LEVEL = str('LOG_LEVEL', default='INFO')

# Authorization configuration.
TRUSTED_OP_LIST = list("TRUSTED_OP_LIST", default=[
    'https://aai.egi.eu/auth/realms/egi',
    'https://aai-demo.egi.eu/auth/realms/egi',
    'https://aai-dev.egi.eu/auth/realms/egi'
])
"""| Trusted OIDC Providers, default value stands for:
|  - 'https://aai.egi.eu/auth/realms/egi'
|  - 'https://aai-demo.egi.eu/auth/realms/egi'
|  - 'https://aai-dev.egi.eu/auth/realms/egi'

:meta hide-value:
"""


# API specs configuration
BACKEND_ROUTE = str("BACKEND_ROUTE", default="/")
API_TITLE = 'CookieCutter API'
API_VERSION = '1.0.0'
OPENAPI_VERSION = "3.0.2"
OPENAPI_JSON_PATH = "api-spec.json"
OPENAPI_URL_PREFIX = "/"
OPENAPI_SWAGGER_UI_PATH = "/"
OPENAPI_SWAGGER_UI_URL = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

API_SPEC_OPTIONS = {}
API_SPEC_OPTIONS['security'] = [{"bearerAuth": []}]
API_SPEC_OPTIONS['servers'] = [{"url": BACKEND_ROUTE}]
API_SPEC_OPTIONS['components'] = {
    "securitySchemes": {
        "bearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }
}
API_SPEC_OPTIONS['info'] = {
    "license": {
        "name": "MIT",
        "url": "https://git.scc.kit.edu/m-team/ai/cookiecutter-to-webform/-/raw/main/LICENSE",
    }
}


# logging level accross various scripts
# options: DEBUG(10), INFO(20), WARNING(30), ERROR(40), CRITICAL(50)
# log_level = getattr(logging, env_log_level.upper(), 20)  # INFO = 20
