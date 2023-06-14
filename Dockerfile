FROM node:16.16.0-alpine

RUN mkdir -p /home/node/app/node_modules && mkdir -p /home/node/app/build && chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN ls ./

COPY package*.json ./

COPY tsconfig*.json ./

COPY ormconfig* ./

COPY src ./src

RUN ls ./

RUN chown -R node:node /home/node/app/package*.json

USER node

RUN npm install

RUN npm run build

COPY --chown=node:node . .

EXPOSE 8000

CMD [ "node", "build/src/main" ]
