from marshmallow import Schema, pre_load, post_dump
from werkzeug.datastructures import ImmutableMultiDict


class BaseSchema(Schema):
    """Base schema to control common schema features."""
    class Meta:
        """`marshmallow` options object for BaseSchema."""
        #: Enforce Order in OpenAPI Specification File
        ordered = True

    @pre_load   # Support PHP and axios query framework
    def process_input(self, data, **kwargs):
        if hasattr(data, 'data'):  # flask_smorest query
            args = data.data._iter_hashitems()
            fixed_args = [(x.replace('[]', ''), y) for x, y in args]
            data.data = ImmutableMultiDict(fixed_args)
        return data

    @post_dump
    def remove_skip_values(self, data, **kwargs):
        return {
            key: value for key, value in data.items()
            if value is not None
        }
