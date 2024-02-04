FROM node:20 AS build-phase
LABEL stage=build-image
WORKDIR /medium
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /medium
COPY --from=build-phase /medium/dist dist
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --production
ENTRYPOINT ["node", "--optimize_for_size", "--gc_interval=10", "dist/main"]
