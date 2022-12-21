import io
import tempfile

import requests
from cookiecutter.main import cookiecutter
from flask import request, send_file
from flask_smorest import Blueprint

from ..lib.zip import zip_folder_to_buffer
from ..settings import ZIP_NAME
import os

from ..schemas import args, schemas

blp = Blueprint(
    'cookiecutter', __name__, description=''
)


# for schema, see https://swagger.io/docs/specification/data-models/data-types/#file
@blp.route('/', methods=["POST"])
@blp.doc(operationId='renderTemplate')
@blp.arguments(args.Template, location="query", as_kwargs=True)
@blp.arguments(schemas.Json)
@blp.response(200, {"format": "binary", "type": "string"}, content_type="application/zip")
def generate(json, *, url, git_repo, git_branch):
    template = requests.get(url)
    json_data = template.json()
    print(request.form)
    for key, value in request.form.items():
        if value != "" and key != "submit":
            json_data[key] = value
    print(json_data)
    print(url, git_repo, git_branch)

    with tempfile.TemporaryDirectory() as tmpdir:
        # create a subfolder so the folder in the zip is not garbled text
        workdir = os.path.join(tmpdir, "cookiecutter")

        # create a temp dir for cookiecutter because it's very smart
        cookie_dir = os.path.join(tmpdir, "cookiecutter-temp")
        replay_dir = os.path.join(tmpdir, "cookiecutter-replay")
        cookie_config = os.path.join(tmpdir, "cookiecutter.yaml")

        # manually escape backslashes for windows because apparently python can't do that
        backslash = '\\'

        with open(cookie_config, 'w') as config:
            print(f'cookiecutters_dir: "{os.path.abspath(cookie_dir).replace(backslash, backslash + backslash)}"',
                  file=config)
            print(f'replay_dir: "{os.path.abspath(replay_dir).replace(backslash, backslash + backslash)}"', file=config)

        # call cookiecutter
        cookiecutter(
            git_repo,
            checkout=git_branch,
            no_input=True,
            extra_context=json_data,
            output_dir=workdir,
            overwrite_if_exists=True,
            config_file=cookie_config
        )

        # write zip to memory
        # TODO: tempfile with manual deletion to use flask's buffering?
        buffer = io.BytesIO()
        zip_folder_to_buffer(workdir, buffer)
        buffer.seek(0)
        return send_file(buffer, mimetype="application/zip", download_name=ZIP_NAME + ".zip")
