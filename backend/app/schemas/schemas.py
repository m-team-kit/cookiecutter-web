from marshmallow import INCLUDE

from . import BaseSchema as Schema


class Json(Schema):
    """Special schema to allow free JSON property"""

    class Meta:
        """`marshmallow` options object for JSON properties"""
        #: Accept and include the unknown fields
        unknown = INCLUDE
