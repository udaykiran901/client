FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the Nginx server
CMD yarn start
