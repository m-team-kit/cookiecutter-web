# ================================== BUILDER ===================================
ARG INSTALL_PYTHON_VERSION=3.8
ARG PYTHON_IMAGE_TAG=slim-buster
FROM python:${INSTALL_PYTHON_VERSION}-${PYTHON_IMAGE_TAG} AS backend

# Install system updates and tools
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
# Install system updates and tools
        curl git && \
# Clean up & back to dialog front end
    apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/*
ENV DEBIAN_FRONTEND=dialog
WORKDIR /app

ENV PATH="/home/sid/.local/bin:${PATH}"
ENV FLASK_APP="autoapp.py"

RUN  git config --global user.email "ccweb@lists.kit.edu" &&\
     git config --global user.name "cookiecutter-web"
COPY requirements requirements
RUN pip install --no-cache -r requirements/prod.txt
COPY autoapp.py ./
COPY app app

# ================================= PRODUCTION =================================
FROM backend AS production

COPY supervisord.conf /etc/supervisor/supervisord.conf
COPY supervisord_programs /etc/supervisor/conf.d

RUN useradd -m sid
RUN chown -R sid:sid /app
USER sid

ENV FLASK_ENV="production"
EXPOSE 5000
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]

# ================================= DEVELOPMENT ================================
FROM backend AS development

#COPY factories factories
RUN pip install --no-cache -r requirements/dev.txt

ENV FLASK_ENV="development"
EXPOSE 5000
CMD ["python", "-m", "debugpy", "--listen", "0.0.0.0:5678", "-m", "flask", "run", "--no-debugger", "--no-reload", "--host", "0.0.0.0", "--port", "5000"]
