FROM node:18.12.1-slim

USER node

WORKDIR /home/node

COPY --chown=node package.json /home/node/

RUN npm install && ls

COPY --chown=node . .

ENTRYPOINT npm start