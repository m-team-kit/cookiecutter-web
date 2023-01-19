import io
import os
import tempfile

import requests
from cookiecutter.main import cookiecutter
from flask import request, send_file, Response
from flask_smorest import Blueprint

from ..lib.zip import zip_folder_to_buffer
from ..settings import ZIP_NAME
from ..extensions import flaat

from ..schemas import args, schemas

blp = Blueprint(
    'cookiecutter', __name__, description=''
)


# for schema, see https://swagger.io/docs/specification/data-models/data-types/#file
@blp.route('/', methods=["POST"])
@blp.doc(operationId='renderTemplate')
@flaat.is_authenticated()
@blp.arguments(args.Template, location="query", as_kwargs=True)
@blp.arguments(schemas.Json)
@blp.response(200, {"format": "binary", "type": "string"}, content_type="application/zip")
def generate(json_body, *, url, git_repo, git_branch):

    print(F"Request.Form length: {len(request.form)}, {request.form}")    
    # if called from the frontend, params are in the request:
    if len(request.form) > 1:
        json_template = requests.get(url).json()
        json_body = json_template
        for key, value in request.form.items():
            if value != "" and key != "submit":
                json_body[key] = value

    print(F"Injected: {url}, {git_repo}, {git_branch}")
    print(F"Json_body length: {len(json_body)}, {json_body}")

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
            cookie_dir = os.path.abspath(cookie_dir).replace(backslash, 
                                                             backslash + backslash)
            print(f'cookiecutters_dir: "{cookie_dir}"', file=config)
            replay_dir = os.path.abspath(replay_dir).replace(backslash, 
                                                             backslash + backslash)
            print(f'replay_dir: "{replay_dir}"', file=config)

        # call cookiecutter
        cookiecutter(
            git_repo,
            checkout=git_branch,
            no_input=True,
            extra_context=json_body,
            output_dir=workdir,
            overwrite_if_exists=True,
            config_file=cookie_config
        )

        # write zip to memory
        # TODO: tempfile with manual deletion to use flask's buffering?
        buffer = io.BytesIO()
        zip_folder_to_buffer(workdir, buffer)
        buffer.seek(0)
        # the line below produces in Swagger:
        # Unrecognized response type; displaying content as text.
        #return send_file(buffer, mimetype="application/zip", download_name=ZIP_NAME + ".zip")
        return Response(buffer,
                        mimetype='application/zip',
                        headers={'Content-Disposition': 
                                 'attachment;filename=' + ZIP_NAME + '.zip'})
