FROM node:18.12.1

USER node

WORKDIR /home/node

COPY --chown=node package.json /home/node/

RUN npm install

COPY --chown=node . .

ENTRYPOINT npm start