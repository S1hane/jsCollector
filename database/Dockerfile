FROM mongo:bionic
ENV MONGO_INITDB_ROOT_USERNAME: root
ENV MONGO_INITDB_ROOT_PASSWORD: changeme
ENV MONGO_INITDB_DATABASE: jscollector
LABEL name="jscollector mongodb server"
LABEL version="1.0"
LABEL description="Provides database service to backend api"
COPY ["mongo-init.js", "/docker-entrypoint-initdb.d/"]
EXPOSE 27017
