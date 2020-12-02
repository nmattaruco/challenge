FROM node:12-alpine as builder

RUN apk update && apk add python make g++

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY . /home/node

RUN npm i

# ---

FROM node:12-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/

RUN npm ci

CMD ["node", "server.js"]