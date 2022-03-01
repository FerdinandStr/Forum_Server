FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_NAME=forum_db

EXPOSE 3000

CMD ["npm", "start"]