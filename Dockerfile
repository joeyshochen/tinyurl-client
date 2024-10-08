FROM node:alpine3.18 as build

# Declare build time environment variables
ARG PROD_ENV_URL

# Set default values for environment variables
ENV PROD_ENV_URL=$PROD_ENV_URL

#Build App
WORKDIR /App
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

#Serve with nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]