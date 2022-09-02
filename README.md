# Cookiecutter to webform

This application buils a webform for a given cookiecutter template where the user fills in the requirements and when submited, returns a zip file containing the file architecture build with the specified cookiecutter template.
 
The cookiecutter-to-webform application is a Python application built with [Flask](https://flask.palletsprojects.com/).

The docker image uses [Gunicorn](https://gunicorn.org/) as WSGI HTTP server to serve the Flask Application.

# Running the application

You can either clone the project and run it:
```
python3 cookiecutterform.py
```
or build docker image 
```
docker build -f docker/Dockerfile -t deephdc/ccweb:0.1 --no-cache .
```
and run it as e.g:
```
docker run -p 80:5001 deephdc/ccweb:0.1
```
then go to `http://0.0.0.0` to find the webform.

# Configuration

To determine the cookiecutter template to be transformed as a webform, you either modify the following parameters in the  [config.py](https://github.com/vykozlov/cookiecutter-to-webform/blob/master/app/config.py) 
or define corresponding Environment Variables:

| Parameter name  | Description | Mandatory (Y/N) | Environment Variable |
| -------------- | ------------- |----------------|-----------------------|
| git_repo_download_url | Download url of git repo containing the cookiecutter json file. | Y | CC_GIT_REPO_DOWNLOAD_URL 
| git_repo_url | Normal url of git repo containing the cookiecutter json file. | Y | CC_GIT_REPO_URL
| branch_name | Branch name of the git repo containing the cookiecutter json file.  | Y | CC_GIT_BRANCH
| cookiecutter_template | Name of the cookiecutter .json file. | Y | --


The initial configuration provided in the project reads the cookiecutter json file for the [Deep Hybrid Data Cloud Project](https://github.com/deephdc/cookiecutter-deep/).

If you want a "cleaner" webform, e.g. add a better description for your parameters, you can also add a "help" file. This file must have the same name as you cookiecutter json file with the suffix "-help" to be found. For example, if you template is called `cookiecutter.json`, the help file name would be `cookiecutter-help.json`.
This "help" file is expected in the same git repository as the `cookicutter_template`.

# Flowchart

The application works as following:

<p align="center">
<img src="https://github.com/SilkeDH/cookiecutter-to-webform/blob/master/img/cookieflowchart.png" width="400"/>
</p>

The functions showed in the flowchart are called in the [routes.py](https://github.com/SilkeDH/cookiecutter-to-webform/blob/master/app/routes.py) file.

# Notes

- This application downloads the cookiecutter json file. If it is manually provided in the files, it will be deleted. This is because if the cookiecutter json file is modified in the git repository, the changes will be automatically visible in the webform.

# Reference

Originally the application was developed by [SilkerDH](https://github.com/SilkeDH/cookiecutter-to-webform).

