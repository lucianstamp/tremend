FROM node:10-alpine
WORKDIR /app
COPY notes.js .
COPY package.json .
RUN npm install
ENV PORT=8080
EXPOSE 8080
CMD node ./notes.js