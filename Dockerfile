FROM node:lts-alpine3.16

# Create app directory
ENV WORK=/data/
WORKDIR ${WORK}

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ${WORK}

RUN npm install

# Bundle app source
COPY . ${WORK}

EXPOSE 8080
CMD [ "npm", "start" ]
