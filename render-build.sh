#!/usr/bin/env bash
apt-get update
apt-get install -y tesseract-ocr
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
