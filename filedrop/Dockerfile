FROM node:14.16.1 AS base

WORKDIR /app

COPY ./filedrop/package*.json ./filedrop/

WORKDIR /app/filedrop
RUN npm install

ARG WS_HOST
ARG SERVER_HOST
ARG WS_SIZE_LIMIT
ARG TORRENT_SIZE_LIMIT

ENV WS_HOST $WS_HOST
ENV SERVER_HOST $SERVER_HOST
ENV WS_SIZE_LIMIT $WS_SIZE_LIMIT
ENV TORRENT_SIZE_LIMIT $TORRENT_SIZE_LIMIT

COPY ./filedrop .
COPY ./common ../common
RUN npm run build

FROM nginx:alpine
COPY ./filedrop/nginx.conf /etc/nginx/nginx.conf
COPY --from=base /app/filedrop/build /etc/nginx/html

EXPOSE 8080 80