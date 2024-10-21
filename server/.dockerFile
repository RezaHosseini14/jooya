FROM node:20.9.0-alpine
WORKDIR /usr/app/jooya
COPY package.json ./
RUN npm install --production
COPY . .
# EXPOSE 3000
CMD [ "node", "server.js" ]
