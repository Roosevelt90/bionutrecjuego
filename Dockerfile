FROM node:10.16.3 AS build-env
MAINTAINER Roosevelt Diaz<rdt-2012@hotmail.com>
LABEL authors="Roosevelt Diaz"

WORKDIR /app

COPY . ./

RUN npm install
RUN npm run build

FROM nginx:1.13.9-alpine

COPY --from=build-env /app/dist/bionutrec/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]