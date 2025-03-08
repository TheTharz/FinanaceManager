# Use the official Node.js image as the base
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Compile the TypeScript code into JavaScript
RUN npm run build

# Expose the app port
EXPOSE 5000

# Run the application
CMD ["node", "dist/index.js"]
