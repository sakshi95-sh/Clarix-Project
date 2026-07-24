FROM node:20

RUN apt-get update && apt-get install -y tesseract-ocr

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 10000

CMD npx prisma migrate deploy && npm start