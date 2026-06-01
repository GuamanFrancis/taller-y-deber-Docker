
FROM node:18


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY . .

ENV DB_HOST=contenedorBD

EXPOSE 3000


CMD ["npm", "run", "dev"]