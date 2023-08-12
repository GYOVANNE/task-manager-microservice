# Building app
FROM node:18
# custom environments var
ARG NODE_ENV
ARG PORT
ARG DATABASE_URL

ENV NODE_ENV=${NODE_ENV}
ENV PORT=${APP_PORT}

# basic config
USER node
WORKDIR /home/node
COPY package.json yarn.lock ./
RUN yarn
COPY . .

# mount app
RUN yarn build

CMD ["yarn", "start:dev"]