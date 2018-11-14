FROM node:alpine

WORKDIR /app

COPY ./package.json ./package.json
RUN npm install --quiet

ADD . .

EXPOSE 5000

CMD npm start
