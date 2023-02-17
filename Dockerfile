# alphine nginx image 
# FROM nginx:1.19.0-alpine
# COPY build/ /usr/share/nginx/html

# pull the base image
FROM node:latest

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]