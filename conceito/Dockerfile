FROM node:18.12.1

USER node

WORKDIR /home/node

COPY --chown=node package.json /home/node/

RUN npm install

COPY --chown=node . .

ENV DATABASE_URL="mysql://root:mysqladmin@mysql:3306/api_db"

ENTRYPOINT npm start