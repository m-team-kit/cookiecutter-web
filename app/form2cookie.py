from cookiecutter.main import cookiecutter
import app.config as cfg
import json
import logging
import os
import requests
import shutil
import tempfile

# conigure python logger
logger = logging.getLogger('__name__')
logging.basicConfig(format='%(asctime)s [%(levelname)s]: %(message)s')
logger.setLevel(cfg.log_level)

def read_json():
    
    cc_template_path = os.path.join(cfg.cookie_json_dir,
                               cfg.cookiecutter_template)

    cc_help_path = os.path.join(cfg.cookie_json_dir,
                               cfg.cookiecutter_help)

    # delete previously stored files
    if os.path.exists(cc_template_path):
        os.remove(cc_template_path)

    if os.path.exists(cc_help_path):
        os.remove(cc_help_path)

    download_cookiejson(cfg.cookiecutter_template,
                        cc_template_path)
    download_cookiejson(cfg.cookiecutter_help,
                        cc_help_path)
    f = open(cc_template_path, "r")

    # Reading from cookiecutter.json file
    cookie_data = json.loads(f.read())
    data = []

    # If cookiecutter-help.json exists then combine it with the cookiecutter placeholders
    if os.path.exists(cc_help_path):
        f = open(cc_help_path, "r")
        help_data = json.loads(f.read())
        for key, dsc in help_data.items():
            data.append([key, dsc, cookie_data[key]])

    # If not, just use the plain cookiecutter.json file
    else:
        for key, value in cookie_data.items():
            data.append([key,value])

    return data

def download_cookiejson(cc_json, cc_path):
    response = requests.get(os.path.join(cfg.download_url,
                                         cc_json))
    logger.debug(F"url: {os.path.join(cfg.download_url, cc_json)}")
    logger.debug(F"code: {response.status_code}")
    if response.status_code == requests.codes.ok :
        with open(cc_path, mode='wb') as file:
            file.write(response.content)


def call_cookiecutter(form):
    cookie_path = os.path.join(cfg.cookie_json_dir,
                               cfg.cookiecutter_template)
    with open(cookie_path, 'r') as file:
        json_data = json.load(file)
        for key, value in form.items():
            if value!= "" and key != "submit":
                    json_data[key] = value

    owd_parent = os.getcwd()

    with tempfile.TemporaryDirectory() as tmpdir:
        # call cookiecutter
        logger.debug(F"Current dir: {os.getcwd()}")
        os.chdir(tmpdir)
        logger.debug(F"Current (tmp) dir: {os.getcwd()}")
        cookiecutter(cfg.git_repo_url, no_input=True, extra_context=json_data)
        os.chdir(owd_parent)
        shutil.make_archive(cfg.zip_name, 'zip', tmpdir)
