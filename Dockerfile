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

# Installing node and npm
RUN apk add --no-cache --repository http://nl.alpinelinux.org/alpine/edge/main libuv \
    && apk add  --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/v3.9/main/ nodejs=14.16.1-r1 npm=14.16.1-r1

COPY ./nginx/image-nginx.template /etc/nginx/nginx.template
COPY --from=base /app/filedrop/build /etc/nginx/html

WORKDIR /app

COPY ./server/package*.json ./server/

WORKDIR /app/server
RUN npm install

COPY ./server .
COPY ./common ../common
COPY ./package*.json ../

EXPOSE 3030

CMD ["sh", "-c", "envsubst '$PORT' < /etc/nginx/nginx.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;' & PORT=3030 npm run start"]