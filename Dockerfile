
FROM node:18

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . ./

RUN cat .env.example > .env

EXPOSE 4000


CMD ["npm", "run", "start"]