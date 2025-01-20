# Step 1: Use an official Node.js image as the base image
FROM node:18-alpine AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire application source code
COPY . .

# Step 6: Build the Next.js application
RUN npm run build

# Step 7: Use a lightweight image for running the app
FROM node:18-alpine AS runner

# Step 8: Set the working directory inside the container
WORKDIR /app

# Step 9: Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Step 10: Expose the port on which Next.js runs (default: 3000)
EXPOSE 3000

# Step 11: Set environment variables (optional, recommended to use .env file instead)
ENV NODE_ENV=production

# Step 12: Start the Next.js application
CMD ["npm", "run", "start"]
