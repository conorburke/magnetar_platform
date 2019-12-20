FROM node:12.14.0 as builder
WORKDIR '/app'
COPY ./package.json ./
# RUN npm install -g yarn@1.21.1
RUN yarn install
COPY . .
RUN yarn build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html