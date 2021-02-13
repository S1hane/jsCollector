FROM node
LABEL name="jscollector-frontend"
LABEL version="1.0"
LABEL description="developer frontend for jscollector project"
ENV NODE_ENV=production
ENV ENABLE_RESPONSE_LOG=true
WORKDIR /usr/src/app
COPY ["pages", "pages"]
COPY ["public", "public"]
COPY ["styles", "styles"]
COPY ["package.json", "package-lock.json*", "healthcheck.js", "./"]
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]
