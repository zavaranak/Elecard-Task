
FROM node:20 as BUILD_IMAGE

WORKDIR /frontend-task

COPY package.json .

RUN npm install

RUN npm install -D sass

COPY . .

RUN npm run build

CMD ["npm", "run", "preview"]
