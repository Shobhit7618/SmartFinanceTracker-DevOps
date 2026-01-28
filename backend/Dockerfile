# 1. Use the official Node.js image as the base
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the application code
COPY . .

# 6. Expose the port your backend runs on (usually 5000 or 8000)
EXPOSE 5000

# 7. Command to run the app
CMD ["npm", "start"]