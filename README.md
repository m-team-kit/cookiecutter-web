# Cookiecutter to webform

This application buils a webform for a given cookiecutter template where the user fills in the requirements and when submited, returns a zip file containing the file architecture build with the specified cookiecutter template.
 
The cookiecutter-to-webform application has a Python backend built with [Flask](https://flask.palletsprojects.com/) and a Typescript frontend built in [next.js](https://nextjs.org/).

The backend docker image uses [Gunicorn](https://gunicorn.org/) as WSGI HTTP server to serve the Flask Application.

# Configuration

Create a nginx_api_credentials.txt as follows: 
```
<username here>
<password here>
```
These will be used by the letsencrypt / certificate container to reload the reverse proxy in case of certificate changes.

Copy `.env-example` to `.env` and refer to the comments to fill in desired configuration values.

The initial configuration provided in the project reads the cookiecutter json file for the [Deep Hybrid Data Cloud Project](https://github.com/deephdc/cookiecutter-deep/).

If you want a "cleaner" webform, e.g. add a better description for your parameters, you can also add a "help" file. This file must have the same name as you cookiecutter json file with the suffix "-help" to be found. For example, if you template is called `cookiecutter.json`, the help file name would be `cookiecutter-help.json`.
This "help" file is expected in the same git repository as the `cookicutter_template`.

# Running the application

Run `docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml --build up` to deploy the application in production mode.
Run `docker-compose -f docker-compose.yaml --build up` to deploy the application in development mode for testing.



# Notes

- This application downloads the cookiecutter json file. If it is manually provided in the files, it will be deleted. This is because if the cookiecutter json file is modified in the git repository, the changes will be automatically visible in the webform.

# Reference

Originally the application was developed by [SilkerDH](https://github.com/SilkeDH/cookiecutter-to-webform).

