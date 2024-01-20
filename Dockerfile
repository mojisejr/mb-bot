FROM --platform=linux/amd64 node:18-alpine3.18

WORKDIR /

COPY package.json ./

RUN npm install
RUN npm install ts-node

COPY . .

CMD ["npm", "start"]





