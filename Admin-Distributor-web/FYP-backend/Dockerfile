# Set the base image of the application to the node’s official image.
FROM node:16

# Set the Working Directory as "/index"
WORKDIR /index

# Copy the package.json and package-lock.json files into "/index"
COPY package*.json ./

# Install project dependencies
RUN npm install

# Replace bcrypt with bcryptjs module
RUN npm uninstall bcrypt
RUN npm install bcryptjs

# Copy the entire source code into "/index"
COPY . .

# Copy the pre-built bcrypt module into the Docker container
COPY node_modules/bcryptjs ./node_modules/bcryptjs

# Specifies the port the Node.js app will be running on
EXPOSE 5000

# Run "node index.js" to start the application
CMD ["node", "index.js"]
