# Use the official Node.js image from the Docker Hub as the base image
FROM node:16 

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the NestJS app (this will transpile TypeScript to JavaScript)
RUN npm run build

# Expose the port the app will run on (default NestJS port is 3000)
EXPOSE 3000

# Set the command to run the app
CMD ["npm", "run", "start:prod"]
