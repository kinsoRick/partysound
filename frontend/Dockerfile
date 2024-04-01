FROM node:20-buster

WORKDIR /app/frontend

COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "start"]
