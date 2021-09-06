FROM node

# Create app directory
ENV WORK=/data/
WORKDIR ${WORK}

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ${WORK}

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . ${WORK}

EXPOSE 8080
CMD [ "npm", "start" ]
