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
        # call cookiecutter
        cookiecutter(GIT_REPO_URL, no_input=True, extra_context=json_data, output_dir=workdir, overwrite_if_exists=True)

        # write zip to memory
        # TODO: tempfile with manual deletion to use flask's buffering?
        buffer = io.BytesIO()
        zip_folder_to_buffer(workdir, buffer)
        buffer.seek(0)
        return send_file(buffer, mimetype="application/zip", download_name=ZIP_NAME + ".zip")
