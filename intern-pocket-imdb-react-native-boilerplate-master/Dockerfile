FROM node:10-alpine

WORKDIR /app/client

EXPOSE 19000
EXPOSE 19001

COPY package.json yarn.lock ./

RUN yarn global add expo-cli
RUN yarn

COPY . .

CMD [ "expo", "start" ]