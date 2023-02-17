# alphine nginx image 
FROM nginx:1.19.0-alpine
COPY build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
# pull the base image
# FROM node:alpine

# # set the working direction
# WORKDIR /app

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# # install app dependencies
# COPY package.json ./

# # COPY package-lock.json ./

# RUN npm install

# # add app
# COPY . ./

# # start app
# CMD ["npm","run", "start"]
