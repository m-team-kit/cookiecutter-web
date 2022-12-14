from .app import create_app
import flask.blueprints

__all__ = ["create_app"]


class MyBlueprintSetupState(flask.blueprints.BlueprintSetupState):
    def add_url_rule(self, rule, endpoint=None, view_func=None, **options):
        """Monkey patch to allow ':' in route for custom methods.
        """
        if self.url_prefix is not None:
            if rule:
                rule = self.url_prefix + rule
            else:
                rule = self.url_prefix
        options.setdefault("subdomain", self.subdomain)
        if endpoint is None:
            raise RuntimeError("Undefined Endpoint")
        defaults = self.url_defaults
        if "defaults" in options:
            defaults = dict(defaults, **options.pop("defaults"))

        self.app.add_url_rule(
            rule,
            f"{self.name_prefix}.{self.name}.{endpoint}".lstrip("."),
            view_func,
            defaults=defaults,
            **options,
        )


flask.blueprints.BlueprintSetupState = MyBlueprintSetupState
