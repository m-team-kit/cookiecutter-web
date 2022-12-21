from marshmallow import fields

from . import BaseSchema as Schema
from ..settings import COOKIECUTTER_TEMPLATE_URL, GIT_REPO_URL, GIT_BRANCH_NAME


class Template(Schema):
    """Information about a cookiecutter template."""

    url = fields.URL(
        description="URL of the template",
        required=False,
        example=COOKIECUTTER_TEMPLATE_URL,
        missing=COOKIECUTTER_TEMPLATE_URL
    )

    git_repo = fields.URL(
        description="git repository to render",
        required=False,
        example=GIT_REPO_URL,
        missing=GIT_REPO_URL
    )

    git_branch = fields.String(
        description="git branch to render",
        required=False,
        example=GIT_BRANCH_NAME,
        missing=GIT_BRANCH_NAME
    )
