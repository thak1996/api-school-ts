FROM node:18

EXPOSE 8080

WORKDIR /app

COPY scripts/wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

COPY package.json package-lock*.json ./

RUN npm install

COPY . .

RUN chmod -R 755 /app

RUN npx tsc

CMD ["sh", "-c", "wait-for-it.sh mysql:3306 -- node dist/index.js"]