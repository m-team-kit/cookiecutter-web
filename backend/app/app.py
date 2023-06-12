import logging
import sys

from flask import Flask
from . import routes
from .extensions import api  # Api interface module
from .extensions import flaat   # Flask authentication with tokens
from .settings import BACKEND_ROUTE


# https://stackoverflow.com/a/36033627
class PrefixMiddleware(object):
    def __init__(self, app, prefix=''):
        self.app = app
        self.prefix = prefix

    def __call__(self, environ, start_response):
        if environ['PATH_INFO'].startswith(self.prefix):
            environ['PATH_INFO'] = environ['PATH_INFO'][len(self.prefix):]
            environ['SCRIPT_NAME'] = self.prefix
            return self.app(environ, start_response)
        else:
            start_response('404', [('Content-Type', 'text/plain')])
            return ["This url does not belong to the app.".encode()]


def create_app(config_base="app.settings", **settings_override):
    """Create application factory, as explained here:
    http://flask.pocoo.org/docs/patterns/appfactories

    :param config_base: Configuration object, defaults to "backend.settings"
    :type config_base: str, optional
    :return: EOSC Performance API instance
    :rtype: :class:`flask.app.Flask`
    """
    app = Flask(__name__.split(".")[0])
    app.config.from_object(config_base)
    app.config.update(**settings_override)
    app.wsgi_app = PrefixMiddleware(app.wsgi_app, prefix=BACKEND_ROUTE)
    register_extensions(app)
    register_blueprints(app)
    configure_logger(app)
    return app


def register_extensions(app):
    """Register Flask extensions."""
    api.init_app(app)
    flaat.init_app(app)


def register_blueprints(app):
    """Register Flask blueprints."""
    api.register_blueprint(routes.cookiecutter.blp)


def configure_logger(app):
    """Configure loggers."""
    handler = logging.StreamHandler(sys.stdout)

    # logging.getLogger().setLevel(logging.DEBUG)
    # handler = logging.StreamHandler(sys.stdout)
    # handler.setLevel(logging.DEBUG)
    # formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    # handler.setFormatter(formatter)
    # logging.getLogger().addHandler(handler)

    # configure python logger
    # logger = logging.getLogger('__name__')
    # logging.basicConfig(format='%(asctime)s [%(levelname)s]: %(message)s')
    # logger.setLevel(cfg.log_level)

    if not app.logger.handlers:
        app.logger.addHandler(handler)
