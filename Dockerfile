FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY ../../../Desktop .

RUN npm run build

EXPOSE 9999

CMD ["node", "dist/main.js"]
