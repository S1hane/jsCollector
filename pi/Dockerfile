FROM node
LABEL name="jscollector-pi"
LABEL version="1.0"
LABEL description="collects raspberry pi sensor data for jscollector"
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["modules", "modules"]
COPY ["package.json", "package-lock.json*", "server.js", "./"]
RUN npm install
CMD ["npm", "start"]
