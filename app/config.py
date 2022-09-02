## This file is for configuration. Here you configure the git repository path, the name of the cookiecutter.json file
# and the generation of the help file.

import logging
import os

# logging level accross various scripts
# options: DEBUG(10), INFO(20), WARNING(30), ERROR(40), CRITICAL(50)
env_log_level = os.getenv('LOG_LEVEL', 'INFO')
log_level = getattr(logging, env_log_level.upper(), 20) # INFO = 20

git_repo_download_url = os.getenv("CC_GIT_REPO_DOWNLOAD_URL",
                                  "https://raw.githubusercontent.com/deephdc/cookiecutter-deep/")
git_repo_url = os.getenv("CC_GIT_REPO_URL",
                         "https://github.com/deephdc/cookiecutter-deep/")
branch_name = os.getenv("CC_GIT_BRANCH", "advanced")

download_url = os.path.join(git_repo_download_url,
                            branch_name)

BASE_DIR = os.path.dirname(os.path.normpath(os.path.dirname(__file__)))

cookie_json_dir = os.path.join(BASE_DIR,
                               "app/files")

cookiecutter_template = "cookiecutter.json"
cookiecutter_help = cookiecutter_template.split('.')[0] + "-help.json"

zip_name = "deep_project"
