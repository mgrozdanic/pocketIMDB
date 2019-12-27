FROM node:10-alpine

RUN apk update && apk add python g++ make

WORKDIR /app/server

COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD [ "yarn", "dev" ]