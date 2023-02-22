#stage-1 : Building the angular app
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

#stage-2: Run the angular app
FROM nginx:alpine
COPY --from=build /app/dist/web /usr/share/nginx/html
RUN mkdir /usr/share/nginx/html/download