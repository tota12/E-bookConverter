# Use an official Node runtime as a parent image
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 80

# Start the app
CMD [ "node", "server.js" ]

