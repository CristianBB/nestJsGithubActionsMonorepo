FROM node:lts AS build

WORKDIR /app/
ARG NODE_ENV=production
ADD package.json ./
ADD yarn.lock ./
RUN yarn install --production

ADD apps/app4 ./
ADD tsconfig* ./
RUN yarn build app4
#RUN ls /app/dist -al

FROM node:lts
WORKDIR /app/
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3001
CMD ["node", "dist/main"]
