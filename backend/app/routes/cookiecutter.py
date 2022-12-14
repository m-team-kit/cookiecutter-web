import io
import tempfile

import requests
from cookiecutter.main import cookiecutter
from flask import request, send_file
from flask_smorest import Blueprint

from ..lib.zip import zip_folder_to_buffer
from ..settings import COOKIECUTTER_TEMPLATE_URL, GIT_REPO_URL, ZIP_NAME
import os


blp = Blueprint(
    'cookiecutter', __name__, description=''
)


@blp.route('/', methods=["POST"])
def generate():
    url = request.args["url"] if "url" in request.args else COOKIECUTTER_TEMPLATE_URL
    template = requests.get(url)
    json_data = template.json()
    for key, value in request.form.items():
        if value != "" and key != "submit":
            json_data[key] = value

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
            GIT_REPO_URL,
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
