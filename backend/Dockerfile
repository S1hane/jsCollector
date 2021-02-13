FROM node
LABEL name="jscollector-backend"
LABEL version="1.0"
LABEL description="backend API for jscollector project"
ENV NODE_ENV=production
ENV ENABLE_RESPONSE_LOG=true
WORKDIR /usr/src/app
COPY ["modules", "modules"]
COPY ["package.json", "package-lock.json*", "server.js", "./"]
RUN npm install
EXPOSE 3001
CMD ["npm", "start"]
