FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

# Expose the port the app will run on
EXPOSE 80

# Start the Nginx server
CMD yarn start
