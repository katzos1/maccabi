FROM node:alpine
WORKDIR /reactApp
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]