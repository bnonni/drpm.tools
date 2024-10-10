# Use an official Node.js runtime as the base image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app will run on
EXPOSE 2092

# Define the command to run your server
CMD [ "node", "./dist/index.js" ]
